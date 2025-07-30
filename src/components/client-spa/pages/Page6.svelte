<script>
  import BasePage from './BasePage.svelte';
  import { FeaturesGrid, CallToAction } from '../../flowbite';
  
  // Page 6 specific data
  const pageData = {
    title: 'Virtual Doula Support',
    description: 'Compassionate care and guidance through pregnancy and infant loss.',
    heroImage: '/images/placeholders/bereavement-support.jpg',
    icon: 'tabler:heart-broken',
    ctaText: 'Get Support Now',
    ctaLink: '/support/bereavement',
    pageId: 'page6',
    darkMode: true  // Use dark mode for this sensitive topic
  };
  
  // Page 6 specific widgets
  const pageWidgets = [
    // Intro Section
    {
      id: 'bereavement-intro',
      component: FeaturesGrid,
      showOnPages: ['page6'],
      props: {
        title: 'You Are Not Alone',
        description: 'The pain of losing a baby is profound and deeply personal. Our Virtual Doula Support services provide a safe, compassionate space to honor your grief, remember your baby, and find healing in your own time and way.',
        items: [{
          title: 'Compassionate Support',
          description: 'Our team of bereavement doulas is here to provide the support and understanding you need during this difficult time.',
          ctaText: 'Contact a Support Specialist',
          ctaLink: '/contact/bereavement'
        }],
        columns: 1,
        align: 'right',
        dark: true,
        image: {
          src: '/images/placeholders/bereavement-support-2.jpg',
          alt: 'Compassionate bereavement support',
          position: 'left'
        }
      }
    },
    // Support Options Section
    {
      id: 'support-options',
      component: FeaturesGrid,
      showOnPages: ['page6'],
      props: {
        title: 'Our Support Services',
        description: 'Compassionate care for your journey through grief',
        items: [
          {
            title: 'One-on-One Counseling',
            description: 'Individual sessions with a bereavement specialist',
            icon: 'ChatBubbleLeftRightSolid'
          },
          {
            title: 'Support Groups',
            description: 'Connect with others who understand your loss',
            icon: 'UserGroupSolid'
          },
          {
            title: 'Memorial Services',
            description: 'Meaningful ways to honor and remember your baby',
            icon: 'HeartSolid'
          },
          {
            title: 'Pregnancy After Loss',
            description: 'Support for subsequent pregnancies',
            icon: 'HeartCrackSolid'
          },
          {
            title: 'Family Support',
            description: 'Helping partners, children, and extended family cope',
            icon: 'UsersSolid'
          },
          {
            title: 'Resource Library',
            description: 'Books, articles, and healing resources',
            icon: 'BookOpenSolid'
          }
        ],
        columns: 2,
        dark: true
      }
    },
    // Resources Section
    {
      id: 'bereavement-resources',
      component: FeaturesGrid,
      showOnPages: ['page6'],
      props: {
        title: 'Helpful Resources',
        description: 'Access our collection of resources to support you through your grief journey.',
        items: [{
          title: 'Available Resources',
          description: '• 24/7 Grief Support Line: (800) 555-HELP\n• Recommended Reading List\n• Local Support Groups\n• Online Memorials\n• Grief Journaling Prompts\n• Self-Care During Grief',
          ctaText: 'Download Resource Guide',
          ctaLink: '/downloads/bereavement-resources.pdf'
        }],
        columns: 1,
        align: 'left',
        dark: true,
        image: {
          src: '/images/placeholders/bereavement-resources.jpg',
          alt: 'Bereavement resources',
          position: 'right'
        }
      }
    },
    // Call to Action
    {
      id: 'bereavement-cta',
      component: CallToAction,
      showOnPages: ['page6'],
      props: {
        title: 'Reach Out for Support',
        description: 'You don\'t have to walk this path alone. Our compassionate team is here to listen, support, and help you find healing in your own time.',
        primaryButton: {
          text: 'Contact a Support Specialist',
          url: '/contact/bereavement'
        },
        secondaryButton: {
          text: 'View Support Resources',
          url: '/resources/bereavement'
        },
        align: 'center',
        background: 'dark',
        dark: true
      }
    }
  ];
</script>

<BasePage {pageData} {pageWidgets} />
