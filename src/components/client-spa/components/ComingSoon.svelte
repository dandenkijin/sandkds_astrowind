<script>
  import { onMount } from 'svelte';
  import Button from './Button.svelte';
  
  export let title = 'Coming Soon';
  export let description = 'We\'re working hard to bring you this content. Please check back later!';
  export let ctaText = 'More info';
  export let ctaLink = '/client#features';
  
  let currentPage = '';
  
  onMount(() => {
    // Get the current page number from the URL using browser's location
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const pageMatch = path.match(/page(\d+)/);
      currentPage = pageMatch ? pageMatch[1] : '';
    }
  });
  
  // Animation for the coming soon text
  let isVisible = false;
  
  onMount(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      isVisible = true;
    }, 100);
    
    return () => clearTimeout(timer);
  });
</script>

<div class="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8 text-center">
    <div class="transform transition-all duration-1000 {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}">
      <div class="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-primary-100 dark:bg-primary-900/50 mb-6">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-12 w-12 text-primary-600 dark:text-primary-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="1.5" 
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>
      
      <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
        {title}
      </h1>
      
      <p class="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
        {description}
      </p>
      
      {#if currentPage}
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Page {currentPage} is under construction
        </p>
      {/if}
      
      <div class="mt-10 flex justify-center">
        <Button href={ctaLink} variant="primary">
          {ctaText}
        </Button>
      </div>
    </div>
  </div>
</div>

<style>
  /* Add any custom styles here if needed */
</style>
