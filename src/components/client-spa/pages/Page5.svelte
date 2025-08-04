<script>
  import ComingSoon from '../components/ComingSoon.svelte';
  
  // Page specific data
  const pageData = {
    title: 'Coming Soon',
    description: 'This page is currently under development. We\'re working hard to bring you valuable content and resources.',
    ctaText: 'Return to Home',
    ctaLink: '/client#page1'
  };
</script>

<!-- Coming Soon Component -->
<ComingSoon 
  title={pageData.title}
  description={pageData.description}
  ctaText={pageData.ctaText}
  ctaLink={pageData.ctaLink}
/>
