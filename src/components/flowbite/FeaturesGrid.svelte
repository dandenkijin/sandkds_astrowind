<script lang="ts">
  import { Card, A } from 'flowbite-svelte';
  import { HeartSolid, UserCircleSolid, UsersGroupSolid } from 'flowbite-svelte-icons';
  import Icon from '../ui/TablerIcon.svelte';
  
  export const id = 'features-grid';
  export let title = '';
  export let subtitle = '';
  export let tagline = '';
  // Define the item type with all possible properties
  interface FeatureItem {
    title: string;
    description: string;
    icon?: string;
    link?: string;
    image?: string | { src: string };
    imageAlt?: string;
  }

  export let items: FeatureItem[] = [];
  export let columns = 3;
  // Dark mode is handled by Tailwind's dark: classes
// Remove isDark prop as we'll use the dark: variant instead
  export let containerClass = '';
  export let defaultIcon: string | null = null;
  export let imageUrl: string | null = null;
  export let imageAlt: string | null = null;
  
  // Calculate grid columns based on the columns prop
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
</script>

<div class={`w-full ${containerClass}`}>
  <div class="w-full">
  {#if tagline}
    <p class="text-center text-primary-600 dark:text-primary-400 text-lg font-semibold mb-2">
      {tagline}
    </p>
  {/if}
  
  {#if title}
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">
      {title}
    </h2>
  {/if}
  
  {#if subtitle}
    <p class="text-lg text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
      {subtitle}
    </p>
  {/if}
  
  {#if imageUrl}
    <div class="w-full h-80 overflow-hidden rounded-xl mb-12">
      <img 
        src={imageUrl} 
        alt={imageAlt} 
        class="w-full h-full object-cover"
      />
    </div>
  {/if}
  
  <div class="w-full">
    <div class={`grid ${gridCols} gap-8 w-full`}>
    {#each items as item, i}
      <Card class="h-full w-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div class="flex flex-col h-full">
          {#if item.image}
            <div class="h-40 overflow-hidden mb-4">
              <img 
                src={typeof item.image === 'string' ? item.image : item.image.src} 
                alt={item.imageAlt || item.title} 
                class="w-full h-full object-cover"
              />
            </div>
          {/if}
          <div class="p-6 flex flex-col h-full">
            <div class="flex items-center mb-4">
              {#if item.icon || defaultIcon}
                <div class="p-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200 mr-3">
                  {#if item.icon === 'HeartSolid'}
                    <HeartSolid class="w-6 h-6" />
                  {:else if item.icon === 'UsersGroup'}
                    <UsersGroupSolid class="w-6 h-6" />
                  {:else if item.icon === 'UserCircle'}
                    <UserCircleSolid class="w-6 h-6" />
                  {/if}
                </div>
              {/if}
              <h3 class="text-xl font-bold">{item.title}</h3>
            </div>
          
          <p class="text-gray-600 dark:text-gray-300 flex-grow mb-4">
            {item.description}
          </p>
          
          {#if item.link}
            <A href={item.link} class="mt-auto text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200 font-medium inline-flex items-center">
              Learn more
              <Icon name="tabler:arrow-right" className="ml-1 w-4 h-4" />
            </A>
          {/if}
          </div>
        </div>
      </Card>
    {/each}
    </div>
  </div>
</div>
</div>
