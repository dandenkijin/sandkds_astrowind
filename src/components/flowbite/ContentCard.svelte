<script>
  export let title = '';
  export let content = '';
  export let image = '';
  export let imageAlt = '';
  export let ctaText = '';
  export let ctaLink = '#';
  export let horizontal = false;
  export let className = '';
  
  $: cardClasses = `max-w-sm bg-white rounded-lg shadow ${horizontal ? 'md:max-w-xl md:flex' : ''} ${className}`;
  $: imageClasses = `rounded-t-lg ${horizontal ? 'md:rounded-none md:rounded-l-lg w-full h-48 md:h-auto md:w-48' : 'w-full'}`;
  $: bodyClasses = `p-5 ${horizontal ? 'md:flex-1' : ''}`;
</script>

<div class={cardClasses}>
  {#if image}
    <img class={imageClasses} src={image} alt={imageAlt || title} />
  {/if}
  <div class={bodyClasses}>
    {#if title}
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h5>
    {/if}
    {#if content}
      <p class="mb-3 font-normal text-gray-700">
        {content}
      </p>
    {/if}
    {#if ctaText}
      <a 
        href={ctaLink} 
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        {ctaText}
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </a>
    {/if}
  </div>
</div>
