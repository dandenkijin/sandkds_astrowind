<script>
  export let title = '';
  export let content = '';
  export let image = '';
  export let imageAlt = '';
  export let horizontal = false;
  export let className = '';
  export let actions = [];
  export let headerClass = '';
  export let bodyClass = '';
  
  // Handle image source and alt text
  $: imageSrc = typeof image === 'string' ? image : image?.src || '';
  $: imageAltText = imageAlt || (typeof image === 'object' ? image.alt : '') || title;
  
  // Card container classes
  $: cardClasses = `
    flex flex-col 
    bg-white border border-gray-200 
    rounded-lg shadow-sm 
    w-full
    ${horizontal ? 'md:flex-row' : 'flex-col'}
    dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700
    overflow-hidden
    ${className || ''}
  `;
  
  // Image container classes
  $: imageContainerClasses = `
    ${horizontal ? 'w-full md:w-1/3 h-64 md:h-auto' : 'w-full'}
    ${image?.position === 'right' ? 'md:order-last' : ''}
    overflow-hidden
    ${horizontal ? 'md:rounded-l-lg md:rounded-r-none' : 'rounded-t-lg'}
  `;
  
  // Content container classes
  $: contentContainerClasses = `
    p-6
    ${horizontal ? 'w-full md:w-2/3' : 'w-full'}
  `;
  
  $: headerClasses = `text-2xl font-bold text-gray-900 dark:text-white mb-4 ${headerClass}`;
  $: bodyClasses = `prose prose-gray dark:prose-invert max-w-none ${bodyClass}`;
</script>

<div class={cardClasses}>
  {#if imageSrc}
    <div class={imageContainerClasses}>
      <img 
        src={imageSrc} 
        alt={imageAltText} 
        class="w-full h-full object-cover"
        on:error={() => console.error('Failed to load image:', imageSrc)}
      />
    </div>
  {/if}
  
  <div class={contentContainerClasses}>
    {#if title}
      <h2 class={headerClasses}>
        {title}
      </h2>
    {/if}
    
    {#if content}
      <div class={bodyClasses}>
        {@html content}
      </div>
    {/if}
    
    {#if actions && actions.length > 0}
      <div class="mt-6 flex flex-wrap gap-3">
        {#each actions as action}
          <a 
            href={action.href || '#'} 
            class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {action.label}
            {#if action.icon}
              <span class="ml-2" innerHTML={action.icon}></span>
            {/if}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>
