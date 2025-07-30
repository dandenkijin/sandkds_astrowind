<script lang="ts">
  import { onMount } from 'svelte';
  
  export let items: Array<{
    title: string;
    description: string;
    icon?: string;
  }> = [];
  export let columns: number = 3;
  export let defaultIcon: string = 'tabler:check';
  export let classes: Record<string, string> = {};

  // Calculate grid columns based on the columns prop
  $: gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
</script>

<div class={`grid gap-6 md:gap-8 ${gridClass} ${classes.container || ''}`}>
  {#each items as item, i}
    <div class={`${classes.panel || ''}`}>
      <div class="flex items-start">
        {#if item.icon || defaultIcon}
          <div class={classes.icon || ''}>
            <svelte:component
              this={item.icon || defaultIcon}
              class="w-6 h-6"
              aria-hidden="true"
            />
          </div>
        {/if}
        <div class="ml-4">
          <h3 class={classes.title || 'text-lg font-medium leading-6 text-gray-900 dark:text-white'}>
            {item.title}
          </h3>
          {#if item.description}
            <p class={`${classes.description || 'mt-2 text-gray-600 dark:text-gray-400'}`}>
              {item.description}
            </p>
          {/if}
        </div>
      </div>
    </div>
  {/each}
</div>
