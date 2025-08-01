<script lang="ts">
  import { Card, A } from 'flowbite-svelte';
  import Icon from '../ui/TablerIcon.svelte';
  
  export let title = '';
  export let subtitle = '';
  export let tagline = '';
  export let items: Array<{
    title: string;
    description: string;
    icon?: string;
    link?: string;
  }> = [];
  export let columns = 2;
  export let defaultIcon: string | null = null;
  export let isDark = false;
  export let containerClass = '';
  
  // Calculate grid columns based on the columns prop
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  }[columns] || 'grid-cols-1 md:grid-cols-2';
  
  // Default icon if none provided
  const getIcon = (icon: string | undefined) => {
    return icon || defaultIcon || 'tabler:check';
  };
</script>

<div class={`w-full ${containerClass} ${isDark ? 'dark' : ''}`}>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Tagline -->
    {#if tagline}
      <p class="text-center text-primary-600 dark:text-primary-400 text-lg font-semibold mb-2">
        {tagline}
      </p>
    {/if}
    
    <!-- Title -->
    {#if title}
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">
        {title}
      </h2>
    {/if}
    
    <!-- Subtitle -->
    {#if subtitle}
      <p class="text-lg text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
        {subtitle}
      </p>
    {/if}
    
    <!-- Features Grid -->
    <div class={`grid ${gridCols} gap-8`}>
      {#each items as item}
        <div class="flex">
          {#if item.icon || defaultIcon}
            <div class="text-white bg-primary-600 rounded-full w-10 h-10 p-2 md:w-12 md:h-12 md:p-3 mr-4 rtl:ml-4 rtl:mr-0 shrink-0">
              <Icon name={getIcon(item.icon)} className="w-full h-full" />
            </div>
          {/if}
          <div>
            <h3 class="text-xl font-bold mb-2">{item.title}</h3>
            <p class="text-gray-600 dark:text-gray-300">
              {item.description}
            </p>
            {#if item.link}
              <A href={item.link} class="mt-2 inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline">
                Learn more
                <Icon name="tabler:arrow-right" className="ml-1 w-4 h-4" />
              </A>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
