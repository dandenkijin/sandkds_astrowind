<!-- eslint-disable prefer-const -->
<script lang="ts">
  import { onMount } from 'svelte';
  import TablerIcon from '../ui/TablerIcon.svelte';
  import type { SvelteComponent } from 'svelte';
  
  // Define the widget type
  interface Widget {
    id?: string;
    component: typeof SvelteComponent;
    showOnPages: string[] | 'all';
    props?: Record<string, unknown>;
  }
  
  // Props with default values
  export let title = '';
  export let description = '';
  export let ctaText = 'Learn More';
  export let ctaLink = '#';
  export let widgets: Widget[] = [];
  export let pageId = '';
  export let heroImage: string | { src: string } = ''; // Can be a URL string or an imported image object
  export let imageUrl = ''; // Kept for backward compatibility
  
  // Track mounted state for animations
  let isMounted = false;
  
  // Debug: Log props when they change
  $: {
    console.log('PageTemplate - Props changed:', {
      pageId,
      hasWidgets: Array.isArray(widgets),
      widgetCount: widgets?.length || 0,
      widgets: widgets?.map(w => ({
        id: w?.id,
        component: w?.component?.name || 'Unknown',
        showOnPages: w?.showOnPages
      }))
    });
  }
  
  // Filter widgets to show only those for the current page
  $: filteredWidgets = (Array.isArray(widgets) ? widgets : []).filter(widget => {
    if (!widget) {
      console.warn('Skipping null/undefined widget');
      return false;
    }
    
    // Debug widget structure
    console.log('Processing widget:', {
      id: widget.id,
      hasComponent: !!widget.component,
      componentName: widget.component?.name || 'Unknown',
      showOnPages: widget.showOnPages,
      pageId
    });
    
    if (!widget.showOnPages) {
      console.warn(`Widget ${widget.id || 'unnamed'} has no showOnPages defined`);
      return false;
    }
    
    const showOnPages = Array.isArray(widget.showOnPages) 
      ? widget.showOnPages 
      : [widget.showOnPages];
      
    const isVisible = showOnPages.includes(pageId) || showOnPages.includes('all');
    
    console.log(`Widget ${widget.id || 'unnamed'} visibility check:`, {
      pageId,
      showOnPages,
      isVisible,
      hasComponent: !!widget.component,
      componentType: widget.component?.name || 'Unknown',
      widget
    });
    
    const isValid = isVisible && !!widget.component;
    if (!isValid) {
      console.warn(`Widget ${widget.id || 'unnamed'} is not visible or has no component`, {
        pageId,
        showOnPages,
        hasComponent: !!widget.component,
        componentType: widget.component?.name || 'Unknown'
      });
    }
    
    return isValid;
  });
  
  // Debug log filtered widgets
  $: {
    console.log('Filtered widgets:', {
      pageId,
      totalWidgets: widgets?.length || 0,
      filteredCount: filteredWidgets?.length || 0,
      filteredWidgets: filteredWidgets?.map(w => ({
        id: w?.id,
        component: w?.component?.name || 'Unknown',
        showOnPages: w?.showOnPages
      }))
    });
  }
  
  onMount(() => {
    isMounted = true;
    console.log('PageTemplate mounted with:', {
      pageId,
      title,
      widgetCount: widgets?.length || 0,
      filteredWidgetCount: filteredWidgets?.length || 0
    });
    return () => { isMounted = false; };
  });
</script>

<!-- Hero Section with Background Image -->
<div class="relative bg-gray-900 h-[500px] flex items-center justify-center overflow-hidden">
  {#if heroImage}
    <img 
      src={typeof heroImage === 'string' ? heroImage : heroImage.src} 
      alt={title || 'Hero image'} 
      class="absolute inset-0 w-full h-full object-cover {pageId === 'page1' ? 'opacity-100' : 'opacity-50'}"
      on:error="{() => console.error('Error loading hero image:', heroImage)}"
    />
  {/if}
  
  <div class="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center w-full">
    <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
      {title}
    </h1>
    
    {#if description}
      <p class="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
        {description}
      </p>
    {/if}
    
    {#if ctaText}
      <a 
        href={ctaLink || '#'} 
        class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
      >
        {ctaText}
      </a>
    {/if}
  </div>
</div>

  <!-- Main Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">

  <!-- Widgets Section -->
  {#if filteredWidgets && filteredWidgets.length > 0}
    <div class="mt-16 w-full">
      {#each filteredWidgets as widget}
        {#if widget.id === 'features-grid'}
          <!-- Special handling for FeaturesGrid -->
          <div class="w-full">
            <svelte:component
              this={widget.component}
              {...widget.props}
            />
          </div>
        {:else}
          <!-- Default widget rendering -->
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div class="widget-item">
              <svelte:component
                this={widget.component}
                {...widget.props}
              />
            </div>
          </div>
        {/if}
      {/each}
      <div class="mt-4 text-center">
        <p class="text-xs text-slate-400 dark:text-slate-500">
          Page ID: {pageId} | Showing {filteredWidgets.length} widget{filteredWidgets.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  {:else}
    <!-- Debug: Show when no widgets are available -->
    <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-center my-8">
      <p class="text-slate-500 dark:text-slate-400">
        {widgets && widgets.length > 0 
          ? 'No widgets configured for this page.' 
          : 'No widgets available.'}
      </p>
      <p class="text-xs mt-2 text-slate-400 dark:text-slate-500">
        Page ID: {pageId} | Total widgets: {widgets?.length || 0} | Filtered: {filteredWidgets?.length || 0}
      </p>
    </div>
  {/if}

  <!-- Image Section -->
  {#if imageUrl}
    <div class="my-8 sm:my-12 text-center">
      <div class="relative inline-block max-w-full">
        <img 
          src={imageUrl} 
          alt={title} 
          class="max-w-full h-auto rounded-xl shadow-lg mx-auto border border-slate-100 dark:border-slate-700/50"
          loading="lazy"
          width="800"
          height="450"
        />
        <div class="absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/5 dark:ring-white/10 pointer-events-none"></div>
      </div>
    </div>
  {/if}

  <!-- CTA Button -->
  {#if ctaLink && ctaLink !== '#'}
    <div class="mt-8 sm:mt-12 text-center">
      <a 
        href={ctaLink} 
        class="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg font-medium text-white dark:text-slate-900 bg-gradient-to-r from-primary to-accent hover:from-primary-600 hover:to-accent-500 dark:from-primary-300 dark:to-accent-300 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 dark:focus-visible:ring-offset-slate-900"
      >
        {ctaText}
        <TablerIcon name="tabler:arrow-right" size={20} className="ml-2 -mr-1" />
      </a>
    </div>
  {/if}
</div>
