<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  
  // Refs
  let canvasContainer: HTMLDivElement;
  
  // State
  let choice: string | null = null;
  let isHovered = false;
  
  // Particle system
  let particles: THREE.Points;
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
  const PARTICLE_COUNT = 1500; // Slightly fewer particles for better performance
  
  // Color palette - darker for better visibility in light mode
  const CLOUD_COLORS = [
    0xd4a5b5, // Muted pink
    0xc9b6e2, // Muted purple
    0xa8d8ea, // Muted blue
    0xa8e6cf, // Muted mint
    0xffd3b6, // Muted peach
  ];
  
  // Check if we're in light mode (only on client side)
  let isLightMode = false;
  if (typeof window !== 'undefined') {
    isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
  }
  
  // Navigation
  function navigateTo(route: string) {
    window.location.href = `/${route}`;
  }
  
  // Handle hover events
  function onHoverStart() {
    isHovered = true;
  }
  
  function onHoverEnd() {
    isHovered = false;
  }
  
  // Initialize Three.js scene with particle system
  onMount(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Scene setup with dark background for the SPA
    const scene = new THREE.Scene();
    
    // Set background based on color scheme
    if (isLightMode) {
      // Lighter background for light mode
      scene.background = new THREE.Color('#f8fafc'); // Very light blue-gray
      
      // Add a subtle gradient overlay for light mode
      const overlayCanvas = document.createElement('canvas');
      overlayCanvas.width = 512;
      overlayCanvas.height = 512;
      const overlayCtx = overlayCanvas.getContext('2d');
      
      if (overlayCtx) {
        const gradient = overlayCtx.createRadialGradient(
          overlayCanvas.width / 2,
          overlayCanvas.height / 2,
          0,
          overlayCanvas.width / 2,
          overlayCanvas.height / 2,
          overlayCanvas.width / 2
        );
        
        gradient.addColorStop(0, 'rgba(226, 232, 240, 0.8)'); // Light blue-gray tint
        gradient.addColorStop(1, 'rgba(241, 245, 249, 0.6)'); // Lighter at edges
        
        overlayCtx.fillStyle = gradient;
        overlayCtx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);
        
        const overlayTexture = new THREE.CanvasTexture(overlayCanvas);
        scene.background = [scene.background, overlayTexture];
      }
    } else {
      // Dark background for dark mode
      scene.background = new THREE.Color('#0f172a');
      
      // Add a subtle gradient overlay for dark mode
      const overlayCanvas = document.createElement('canvas');
      overlayCanvas.width = 512;
      overlayCanvas.height = 512;
      const overlayCtx = overlayCanvas.getContext('2d');
      
      if (overlayCtx) {
        const gradient = overlayCtx.createRadialGradient(
          overlayCanvas.width / 2,
          overlayCanvas.height / 2,
          0,
          overlayCanvas.width / 2,
          overlayCanvas.height / 2,
          overlayCanvas.width / 2
        );
        
        gradient.addColorStop(0, 'rgba(79, 70, 229, 0.1)'); // Subtle indigo tint
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
        
        overlayCtx.fillStyle = gradient;
        overlayCtx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);
        
        const overlayTexture = new THREE.CanvasTexture(overlayCanvas);
        scene.background = [scene.background, overlayTexture];
      }
    }
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    canvasContainer.appendChild(renderer.domElement);
    
    // Create particle geometry
    const geometry = new THREE.BufferGeometry();
    
    // Initialize particle positions and sizes
    particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    particleSizes = new Float32Array(PARTICLE_COUNT);
    
    // Create particles in cloud-like formations
    const cloudCenters = [
      { x: 0, y: 0, z: 0 },
      { x: 8, y: 3, z: -5 },
      { x: -6, y: -2, z: 4 },
      { x: 5, y: -3, z: -3 },
      { x: -7, y: 2, z: 2 }
    ];
    
    const particlesPerCloud = Math.floor(PARTICLE_COUNT / cloudCenters.length);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute particles around cloud centers
      const cloudIndex = Math.min(Math.floor(i / particlesPerCloud), cloudCenters.length - 1);
      const center = cloudCenters[cloudIndex];
      
      // Create a more organic, cloud-like distribution
      const radius = 4 + Math.random() * 3; // Vary cloud sizes
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      // Add some randomness to the distribution
      const r = radius * (Math.random() ** 1.5);
      
      const x = center.x + r * Math.sin(phi) * Math.cos(theta);
      const y = center.y + r * Math.sin(phi) * Math.sin(theta) * 0.5; // Flatten the cloud vertically
      const z = center.z + r * Math.cos(phi);
      
      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;
      
      // More variation in particle sizes for cloud-like appearance
      particleSizes[i] = 1.5 + Math.random() * 3;
      
      // Store initial positions and movement parameters
      particleSpeeds.push({
        x: (Math.random() - 0.5) * 0.01, // Slower movement
        y: (Math.random() - 0.5) * 0.005, // Less vertical movement
        z: (Math.random() - 0.5) * 0.01,
        baseX: x,
        baseY: y,
        baseZ: z,
        angle: Math.random() * Math.PI * 2,
        speed: 0.0005 + Math.random() * 0.002 // Slower, more subtle movement
      });
    }
    
    // Set attributes for the geometry
    geometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    // Create particle material with soft, cloud-like appearance
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.3,
      color: 0xffffff, // White base color
      transparent: true,
      opacity: 0.7,
      blending: THREE.NormalBlending, // Changed to NormalBlending for softer edges
      sizeAttenuation: true,
      vertexColors: true, // Enable per-particle colors
      alphaTest: 0.1,
      depthWrite: false
    });
    
    // Create colors for each particle
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const colorIndex = Math.floor(Math.random() * CLOUD_COLORS.length);
      const color = new THREE.Color(CLOUD_COLORS[colorIndex]);
      
      // Slightly randomize the color for more natural look
      color.offsetHSL(
        (Math.random() - 0.5) * 0.1, // Hue
        (Math.random() - 0.5) * 0.1, // Saturation
        (Math.random() - 0.3) * 0.2  // Lightness
      );
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create particle system
    particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);
    
    // Add ambient light for subtle illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    // Add subtle point light
    const pointLight = new THREE.PointLight(0x4a90e2, 1, 50);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    // Mouse movement variables
    const mouse = new THREE.Vector2();
    const target = new THREE.Vector2();
    const windowHalf = new THREE.Vector2(
      window.innerWidth / 2,
      window.innerHeight / 2
    );
    
    // Handle mouse move for interactive effect
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX - windowHalf.x) * 0.001;
      mouse.y = (event.clientY - windowHalf.y) * 0.001;
    };
    
    window.addEventListener('mousemove', onMouseMove, false);
    
    // Animation loop
    let lastTime = 0;
    const clock = new THREE.Clock();
    
    function animate() {
      requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      const delta = time - lastTime;
      lastTime = time;
      
      // Update particle positions with cloud-like movement
      const positions = particles.geometry.attributes.position.array as Float32Array;
      const colors = particles.geometry.attributes.color.array as Float32Array;
      
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const p = particleSpeeds[i];
        
        // Update angle for gentle floating motion
        p.angle += p.speed;
        
        // More organic, cloud-like movement
        const noiseX = Math.sin(time * 0.2 + p.baseX * 0.1) * 0.2;
        const noiseY = Math.cos(time * 0.15 + p.baseY * 0.1) * 0.1;
        const noiseZ = Math.sin(time * 0.25 + p.baseZ * 0.1) * 0.2;
        
        // Calculate target position with gentle floating
        const targetX = p.baseX + noiseX;
        const targetY = p.baseY + noiseY;
        const targetZ = p.baseZ + noiseZ;
        
        // Smooth movement towards target position
        positions[i3] += (targetX - positions[i3]) * 0.02;
        positions[i3 + 1] += (targetY - positions[i3 + 1]) * 0.02;
        positions[i3 + 2] += (targetZ - positions[i3 + 2]) * 0.02;
        
        // Gentle mouse interaction (subtle push)
        const dx = mouse.x * 10 - positions[i3];
        const dy = -mouse.y * 10 - positions[i3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 20) {
          const force = (1 - dist / 20) * 0.1;
          positions[i3] -= dx / dist * force;
          positions[i3 + 1] -= dy / dist * force;
        }
        
        // Subtle pulsing effect (like clouds changing shape)
        const pulse = Math.sin(time * 0.3 + i * 0.01) * 0.1 + 0.9;
        particleSizes[i] = (1.5 + Math.random() * 0.5) * pulse;
      }
      
      // Update particle geometry
      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.size.needsUpdate = true;
      particles.geometry.attributes.color.needsUpdate = true;
      
      // Very slow, subtle rotation for the entire cloud system
      particles.rotation.y = time * 0.02;
      
      // Update camera position based on mouse
      target.x = mouse.x * 5;
      target.y = -mouse.y * 5;
      
      camera.position.x += (target.x - camera.position.x) * 0.1;
      camera.position.y += (target.y - camera.position.y) * 0.1;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    }
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      windowHalf.set(window.innerWidth / 2, window.innerHeight / 2);
    };
    
    window.addEventListener('resize', handleResize, false);
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (canvasContainer?.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement);
      }
    };
  });
  
  // Function to create a simple particle system
  function createParticleSystem(scene: THREE.Scene) {
    // This function is no longer needed as we create particles in the main setup
    // Keeping it as a placeholder in case we want to add more particle systems later
  }
</script>

<!-- Only render the 3D scene on the client side -->
<!-- No need for dynamic imports in the head, we'll handle it in the component -->

<div class="container">
  <!-- 3D Canvas Container -->
  <div 
    bind:this={canvasContainer} 
    class="canvas-container"
  ></div>
  
  <!-- Content Overlay -->
  <div class="content">
    <div class="inner-content">
      <h1 class="title">
        Welcome to Snugs & Kisses
      </h1>
      <p class="subtitle">
        Your journey to personalized family services begins here.
      </p>
      
      <div class="button-container">
        <button
          on:click={() => navigateTo('corporate')}
          on:mouseenter={onHoverStart}
          on:mouseleave={onHoverEnd}
          class="button button-corporate"
        >
          Corporate Services
        </button>
        <button
          on:click={() => navigateTo('client')}
          on:mouseenter={onHoverStart}
          on:mouseleave={onHoverEnd}
          class="button button-client"
        >
          Client Services
        </button>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  /* Scoped styles for this component */
  .container {
    @apply relative w-full h-full min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 pt-16;
    position: relative;
    z-index: 1;
  }
  
  .canvas-container {
    @apply absolute inset-0 -z-10; /* Position behind content */
  }
  
  .content {
    @apply relative z-10 min-h-screen flex items-center justify-center p-4;
  }
  
  .inner-content {
    @apply text-center max-w-2xl mx-auto px-4;
  }
  
  .title {
    @apply text-4xl md:text-9xl mb-6 text-pink-500 dark:text-pink-300 drop-shadow-lg;
    font-family: var(--aw-font-heading, 'Dancing Script'), cursive;
    font-weight: 600;
  }
  
  .subtitle {
    @apply text-xl md:text-2xl mb-8 text-pink-400 dark:text-pink-200 max-w-lg mx-auto italic;
    font-family: var(--aw-font-heading, 'Dancing Script'), cursive;
    font-weight: 500;
  }
  
  .button-container {
    @apply flex flex-col sm:flex-row gap-6 justify-center;
  }
  
  .button {
    @apply px-8 py-3 font-serif text-lg rounded-full border-2 transition-all duration-300 transform hover:scale-105 shadow-lg;
  }
  
  .button-corporate {
    @apply bg-pink-300/80 hover:bg-pink-200/90 text-gray-800 border-pink-400/50 hover:border-pink-300/70 hover:shadow-pink-200/20;
  }
  
  .button-client {
    @apply bg-white/90 hover:bg-white text-gray-800 border-white/80 hover:border-white hover:shadow-white/20;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .title {
      @apply text-4xl;
    }
    
    .subtitle {
      @apply text-xl;
    }
  }
</style>
