<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // Import Three.js types only (module is loaded dynamically at runtime)
  import type * as ThreeType from 'three';
  import type {
    Scene, WebGLRenderer, PerspectiveCamera,
    Points as PointsType, BufferGeometry, Material,
    Clock, Vector2
  } from 'three';

  // Dynamic module holder
  let THREE: typeof ThreeType | null = null;

  // Core refs
  let canvasContainer: HTMLDivElement;

  // Scene state
  let scene: Scene | null = null;
  let camera: PerspectiveCamera | null = null;
  let renderer: WebGLRenderer | null = null;
  let particles: PointsType<BufferGeometry, Material | Material[]> | null = null;

  // Helpers
  let clock: Clock | null = null;
  let mouse: Vector2 | null = null;
  let target: Vector2 | null = null;
  let windowHalf: Vector2 | null = null;

  // Theme flag
  let isLightMode = false;

  // RAF id
  let rafId: number | null = null;

  // UI state
  let isHovered = false;

  // Animation state
  let lastTime = 0;
  
  // Particle system
  let particlePositions: Float32Array;
  let particleSpeeds: Array<{
    x: number;
    y: number;
    z: number;
    baseX: number;
    baseY: number;
    baseZ: number;
    angle: number;
    speed: number;
  }> = [];
  let particleSizes: Float32Array;
  
  // Initialize particle count based on device capabilities
  let PARTICLE_COUNT = 50;
  if (typeof window !== 'undefined') {
    const dpr = Math.min(window.devicePixelRatio || 1, 4);
    const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency ?? 4;
    const perfFactor = Math.min(1.1, Math.max(0.6, (cores / 8) * (1.0 / dpr)));
    PARTICLE_COUNT = Math.round(PARTICLE_COUNT * perfFactor);
  }

  // Track current theme mode, prefer site theme class over media query
  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    // If site uses class-based dark mode (Tailwind 'dark' class), prefer that
    if (root.classList.contains('dark')) {
      isLightMode = false;
    } else if (root.classList.contains('light')) {
      isLightMode = true;
    } else {
      // Fallback to media query
      isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
    }
    // React to theme toggles at runtime
    const mqInit = window.matchMedia('(prefers-color-scheme: light)');
    const handleMqInit = (e: MediaQueryListEvent) => {
      // Only apply if no explicit class is set on root
      if (!root.classList.contains('dark') && !root.classList.contains('light')) {
        isLightMode = e.matches;
      }
    };
    if (mqInit.addEventListener) mqInit.addEventListener('change', handleMqInit);
    else if ((mqInit as unknown as { addListener?: (cb: (e: MediaQueryListEvent) => void) => void }).addListener) {
      (mqInit as unknown as { addListener: (cb: (e: MediaQueryListEvent) => void) => void }).addListener(handleMqInit);
    }
  }
  
  // Helper type for HSL to avoid any
  type HSL = { h: number; s: number; l: number };

  // Initialize Three.js scene with particle system
  onMount(() => {
    (async () => {
      if (typeof window === 'undefined') return;

      if (!THREE) {
        THREE = await import('three');
      }
      if (!canvasContainer || !THREE) return;

      if (canvasContainer?.firstChild) {
        try {
          while (canvasContainer.firstChild) canvasContainer.removeChild(canvasContainer.firstChild);
        } catch {}
      }

      scene = new (THREE as typeof ThreeType).Scene();

      function applyBackground(light: boolean) {
        scene.background = new THREE.Color('#f8fafc');
        const overlayCanvas = document.createElement('canvas');
        overlayCanvas.width = 512;
        overlayCanvas.height = 512;
        const ctx = overlayCanvas.getContext('2d');
        if (ctx) {
          const cx = overlayCanvas.width / 2;
          const cy = overlayCanvas.height / 2;
          const r = Math.max(cx, cy);
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
          grad.addColorStop(0.0, 'rgba(255, 192, 203, 0.50)');
          grad.addColorStop(0.45, 'rgba(245, 182, 204, 0.34)');
          grad.addColorStop(1.0, 'rgba(255, 192, 203, 0.06)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);
          const overlayTexture = new THREE.CanvasTexture(overlayCanvas);
          overlayTexture.wrapS = THREE.ClampToEdgeWrapping;
          overlayTexture.wrapT = THREE.ClampToEdgeWrapping;
          overlayTexture.colorSpace = THREE.SRGBColorSpace;
          scene.background = overlayTexture;
        }
      }

      applyBackground(isLightMode);

      camera = new (THREE as typeof ThreeType).PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 32;

      renderer = new (THREE as typeof ThreeType).WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'low-power',
        preserveDrawingBuffer: false,
      });
      const maxDpr = 1.5;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
      const initialW = Math.floor(window.innerWidth * 0.75);
      const initialH = Math.floor(window.innerHeight * 0.75);
      renderer.setSize(initialW, initialH, false);
      renderer.outputEncoding = THREE.sRGBEncoding;
      canvasContainer.appendChild(renderer.domElement);
      requestAnimationFrame(() => {
        if (renderer?.domElement && typeof renderer.setSize === 'function') {
          renderer.setSize(window.innerWidth, window.innerHeight, false);
        }
      });

      const geometry = new (THREE as typeof ThreeType).BufferGeometry();
      geometry.setDrawRange(0, PARTICLE_COUNT);

      particlePositions = new Float32Array(PARTICLE_COUNT * 3);
      particleSizes = new Float32Array(PARTICLE_COUNT);

      const cloudCenters = [
        { x: 0, y: 0, z: 0 },
        { x: 10, y: 3.5, z: -8 },
        { x: -9, y: -3, z: 6 },
        { x: 6, y: -4, z: -6 },
      ];
      const particlesPerCloud = Math.floor(PARTICLE_COUNT / cloudCenters.length);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const cloudIndex = Math.min(Math.floor(i / particlesPerCloud), cloudCenters.length - 1);
        const center = cloudCenters[cloudIndex];
        const radius = 7 + Math.random() * 6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = radius * (Math.random() ** 0.9);
        const x = center.x + r * Math.sin(phi) * Math.cos(theta);
        const y = center.y + r * Math.sin(phi) * Math.sin(theta) * 0.8;
        const z = center.z + r * Math.cos(phi);
        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;
        particleSizes[i] = 1.8 + Math.random() * 2.8;
        particleSpeeds.push({
          x: (Math.random() - 0.5) * 0.03,
          y: (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.03,
          baseX: x,
          baseY: y,
          baseZ: z,
          angle: Math.random() * Math.PI * 2,
          speed: 0.0015 + Math.random() * 0.0045,
        });
      }

      geometry.setAttribute('position', new (THREE as typeof ThreeType).BufferAttribute(particlePositions, 3));
      geometry.setAttribute('size', new (THREE as typeof ThreeType).BufferAttribute(particleSizes, 1));

      const particleMaterial = new (THREE as typeof ThreeType).PointsMaterial({
        size: 1.6,
        color: 0xffffff,
        transparent: true,
        opacity: 1.0,
        blending: THREE.NormalBlending,
        sizeAttenuation: true,
        vertexColors: true,
        alphaTest: 0.01,
        depthWrite: false,
      });
      const circleCanvas = document.createElement('canvas');
      circleCanvas.width = 64;
      circleCanvas.height = 64;
      const ctx2 = circleCanvas.getContext('2d');
      if (ctx2) {
        const g = ctx2.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, 'rgba(255,255,255,1)');
        g.addColorStop(0.7, 'rgba(255,255,255,0.9)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx2.fillStyle = g;
        ctx2.beginPath();
        ctx2.arc(32, 32, 32, 0, Math.PI * 2);
        ctx2.fill();
        const map = new (THREE as typeof ThreeType).CanvasTexture(circleCanvas);
        map.colorSpace = (THREE as typeof ThreeType).SRGBColorSpace;
        map.anisotropy = 4;
        particleMaterial.alphaMap = map;
        particleMaterial.needsUpdate = true;
      }

      const colors = new Float32Array(PARTICLE_COUNT * 3);
      const PASTEL_PALETTE = [
        new (THREE as typeof ThreeType).Color('#f472b6'),
        new (THREE as typeof ThreeType).Color('#fb7185'),
        new (THREE as typeof ThreeType).Color('#a78bfa'),
        new (THREE as typeof ThreeType).Color('#60a5fa'),
        new (THREE as typeof ThreeType).Color('#34d399'),
        new (THREE as typeof ThreeType).Color('#fbbf24'),
        new (THREE as typeof ThreeType).Color('#f59e0b'),
      ];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const base = PASTEL_PALETTE[Math.floor(Math.random() * PASTEL_PALETTE.length)].clone();
        const hsl: HSL = { h: 0, s: 0, l: 0 };
        (base as unknown as { getHSL: (o: HSL) => HSL }).getHSL(hsl);
        const adjusted = base.clone().setHSL(
          hsl.h,
          Math.min(1, hsl.s * 1.0),
          Math.min(0.75, Math.max(0.5, hsl.l))
        );
        colors[i * 3] = adjusted.r;
        colors[i * 3 + 1] = adjusted.g;
        colors[i * 3 + 2] = adjusted.b;
      }
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      particles = new THREE.Points(geometry, particleMaterial);
      scene.add(particles);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
      scene.add(ambientLight);

      mouse = new THREE.Vector2();
      target = new THREE.Vector2();
      windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

      const onMouseMove = (event: MouseEvent) => {
        if (!mouse || !windowHalf) return;
        mouse.x = (event.clientX - windowHalf.x) * 0.001;
        mouse.y = (event.clientY - windowHalf.y) * 0.001;
      };
      window.addEventListener('mousemove', onMouseMove, false);

      clock = new THREE.Clock();
      let resizeT: number | undefined;
      const handleResize = () => {
        if (!camera || !renderer || !windowHalf) return;
        if (resizeT) cancelAnimationFrame(resizeT);
        resizeT = requestAnimationFrame(() => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight, false);
          windowHalf.set(window.innerWidth / 2, window.innerHeight / 2);
        });
      };
      window.addEventListener('resize', handleResize, false);

      const root = document.documentElement;
      const mo = new MutationObserver(() => {
        const nowLight = !root.classList.contains('dark');
        if (nowLight !== isLightMode) {
          isLightMode = nowLight;
          applyBackground(isLightMode);
          (particles!.material as THREE.PointsMaterial).color = new THREE.Color(0x111111);
          (particles!.material as THREE.PointsMaterial).opacity = 0.9;
          const colorsAttr = particles!.geometry.getAttribute('color') as THREE.BufferAttribute;
          const arr = colorsAttr.array as Float32Array;
          const REPALETTE = [
            new THREE.Color('#f472b6'),
            new THREE.Color('#fb7185'),
            new THREE.Color('#a78bfa'),
            new THREE.Color('#60a5fa'),
            new THREE.Color('#34d399'),
            new THREE.Color('#fbbf24'),
            new THREE.Color('#f59e0b'),
          ];
          for (let i = 0; i < PARTICLE_COUNT; i++) {
            const base = REPALETTE[Math.floor(Math.random() * REPALETTE.length)].clone();
            const hsl: HSL = { h: 0, s: 0, l: 0 };
            (base as unknown as { getHSL: (o: HSL) => HSL }).getHSL(hsl);
            const adjusted = base.clone().setHSL(
              hsl.h,
              Math.min(1, hsl.s),
              Math.min(0.75, Math.max(0.5, hsl.l))
            );
            arr[i * 3] = adjusted.r;
            arr[i * 3 + 1] = adjusted.g;
            arr[i * 3 + 2] = adjusted.b;
          }
          colorsAttr.needsUpdate = true;
          const pm = particles!.material as THREE.PointsMaterial;
          pm.color = new THREE.Color(0xffffff);
          pm.blending = THREE.NormalBlending;
          pm.opacity = 1.0;
          pm.needsUpdate = true;
        }
      });
      mo.observe(root, { attributes: true, attributeFilter: ['class'] });

      function animate() {
        if (!clock || !renderer || !scene || !camera || !particles || !mouse || !target || !windowHalf) return;
        rafId = requestAnimationFrame(animate);
        const time = clock.getElapsedTime();
        const delta = time - lastTime;
        lastTime = time;
        const positions = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const i3 = i * 3;
          const p = particleSpeeds[i];
          p.angle += p.speed;
          const noiseX = Math.sin(time * 0.42 + p.baseX * 0.15) * 0.38;
          const noiseY = Math.cos(time * 0.36 + p.baseY * 0.15) * 0.20;
          const noiseZ = Math.sin(time * 0.48 + p.baseZ * 0.15) * 0.38;
          const targetX = p.baseX + noiseX;
          const targetY = p.baseY + noiseY;
          const targetZ = p.baseZ + noiseZ;
          positions[i3] += (targetX - positions[i3]) * 0.03;
          positions[i3 + 1] += (targetY - positions[i3 + 1]) * 0.03;
          positions[i3 + 2] += (targetZ - positions[i3 + 2]) * 0.03;
          const maxDistance = 30; // Max distance particles can be pushed
    const dx = mouse.x * 25 - positions[i3];
    const dy = -mouse.y * 25 - positions[i3 + 1];
    const dist = Math.sqrt(dx * dx + dy * dy) + 0.0001;
    if (dist < maxDistance) {
      const falloff = 1 - dist / maxDistance;
      const force = 0.7 * falloff * falloff;
      const moveX = (dx / dist) * force;
      const moveY = (dy / dist) * force;
      
      // Apply movement
      positions[i3] -= moveX;
      positions[i3 + 1] -= moveY;
      
      // Keep particles within screen bounds (bounce)
      const boundsX = windowHalf.x * 0.9;
      const boundsY = windowHalf.y * 0.9;
      
      if (Math.abs(positions[i3]) > boundsX) {
        positions[i3] = boundsX * Math.sign(positions[i3]);
      }
      if (Math.abs(positions[i3 + 1]) > boundsY) {
        positions[i3 + 1] = boundsY * Math.sign(positions[i3 + 1]);
      }
    }
          const pulse = Math.sin(time * 0.9 + i * 0.03) * 0.16 + 0.95;
          particleSizes[i] = 2.6 * pulse;
        }
        const posAttr = particles.geometry.getAttribute('position');
        posAttr.needsUpdate = true;
        if (Math.floor(time * 6) % 6 === 0) {
          particles.geometry.attributes.size.needsUpdate = true;
          particles.geometry.attributes.color.needsUpdate = true;
        }
        particles.rotation.y = time * 0.03;
        target.x = mouse.x * 5;
        target.y = -mouse.y * 5;
        camera.position.x += (target.x - camera.position.x) * 0.1;
        camera.position.y += (target.y - camera.position.y) * 0.1;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      }
      animate();

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', handleResize);
        if (resizeT) cancelAnimationFrame(resizeT);
        if (rafId) cancelAnimationFrame(rafId);
        if (renderer) {
          renderer.dispose();
          if (renderer.domElement && canvasContainer?.contains(renderer.domElement)) {
            canvasContainer.removeChild(renderer.domElement);
          }
          renderer = null;
        }
        if (particles) {
          const geometry = particles.geometry;
          const materials = Array.isArray(particles.material) ? particles.material : [particles.material];
          geometry.dispose();
          for (const material of materials) material.dispose();
          particles = null;
        }
        scene = null;
        camera = null;
        clock = null;
        mouse = null;
        target = null;
        windowHalf = null;
      };
    })();
  });
  
  // Function to create a simple particle system
  function createParticleSystem(scene: ThreeType.Scene) {
    // This function is no longer needed as we create particles in the main setup
    // Keeping it as a placeholder in case we want to add more particle systems later
  }
</script>

<!-- Only render the 3D scene on the client side -->
<!-- No need for dynamic imports in the head, we'll handle it in the component -->

<div class="home-spa-container">
  <div class="home-spa-canvas-container" bind:this={canvasContainer}></div>
  <div class="home-spa-content">
    <div class="home-spa-inner-content">
      <h1 class="home-spa-title responsive-title">
        Welcome to Snugs & Kisses Doula Services
      </h1>
      <p class="home-spa-subtitle">
        Your journey to personalized family services begins here.
      </p>
      
      <div class="home-spa-button-container">
        <a href="/corporate" class="home-spa-btn secondary" 
           on:mouseenter={() => isHovered = true}
           on:mouseleave={() => isHovered = false}>
          Corporate Services
        </a>
        <a href="/client" class="home-spa-btn primary"
           on:mouseenter={() => isHovered = true}
           on:mouseleave={() => isHovered = false}>
          Client Services
        </a>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  /* Scoped styles for this component */
  .home-spa-container {
    @apply relative w-full h-full min-h-[calc(100vh-64px)] pt-16 bg-white dark:bg-slate-900;
    position: relative;
    z-index: 1;
  }

  /* Preload gradient: visible immediately before WebGL initializes */
  .home-spa-container::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0; /* behind content, above page bg */
    pointer-events: none;
    background:
      radial-gradient(60% 60% at 50% 40%, rgba(255, 192, 203, 0.45), rgba(245, 182, 204, 0.25), rgba(255, 255, 255, 0.06)),
      linear-gradient(180deg, rgba(255, 240, 245, 0.6) 0%, rgba(255, 255, 255, 0) 60%);
  }

  /* Add a soft pinkish gradient overlay behind the canvas for extra depth */
  .home-spa-canvas-container::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(60% 60% at 50% 40%, rgba(255, 192, 203, 0.42), rgba(245, 182, 204, 0.28), rgba(255, 255, 255, 0));
    /* Subtle vignette for focus (stronger) */
    box-shadow: inset 0 0 180px rgba(255, 192, 203, 0.20);
  }
  
  .home-spa-canvas-container {
    @apply absolute inset-0 -z-10; /* Position behind content */
    /* Ensure the preloaded gradient shows while canvas is not yet painted */
    background: radial-gradient(60% 60% at 50% 40%, rgba(255, 192, 203, 0.42), rgba(245, 182, 204, 0.28), rgba(255, 255, 255, 0));
    animation: home-spa-fade-in 600ms ease-out 0ms both;
  }
  
  .home-spa-content {
    @apply relative z-10 min-h-screen flex items-center justify-center p-4;
    /* Fade-in animation for the SPA content */
    animation: home-spa-fade-in 700ms ease-out 60ms both;
  }

  @keyframes home-spa-fade-in {
    0% {
      opacity: 0;
      transform: translateY(8px) scale(0.995);
      filter: saturate(0.95) blur(0.4px);
    }
    60% {
      opacity: 1;
      transform: translateY(0) scale(1.0);
      filter: saturate(1) blur(0);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1.0);
      filter: none;
    }
  }
  
  .home-spa-inner-content {
    @apply text-center max-w-2xl mx-auto px-4;
    color: #a11d3f; /* wine-leaning base tint */
  }
  
  .home-spa-title {
    @apply text-4xl md:text-6xl font-bold text-center mb-4 text-slate-900 dark:text-white;
    font-family: var(--aw-font-heading, 'Dancing Script'), cursive;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  
  .home-spa-subtitle {
    @apply text-xl md:text-2xl mb-8 max-w-lg mx-auto italic;
    color: #be123c; /* rose-700 */
    font-family: var(--aw-font-heading, 'Dancing Script'), cursive;
    font-weight: 500;
    text-shadow:
      0 2px 6px rgba(159, 18, 57, 0.25),
      0 8px 24px rgba(159, 18, 57, 0.18),
      0 1px 0 rgba(255,255,255,0.6);
  }
  
  .home-spa-button-container {
    @apply flex flex-wrap justify-center gap-6 mt-8 font-sans;
    position: relative;
    z-index: 10;
  }
  
  .home-spa-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 1.5rem;
    font-weight: 500;
    text-align: center;
    font-size: 1.125rem;
    line-height: 1.25rem;
    transition: all 0.2s ease-in-out;
    padding: 0.75rem 2rem;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    min-width: 180px;
    font-family: var(--aw-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
  }
  
  /* Primary button style */
  .home-spa-btn.primary {
    background-color: var(--aw-color-primary, #E8B4B8);
    border: none;
    color: var(--aw-color-text-heading, #404040);
  }
  
  .home-spa-btn.primary:hover:not(:disabled) {
    background-color: var(--aw-color-secondary, #D48A8F);
    border-color: var(--aw-color-secondary, #D48A8F);
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  /* Secondary button style */
  .home-spa-btn.secondary {
    background-color: var(--aw-color-bg-page, #FFFDFA);
    border: none;
    color: var(--aw-color-text-default, #595959);
    box-shadow: 0 0 0 1px var(--aw-color-primary, #E8B4B8);
  }
  
  .home-spa-btn.secondary:hover:not(:disabled) {
    background-color: var(--aw-color-accent, #FFDADD);
    box-shadow: 0 0 0 1px var(--aw-color-secondary, #D48A8F);
    transform: translateY(-1px);
  }
  
  /* Focus state */
  .home-spa-btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--aw-color-accent, #FFDADD);
    border-color: var(--aw-color-secondary, #D48A8F);
  }
  
  /* Active state */
  .home-spa-btn:active:not(:disabled) {
    transform: translateY(0);
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .home-spa-title {
      @apply text-4xl;
    }
    
    .home-spa-subtitle {
      @apply text-xl;
    }
  }
</style>
