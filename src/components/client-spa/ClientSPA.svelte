<script>
  import { onMount } from 'svelte';
  import TablerIcon from '../ui/TablerIcon.svelte';
  
  // Track image loading state
  let loadedImages = [];
  
  // Function to load an image
  function loadImage(path) {
    if (!path || loadedImages.includes(path)) return;
    
    const img = new Image();
    img.src = path;
    img.onload = () => {
      if (!loadedImages.includes(path)) {
        loadedImages = [...loadedImages, path];
      }
    };
    img.onerror = (error) => {
      console.error('Error loading image:', path, error);
    };
  }
  
  // Import page components
  import Page1 from './pages/Page1.svelte';
  import Page2 from './pages/Page2.svelte';
  import Page3 from './pages/Page3.svelte';
  import Page4 from './pages/Page4.svelte';
  import Page5 from './pages/Page5.svelte';
  import Page6 from './pages/Page6.svelte';
  
  // Page components map
  const pageComponents = {
    page1: Page1,
    page2: Page2,
    page3: Page3,
    page4: Page4,
    page5: Page5,
    page6: Page6
  };

  // Page configurations with imported images
  const pages = [
    { 
      id: 'page1', 
      title: 'Birth Doula Services', 
      description: 'Empowering, continuous support through your labor and delivery for a confident birth experience.',
      icon: 'tabler:home',
      image: '/src/assets/images/doula_and_mom_and_ball.png',
      imageAlt: 'Birth doula supporting a mother during labor'
    },
    { 
      id: 'page2', 
      title: 'Postpartum Care', 
      description: 'Compassionate support for new parents during the transformative postpartum period.',
      icon: 'tabler:heart-handshake',
      image: '/src/assets/images/doula_baby_mom.png',
      imageAlt: 'Mother and newborn bonding during postpartum'
    },
    { 
      id: 'page3', 
      title: 'Lactation Support', 
      description: 'Expert guidance and support for successful breastfeeding and lactation.',
      icon: 'tabler:users',
      image: '/src/assets/images/lacsup_mom-baby.jpg',
      imageAlt: 'Mother breastfeeding her baby with support'
    },
    { 
      id: 'page4', 
      title: 'Sleep Coaching', 
      description: 'Gentle, evidence-based strategies to help your baby and family get the rest you need.',
      icon: 'tabler:book',
      image: '/src/assets/images/sleep-coaching.png',
      imageAlt: 'Peacefully sleeping baby'
    },
    { 
      id: 'page5', 
      title: 'Prenatal Education', 
      description: 'Comprehensive classes to prepare you for childbirth, newborn care, and early parenthood.',
      icon: 'tabler:users',
      image: '/src/assets/images/prenatal-education.png',
      imageAlt: 'Group prenatal class in session'
    },
    { 
      id: 'page6', 
      title: 'Virtual Doula Support', 
      description: 'Professional doula support available wherever you are through virtual consultations.',
      icon: 'tabler:heart-broken',
      image: '/src/assets/images/virtual-support.png',
      imageAlt: 'Virtual doula consultation on a laptop'
    }
  ];
  
  // App title and subtitle
  const appTitle = 'Nurturing Care for Every Stage';
  const appSubtitle = 'Explore our comprehensive services designed to support you from pregnancy through postpartum and beyond.';
  
  // Animation settings
  function fadeIn(node, { delay = 0, duration = 300 } = {}) {
    return {
      delay,
      duration,
      css: t => `
        opacity: ${t};
        transform: translateY(${(1 - t) * 10}px);
      `
    };
  }
  
  // State
  let currentPage = pages[0]?.id || '';
  let hasButtonBeenClicked = false;
  let isMounted = false;
  
  // Lifecycle
  onMount(async () => {
    isMounted = true;
    
    // Load all images in the background
    for (const page of pages) {
      if (page.image) loadImage(page.image);
    }
    
    // Set initial page from URL hash if present
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const page = pages.find(p => p.id === hash);
        if (page) {
          currentPage = page.id;
        }
      }
    }
    
    return () => {
      isMounted = false;
    };
  });
  
  // Navigation function
  function navigate(page) {
    if (!page) return;
    
    hasButtonBeenClicked = true;
    currentPage = page;
    window.history.pushState({}, '', `#${page}`);
    
    // Scroll to the page content smoothly
    requestAnimationFrame(() => {
      const pageContent = document.getElementById('page-content');
      if (pageContent) {
        pageContent.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
  
  // Get action text for navigation buttons
  $: getActionText = (index) => {
    const actionTexts = [
      'Discover Birth Support',
      'Explore Postpartum Care',
      'Get Lactation Support',
      'Find Sleep Solutions',
      'Join A Class',
      'Connect Virtually'
    ];
    return actionTexts[index] || 'Learn More';
  }
  

</script>

<div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
  <!-- App Header -->
  <header 
    class="spa-header text-center mb-8 relative" 
    in:fade={{ duration: 400 }}
  >
    <div class="py-8">
      <h1 class="font-heading text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent pb-4 leading-tight animate-slide-up">
        {appTitle}
      </h1>
      <p class="font-serif text-lg md:text-xl text-slate-600 dark:text-slate-300 italic max-w-3xl mx-auto -mt-2">
        {appSubtitle}
      </p>
    </div>
    <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-linear-to-r from-primary to-accent rounded-full"></div>
  </header>
  
  <!-- Service Cards Navigation -->
  <div 
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
    in:fade={{ duration: 500, delay: 100 }}
  >
    {#each pages as page, i (page.id)}
      <div 
        on:click={() => navigate(page.id)}

        class={`
          group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 flex flex-col
          ${currentPage === page.id 
            ? 'ring-2 ring-primary-500 dark:ring-primary-400 bg-white dark:bg-slate-800 shadow-lg' 
            : 'bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/50 hover:shadow-md'}
          hover:-translate-y-1
        `}
        role="button"
        tabindex="0"
        on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(page.id)}
        aria-label={`Navigate to ${page.title}`}
      >
        <!-- Card Image -->
        <div class="w-full h-40 bg-slate-100 dark:bg-slate-700/50 overflow-hidden relative">
          <div class="relative w-full h-full">
            {#if page.image}
              <img 
                src={page.image}
                alt={page.imageAlt || page.title}
                class="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                class:opacity-0={!loadedImages.includes(page.image)}
                class:opacity-100={loadedImages.includes(page.image)}
                loading={i < 3 ? 'eager' : 'lazy'}
                fetchpriority={i < 2 ? 'high' : 'auto'}
                decoding="async"
                style="transition: opacity 0.3s ease-in-out;"
                on:load|once={() => {
                  if (!loadedImages.includes(page.image)) {
                    loadedImages = [...loadedImages, page.image];
                  }
                }}
                on:error={(e) => {
                  console.error('Error loading image:', page.image);
                  e.target.style.display = 'none';
                  const fallback = e.target.nextElementSibling;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            {/if}
            <div class="image-fallback absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700" style="display: {page.image ? 'none' : 'flex'};">
              <div class="text-center p-4">
                <TablerIcon name={page.icon} size={32} className="text-slate-400 dark:text-slate-500" />
              </div>
            </div>
          </div>
        </div>

        <!-- Content Section -->
        <div class="p-6 flex flex-col grow">
          <div class="flex items-start mb-4">
            <div class={`
              p-2 rounded-lg mr-3 transition-colors duration-200 shrink-0
              ${currentPage === page.id 
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300' 
                : 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20'}
            `}>
              <TablerIcon name={page.icon} size={20} className="text-current" />
            </div>
            <div>
              <h3 class={`
                text-lg font-semibold leading-tight
                ${currentPage === page.id 
                  ? 'text-slate-900 dark:text-white' 
                  : 'text-slate-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400'}
              `}>
                {page.title}
              </h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                {page.description}
              </p>
            </div>
          </div>
          <div class="flex justify-end mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
            <span class={`
              inline-flex items-center text-sm font-medium transition-colors
              ${currentPage === page.id 
                ? 'text-primary-600 dark:text-primary-400' 
                : 'text-slate-500 dark:text-slate-400 group-hover:text-primary-500 dark:group-hover:text-primary-400'}
            `}>
              {getActionText(i)}
              <TablerIcon 
                name="tabler:arrow-right" 
                size={16} 
                className="ml-1 transition-transform duration-200 group-hover:translate-x-1" 
              />
            </span>
          </div>
        </div>
        
        {#if currentPage === page.id}
          <div class="absolute top-0 right-0 bg-primary-500 dark:bg-primary-400 text-white text-xs font-medium px-2 py-1 rounded-bl-lg">
            Current
          </div>
        {/if}
      </div>
    {/each}
  </div>
  
  <!-- Page Content -->
  <div id="page-content" class="transition-opacity duration-300 scroll-mt-24">
    {#if !hasButtonBeenClicked}
      <div class="text-center py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-inner">
        <div class="max-w-2xl mx-auto">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <TablerIcon name="tabler:sparkles" size={32} className="text-primary" />
          </div>
          <h2 class="text-2xl md:text-3xl font-heading font-bold text-slate-800 dark:text-white mb-6">
            Welcome to Our Services
          </h2>
          <p class="text-slate-600 dark:text-slate-300 text-lg mb-6">
            Please select a service from the menu above to learn more about how we can support you.
          </p>
          <button 
            on:click={() => navigate('page1')}
            class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    {:else}
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transform" 
           in:fadeIn={{ duration: 300 }}
           out:fadeOut={{ duration: 200 }}>
        {#if currentPage && pageComponents[currentPage]}
          <svelte:component this={pageComponents[currentPage]} />
        {:else}
          <div class="p-8 text-center">
            <p class="text-slate-500 dark:text-slate-400">Loading page data...</p>
          </div>
        {/if}
      </div>
    {/if}
  </div>
  
  <!-- Status Indicator -->
  {#if isMounted}
    {#if hasButtonBeenClicked}
      <div class="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <div class="inline-flex items-center space-x-1.5">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span>
            Page {currentPage.replace('page', '')} of {pages.length}
          </span>
        </div>
      </div>
    {/if}
  {:else}
    <div class="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
      <div class="inline-flex items-center space-x-1.5">
        <span class="relative flex h-2 w-2">
          <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <span>Loading...</span>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Header styles */
  .spa-header h1 {
    margin-bottom: 2rem !important;
  }

  /* Keyframes for animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  /* Custom animations */
  .animate-slide-up {
    animation: slideUp 0.6s ease-out;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.8s ease-out 0.2s both;
  }
  
  /* Page transitions */
  :global(.page-enter) {
    opacity: 0;
    transform: translateY(10px);
  }
  
  :global(.page-enter-active) {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms, transform 300ms;
  }
  
  :global(.page-exit) {
    opacity: 1;
    transform: translateY(0);
  }
  
  :global(.page-exit-active) {
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 200ms, transform 200ms;
  }
  
  .welcome-message p {
    font-size: 1.25rem;
    color: #4b5563;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
  }
  
  /* Page content styles */
  .page-content h2 {
    color: #1e293b;
    margin-top: 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f1f5f9;
    margin-bottom: 1.5rem;
  }
  
  /* Status Indicator */
  .status {
    margin-top: 1.5rem;
    padding: 0.75rem;
    background: #f8fafc;
    border-radius: 8px;
    text-align: center;
    color: #64748b;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .online { 
    color: #10b981;
    font-size: 1.2rem;
    line-height: 1;
  }
  
  .offline { 
    color: #ef4444;
    font-size: 1.2rem;
    line-height: 1;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .spa-container {
      padding: 1rem 0.5rem;
    }
    
    .spa-nav {
      gap: 0.4rem;
      padding: 0.75rem;
    }
    
    button {
      padding: 0.5rem 0.8rem;
      font-size: 0.9rem;
      flex: 1 0 calc(50% - 0.4rem);
    }
    
    .page-content {
      padding: 1.5rem 1rem;
    }
  }
  
  @media (max-width: 480px) {
    button {
      flex: 1 0 100%;
    }
    
    .status {
      font-size: 0.8rem;
    }
  }
</style>
