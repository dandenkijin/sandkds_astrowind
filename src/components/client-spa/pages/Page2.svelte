<script>
  // import BasePage from './BasePage.svelte';
  import CallToAction from '../../flowbite/CallToAction.svelte';
  import PageTemplate from '../PageTemplate.svelte';
  import FeaturesGrid from '../../flowbite/FeaturesGrid.svelte'; // Using FeaturesGrid from Flowbite
  import ContentCard from '../../flowbite/ContentCard.svelte';
  import Features from '../../flowbite/Features.svelte';
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
    // Postpartum Support Features
    {
      id: 'postpartum-support-features',
      component: Features.default || Features,
      showOnPages: ['page2'],
      props: {
        title: 'Comprehensive Postpartum Support',
        tagline: 'Our Services Include',
        subtitle: 'We provide a wide range of services to support you through your postpartum journey',
        columns: 3,
        items: [
          {
            title: 'Support As You Process Your Birth Story',
            description: 'A safe space to share and process your birth experience',
            icon: 'tabler:message-circle-2'
          },
          {
            title: 'Postpartum Meal Prep',
            description: 'Nutrition-focused meal preparation to support your recovery',
            icon: 'tabler:cooker'
          },
          {
            title: 'Postpartum Recovery Tips/Tools',
            description: 'Essential guidance for physical recovery after birth',
            icon: 'tabler:heart-rate-monitor'
          },
          {
            title: 'Baby Bonding',
            description: 'Support in developing a strong bond with your newborn',
            icon: 'tabler:heart-handshake'
          },
          {
            title: 'Infant Feeding Support',
            description: 'Expert assistance with breastfeeding, pumping, and bottle feeding',
            icon: 'tabler:baby-bottle'
          },
          {
            title: 'Newborn Care',
            description: 'Guidance on swaddling, soothing, and general newborn care',
            icon: 'tabler:baby-carriage'
          },
          {
            title: 'Help with Establishing Routines',
            description: 'Creating sustainable daily routines for your family',
            icon: 'tabler:clock'
          },
          {
            title: 'Diapering',
            description: 'Expert guidance on diapering, including cloth options',
            icon: 'tabler:diaper'
          },
          {
            title: 'Umbilical Cord Care',
            description: 'Proper care and hygiene for your newborn\'s umbilical cord',
            icon: 'tabler:cross'
          },
          {
            title: 'Circumcision Care',
            description: 'Gentle care instructions for circumcision healing',
            icon: 'tabler:bandage'
          },
          {
            title: 'Bathing',
            description: 'Safe and comfortable bathing techniques for your baby',
            icon: 'tabler:droplet'
          },
          {
            title: 'Milestones/Development Guidance',
            description: 'Understanding and supporting your baby\'s development',
            icon: 'tabler:chart-dots'
          },
          {
            title: 'Safe Sleep Practices',
            description: 'Education on co-sleeping, bed sharing, and safe sleep',
            icon: 'tabler:moon'
          },
          {
            title: 'Car Seat Safety Basics',
            description: 'Proper installation and use of car seats',
            icon: 'tabler:car'
          },
          {
            title: 'Returning to Work Transition',
            description: 'Support for the transition back to work',
            icon: 'tabler:briefcase'
          },
          {
            title: 'Errands',
            description: 'Assistance with errands and household tasks',
            icon: 'tabler:shopping-cart'
          },
          {
            title: 'Emotional Support',
            description: 'Watch and support for PMADs (Perinatal Mood and Anxiety Disorders)',
            icon: 'tabler:heart'
          },
          {
            title: 'Light Housekeeping',
            description: 'Help with light cleaning and nursery organization',
            icon: 'tabler:home'
          },
          {
            title: 'Referrals and Resources',
            description: 'Connections to additional support services and resources',
            icon: 'tabler:link'
          }
        ]
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
