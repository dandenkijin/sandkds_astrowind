<script>
  import ComingSoon from '../components/ComingSoon.svelte';
  
  // Page specific data
  const pageData = {
    title: 'Coming Soon',
    description: 'This page is currently under development. We\'re working hard to bring you valuable content and resources.',
    ctaText: 'Return to Home',
    ctaLink: '/client#page1'
  };
  
  // Page 3 specific data
  const lactationPageData = {
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
          // map CTA to project button classes
          ctaButton: toProjectButton('Schedule a Consultation', '/contact', 'primary')
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
        primaryButton: toProjectButton('Book a Lactation Consultation', '/contact', 'primary'),
        secondaryButton: toProjectButton('View Our Services', '/services/lactation', 'tertiary'),
        align: 'center',
        background: 'gradient'
      }
    }
  ];
</script>

<BasePage {pageData} {pageWidgets} />
