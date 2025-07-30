<script>
  import BasePage from './BasePage.svelte';
  import { FeaturesGrid, CallToAction } from '../../flowbite';
  
  // Page 3 specific data
  const pageData = {
    title: 'Lactation Support',
    description: 'Gentle, expert guidance for breastfeeding, pumping, and all your feeding goals.',
    heroImage: '/src/assets/images/Breastfeeding-support-group-updated.avif',
    icon: 'tabler:droplet-filled',
    ctaText: 'Get Breastfeeding Support',
    ctaLink: '/services/lactation',
    pageId: 'page3'
  };
  
  // Page 3 specific widgets
  const pageWidgets = [
    // Intro Section
    {
      id: 'lactation-intro',
      component: FeaturesGrid,
      showOnPages: ['page3'],
      props: {
        title: 'Expert Lactation Support',
        description: 'Whether you\'re just starting your breastfeeding journey or navigating challenges, our International Board Certified Lactation Consultants (IBCLCs) provide compassionate, evidence-based support to help you meet your feeding goals.',
        items: [{
          title: 'Lactation Support',
          description: 'Get personalized guidance from our IBCLCs to help you achieve your breastfeeding goals with confidence.',
          ctaText: 'Schedule a Consultation',
          ctaLink: '/contact'
        }],
        columns: 1,
        align: 'right',
        image: {
          src: '/images/placeholders/lactation-support-2.jpg',
          alt: 'Lactation support',
          position: 'left'
        }
      }
    },
    // Features Section
    {
      id: 'lactation-features',
      component: FeaturesGrid,
      showOnPages: ['page3'],
      props: {
        title: 'Our Lactation Services',
        description: 'Personalized support for your feeding journey',
        items: [
          {
            title: 'Latch & Positioning',
            description: 'Help with achieving a comfortable, effective latch',
            icon: 'HandThumbUpSolid'
          },
          {
            title: 'Milk Supply',
            description: 'Addressing low supply or oversupply concerns',
            icon: 'ScaleSolid'
          },
          {
            title: 'Pumping Support',
            description: 'Guidance on pumps, flange fitting, and schedules',
            icon: 'ArrowPathSolid'
          },
          {
            title: 'Returning to Work',
            description: 'Strategies for maintaining milk supply while working',
            icon: 'BriefcaseSolid'
          },
          {
            title: 'Special Situations',
            description: 'Support for preemies, multiples, and medical conditions',
            icon: 'StarSolid'
          },
          {
            title: 'Weaning Guidance',
            description: 'Gentle approaches to weaning when you\'re ready',
            icon: 'HandRaisedSolid'
          }
        ],
        columns: 2
      }
    },
    // Call to Action
    {
      id: 'lactation-cta',
      component: CallToAction,
      showOnPages: ['page3'],
      props: {
        title: 'Get the Support You Need',
        description: 'Our IBCLCs are here to help you overcome challenges and meet your breastfeeding goals with confidence.',
        primaryButton: {
          text: 'Book a Lactation Consultation',
          url: '/contact'
        },
        secondaryButton: {
          text: 'View Our Services',
          url: '/services/lactation'
        },
        align: 'center',
        background: 'gradient'
      }
    }
  ];
</script>

<BasePage {pageData} {pageWidgets} />
