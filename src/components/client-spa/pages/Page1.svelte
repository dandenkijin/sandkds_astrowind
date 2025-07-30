<script>
  import { onMount } from 'svelte';
  import PageTemplate from '../PageTemplate.svelte';
  import FeaturesGrid from '../../flowbite/FeaturesGrid.svelte';
  import FeatureContent from '../../flowbite/FeatureContent.svelte';
  
  // Import the image using Astro's asset handling
  import heroImage from '../../../assets/images/doula_mountain_h_singlton_imrs.avif';
  import featureImage from '../../../assets/images/care_items_robe_slippers.png';
  const heroImageUrl = heroImage;
  
  // Page 1 specific data
  const pageData = {
    title: 'Empowering Your Birth Journey',
    description: 'Experience personalized, compassionate support throughout your pregnancy, birth, and beyond with our professional doula services.',
    heroImage: heroImageUrl,
    icon: 'tabler:home',
    ctaText: 'Book Your Free Consultation',
    ctaLink: '/contact',
    pageId: 'page1'
  };
  
  // Page 1 specific components
  const pageWidgets = [
    // Feature Content Component
    {
      id: 'feature-content',
      component: FeatureContent,
      showOnPages: ['page1'],
      props: {
        title: 'Personalized Birth Support',
        content: `
          <p>Every birth journey is unique, and we're here to support yours with personalized care and attention. Our experienced doulas provide emotional, physical, and informational support throughout your pregnancy, labor, and beyond.</p>
          <p class="mt-4">We believe in empowering you with knowledge and confidence as you prepare for one of life's most transformative experiences.</p>
        `,
        image: featureImage,
        imageAlt: 'A doula providing support during labor',
        ctaText: 'Learn More About Our Services',
        ctaLink: '/services',
        reverse: false,
        className: ''
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

<PageTemplate 
  title={pageData.title}
  description={pageData.description}
  heroImage={pageData.heroImage}
  ctaText={pageData.ctaText}
  ctaLink={pageData.ctaLink}
  widgets={pageWidgets} 
  pageId={pageData.pageId} 
/>
