<script>
  import BasePage from './BasePage.svelte';
  import { FeaturesGrid, CallToAction } from '../../flowbite';
  
  // Page 2 specific data
  const pageData = {
    title: 'Postpartum Doula Care',
    description: 'Nurturing care for your "fourth trimester", helping you rest, recover, and bond with your baby.',
    heroImage: '/images/placeholders/postpartum-care.jpg',
    icon: 'tabler:heart-handshake',
    ctaText: 'Learn About Our Postpartum Services',
    ctaLink: '/services/postpartum',
    pageId: 'page2'
  };
  
  // Page 2 specific widgets
  const pageWidgets = [
    // Content Section (using FeaturesGrid with a single item)
    {
      id: 'page2-content',
      component: FeaturesGrid,
      showOnPages: ['page2'],
      props: {
        title: 'Postpartum Support for New Families',
        description: 'The first weeks and months with a new baby are precious but can also be overwhelming. Our postpartum doulas provide the support you need to recover, rest, and bond with your baby.',
        items: [
          {
            title: 'Postpartum Support',
            description: 'The first weeks and months with a new baby are precious but can also be overwhelming. Our postpartum doulas provide the support you need to recover, rest, and bond with your baby.',
            icon: 'HeartSolid',
            ctaText: 'Learn More About Postpartum Support',
            ctaLink: '/services/postpartum'
          }
        ],
        columns: 1,
        align: 'left',
        image: {
          src: '/images/placeholders/postpartum-care.jpg',
          alt: 'Postpartum support',
          position: 'right'
        }
      }
    },
    // Features Section
    {
      id: 'postpartum-features',
      component: FeaturesGrid,
      showOnPages: ['page2'],
      props: {
        title: 'Our Postpartum Services Include',
        description: 'Personalized support during the fourth trimester',
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
        columns: 2
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

<BasePage {pageData} {pageWidgets} />
