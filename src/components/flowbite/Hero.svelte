<script lang="ts">
  import TablerIcon from '../ui/TablerIcon.svelte';
  
  export let title: string = '';
  export let description: string = '';
  export let ctaText: string = '';
  export let ctaLink: string = '#';
  export let imageUrl: string = '';
  export let overlay: boolean = true;
  export let minHeight: string = '500px';
  export let contentPosition: 'left' | 'center' | 'right' = 'center';
  export let textColor: string = 'text-white';
  export let ctaVariant: 'primary' | 'secondary' | 'outline' = 'primary';
  
  const positionClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };
  
  const ctaClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
    outline: 'bg-transparent border-2 border-white hover:bg-white/10 text-white'
  };
</script>

<div class="relative overflow-hidden" style="min-height: {minHeight};">
  {#if imageUrl}
    <div class="absolute inset-0 w-full h-full">
      <img 
        src={imageUrl} 
        alt={title || 'Hero image'}
        class="w-full h-full object-cover"
        loading="lazy"
      />
      {#if overlay}
        <div class="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      {/if}
    </div>
  {:else}
    <div class="absolute inset-0 bg-linear-to-br from-primary-600 to-primary-800"></div>
  {/if}
  
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-16 sm:py-24">
    <div class={`w-full ${positionClasses[contentPosition]} flex flex-col ${textColor}`}>
      {#if title}
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          {title}
        </h1>
      {/if}
      
      {#if description}
        <p class="text-lg sm:text-xl max-w-3xl mb-8 sm:mb-12 opacity-90">
          {description}
        </p>
      {/if}
      
      {#if ctaText}
        <div class="flex flex-wrap gap-4">
          <a 
            href={ctaLink} 
            class={`inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg font-medium rounded-lg transition-all duration-200 ${ctaClasses[ctaVariant]}`}
          >
            {ctaText}
            <TablerIcon name="tabler:arrow-right" size={20} className="ml-2 -mr-1" />
          </a>
        </div>
      {/if}
    </div>
  </div>
</div>
