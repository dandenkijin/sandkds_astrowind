<script>
  import { onMount } from 'svelte';
  import PageTemplate from '../PageTemplate.svelte';
  import FeaturesGrid from '../../flowbite/FeaturesGrid.svelte';
  import ContentCard from '../../flowbite/ContentCard.svelte';
  
  // Import the image using Astro's asset handling
  import heroImage from '/src/assets/images/doula_mountain_h_singlton_imrs.avif';
  import cardImage from '/src/assets/images/care_items_robe_slippers.png';
  const heroImageUrl = heroImage;
  
  // Page 1 specific data
  const pageData = {
    title: 'Empowering Your Birth Journey',
    description: 'Experience personalized, compassionate support throughout your pregnancy, birth, and beyond with our professional doula services.',
    heroImage: heroImageUrl,
    icon: 'tabler:home',
    ctaText: 'Book Your Free Consultation',
    ctaLink: '/contact',
    pageId: 'page1',
    image: cardImage
  };
  
  // helper for consistent project button styles on actions
  const toProjectButton = (label, href = '#', variant = 'primary') => ({
    label,
    href,
    icon: '',
    className: `btn ${variant}` // Will use 'btn primary' or 'btn secondary' etc.
  });
  
  // Page 1 specific components
  const pageWidgets = [
    // Content Card Component
    {
      id: 'content-card',
      component: ContentCard,
      showOnPages: ['page1'],
      props: {
        title: 'Here to Assist You',
        content: `
          <p>Our team of experienced doulas provides continuous physical, emotional, and informational support before, during, and after childbirth. Our services include:</p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>2-3 prenatal visits to discuss your birth preferences</li>
            <li>24/7 on-call support from 38-42 weeks</li>
            <li>Continuous labor support at your chosen birth location</li>
            <li>Initial postpartum support and breastfeeding assistance</li>
            <li>One follow-up postpartum visit</li>
          </ul>
        `,
        image: cardImage,
        imageAlt: 'Care Items',
        horizontal: true,
        className: 'w-full my-8',
        actions: [
          {
            label: 'Book a Free Consultation',
            href: '/contact',
            variant: 'primary'
          }
        ]
      }
    },
    // Features Grid Component
    {
      id: 'features-grid',
      component: FeaturesGrid.default || FeaturesGrid, // Handle both default and named exports
      showOnPages: ['page1'],
      props: {
        title: 'Birth Doula Services',
        subtitle: 'Our comprehensive birth doula services are designed to support you every step of the way—from pregnancy to postpartum.',
        tagline: 'What We Offer',
        columns: 3,
        items: [
          {
            title:'Three Prenatal Visits',
            description:'We will meet with you to discuss your birth preferences, answer any questions, and prepare for the big day. These visits provide an opportunity to build a relationship with your doula and create a plan that aligns with your vision for birth.',
            icon: 'HeartHandshake',
          },
          {
            title: 'Uninterrupted Labor Support',
            description: 'We offer continuous, undivided support throughout your labor and delivery, whether at home, in the hospital, or at a birth center. Our doulas are there to assist with comfort measures, emotional support, and advocacy, ensuring your birth unfolds as you envision.',
            icon: 'HeartSolid',
          },
          {
            title: 'Postpartum Support',
            description: 'We offer initial support after birth for recovery and newborn care. Our team is here to provide emotional support, practical advice, and guidance to help you navigate the early days of parenthood.',
            icon: 'UserCircle',
          },
        ]
      }
    }
  ];
  
  // Debug log the widgets before passing to PageTemplate
  console.log('Page1 - pageWidgets:', {
    pageWidgets,
    hasComponent: pageWidgets[0]?.component ? 'Yes' : 'No',
    componentType: pageWidgets[0]?.component?.name || 'Unknown',
    pageId: pageData.pageId
  });
</script>

<!-- Button styles have been moved to the Button component -->

<PageTemplate
  title={pageData.title}
  description={pageData.description}
  heroImage={pageData.heroImage}
  ctaText={pageData.ctaText}
  ctaClass="btn btn-primary rounded-3xl bg-[#ec4899] hover:bg-[#db2777] border border-[#ec4899]/90 hover:border-[#db2777] text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6]"
  widgets={pageWidgets.map(w => {
    if (w?.props?.actions && Array.isArray(w.props.actions)) {
      w = {
        ...w,
        props: {
          ...w.props,
          actions: w.props.actions.map(a => ({
            ...a,
            className: a.className ?? 'btn btn-tertiary'
          }))
        }
      };
    }
    return w;
  })}
  pageId={pageData.pageId}
 />
