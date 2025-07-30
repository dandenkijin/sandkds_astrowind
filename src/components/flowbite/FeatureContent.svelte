<script lang="ts">
  export let title = '';
  export let content = '';
  export let image = '';
  export let imageAlt = '';
  export let ctaText = '';
  export let ctaLink = '#';
  export let reverse = false; // If true, image will be on the right
  export let className = '';
  
  // Default image if none provided
  $: displayImage = image || 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png';
  $: displayAlt = imageAlt || 'Feature content image';
  
  // Grid classes based on reverse prop
  $: containerClasses = `w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-white dark:bg-gray-900 py-16 ${className || ''}`;
  $: gridClasses = 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16';
  $: imageOrderClass = reverse ? 'lg:order-last' : '';
  $: textOrderClass = reverse ? 'lg:order-first' : '';
</script>

<div class={containerClasses}>
  <div class={gridClasses}>
    <!-- Image Column -->
    <div class={`${imageOrderClass} flex items-center`}>
      <div class="w-full h-full flex items-center">
        <img 
          class="w-full h-auto max-h-[500px] rounded-lg shadow-xl dark:shadow-gray-800 object-contain mx-auto" 
          src={displayImage} 
          alt={displayAlt}
        />
      </div>
    </div>
    
    <!-- Content Column -->
    <div class="flex flex-col justify-center py-8">
      <div class="text-gray-700 dark:text-gray-300">
        {#if title}
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {title}
          </h2>
        {/if}
        
        {#if content}
          <div class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 [&_p]:mb-4 [&_p:last-child]:mb-0">
            {@html content}
          </div>
        {/if}
        
        {#if ctaText}
          <div class="mt-8">
            <a 
              href={ctaLink}
              class="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {ctaText}
              <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
