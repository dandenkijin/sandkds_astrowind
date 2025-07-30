<script>
  // import BasePage from './BasePage.svelte';
  import CallToAction from '../../flowbite/CallToAction.svelte';
  import PageTemplate from '../PageTemplate.svelte';
  import FeaturesGrid from '../../flowbite/FeaturesGrid.svelte';
  import ContentCard from '../../flowbite/ContentCard.svelte';
  // Import the image using Astro's asset handling
  import cardImage from '/src/assets/images/postpartum_scene_breakfast_mom_doula_dad.png';
  
  // Page 2 specific data
  const pageData = {
    title: 'Postpartum Doula Care',
    description: 'Nurturing care for your "fourth trimester", helping you rest, recover, and bond with your baby.',
    heroImage: '/src/assets/images/historical_doula.png',
    icon: 'tabler:heart-handshake',
    ctaText: 'Learn About Our Postpartum Services',
    ctaLink: '/services/postpartum',
    pageId: 'page2'
  };
  
  // Page 2 specific widgets
  const pageWidgets = [
    // Content Card Component
    {
      id: 'content-card',
      component: ContentCard,
      showOnPages: ['page2'],
      props: {
        title: 'Nurturing Your Fourth Trimester, Embracing Your Family',
        content: `
          <p>Imagine waking up to a nourishing breakfast, knowing you have the support you need to care for your newborn. Our postpartum doulas provide hands-on assistance with:</p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>Newborn care guidance and support</li>
            <li>Light housekeeping and meal preparation</li>
            <li>Emotional and physical recovery support</li>
            <li>Breastfeeding and infant feeding assistance</li>
            <li>Sibling and family adjustment support</li>
          </ul>
          <p class="mt-4">With our support, you can focus on bonding with your baby and recovering from birth with confidence.</p>
        `,
        image: cardImage,
        imageAlt: 'Postpartum doula supporting new parents with breakfast',
        horizontal: true,
        className: 'w-full my-8',
        actions: [
          {
            label: 'Learn More About Our Postpartum Services',
            href: '/services/postpartum',
            variant: 'primary',
            size: 'lg'
          }
        ]
      }
    },
    // Content Section (using FeaturesGrid with a single item)
    {
      id: 'page2-content',
      component: FeaturesGrid.default || FeaturesGrid,
      showOnPages: ['page2'],
      props: {
        title: 'Postpartum Support for New Families',
        tagline: 'Compassionate Care When You Need It Most',
        description: 'The first weeks and months with a new baby are precious but can also be overwhelming. Our postpartum doulas provide the support you need to recover, rest, and bond with your baby.',
        items: [
          {
            title: 'Overnight Support',
            description: 'Get the rest you need while we care for your newborn through the night, helping establish healthy sleep patterns.',
            icon: 'tabler:moon-stars'
          },
          {
            title: 'Daytime Care',
            description: 'Daytime support with newborn care, light housekeeping, meal prep, and emotional support.',
            icon: 'tabler:sun'
          },
          {
            title: 'Feeding Support',
            description: 'Expert guidance with breastfeeding, bottle feeding, or combination feeding.',
            icon: 'tabler:glass-full'
          }
        ],
        columns: 3,
      }
    },
    // Features Section - matching Page1's features grid
    {
      id: 'features-grid', // Using the same ID as Page1 for consistent handling
      component: FeaturesGrid.default || FeaturesGrid,
      showOnPages: ['page2'],
      props: {
        title: 'Our Postpartum Services',
        subtitle: 'Comprehensive support for your fourth trimester journey',
        tagline: 'What We Offer',
        columns: 3,
        items: [
          {
            title: 'Newborn Care',
            description: 'Guidance on feeding, sleeping, and soothing your baby',
            icon: 'BabyCarriageSolid'
          },
          {
            title: 'Recovery Support',
            description: 'Help with physical recovery after birth',
            icon: 'HeartPulseSolid'
          },
          {
            title: 'Light Housekeeping',
            description: 'Assistance with laundry, dishes, and light meal prep',
            icon: 'BroomSolid'
          },
          {
            title: 'Emotional Support',
            description: 'A listening ear during the transition to parenthood',
            icon: 'HandHoldingHeart'
          }
        ],
      }
    },
    // Call to Action
    {
      id: 'postpartum-cta',
      component: CallToAction,
      showOnPages: ['page2'],
      props: {
        title: 'Get the Support You Deserve',
        description: 'Contact us to learn more about our postpartum doula services and how we can help your family thrive.',
        primaryButton: {
          text: 'Schedule a Consultation',
          url: '/contact'
        },
        secondaryButton: {
          text: 'View Service Packages',
          url: '/services/postpartum#packages'
        },
        align: 'center',
        background: 'gradient'
      }
    }
  ];
</script>

<PageTemplate 
  title={pageData.title}
  description={pageData.description}
  heroImage={pageData.heroImage}
  ctaText={pageData.ctaText}
  widgets={pageWidgets} 
  pageId={pageData.pageId} 
/>
