<!-- eslint-disable prefer-const -->
<script>
  import PageTemplate from '../PageTemplate.svelte';
  
  export let pageData = {};
  export let widgets = [];
  
  // Default page data
  const defaultPageData = {
    title: '',
    description: '',
    icon: 'tabler:help',
    ctaText: 'Learn More',
    ctaLink: '#',
    pageId: '',
    heroImage: ''
  };
  
  // Merge default data with provided data
  $: mergedData = { ...defaultPageData, ...pageData };
  
  // Filter widgets that should be shown on this page
  $: visibleWidgets = widgets.filter(widget => 
    widget?.showOnPages?.includes(mergedData.pageId) || 
    widget?.showOnPages?.includes('all')
  );
</script>

<PageTemplate
  title={mergedData.title}
  description={mergedData.description}
  heroImage={mergedData.heroImage}
  icon={mergedData.icon}
  ctaText={mergedData.ctaText}
  ctaLink={mergedData.ctaLink}
  pageId={mergedData.pageId}
  widgets={visibleWidgets}
/>
