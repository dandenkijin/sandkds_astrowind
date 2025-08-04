<script>
  import BasePage from './BasePage.svelte';
  import { FeaturesGrid, CallToAction } from '../../flowbite';

  // button helper: primary → btn btn-primary, secondary/inline → btn btn-tertiary, neutral → btn
  const toProjectButton = (text, url = '#', variant = 'primary') => ({
    text,
    url,
    className: `btn ${variant === 'primary' ? 'btn-primary' : variant === 'neutral' ? '' : 'btn-tertiary'}`.trim()
  });
  
  // Page 5 specific data
  const pageData = {
    title: 'Prenatal Education',
    description: 'Helping big brothers and sisters welcome their new sibling with confidence and joy.',
    heroImage: '/images/placeholders/sibling-support.jpg',
    icon: 'tabler:users',
    ctaText: 'Learn About Sibling Prep',
    ctaLink: '/services/sibling-support',
    pageId: 'page5'
  };
  
  // Page 5 specific widgets
  const pageWidgets = [
    // Intro Section
    {
      id: 'sibling-intro',
      component: FeaturesGrid,
      showOnPages: ['page5'],
      props: {
        title: 'Preparing Siblings for a New Baby',
        description: 'The arrival of a new baby is an exciting but sometimes challenging transition for older siblings. Our Prenatal Education services help children of all ages understand and prepare for their new role in the family, fostering positive sibling bonds from the very beginning.',
        items: [{
          title: 'Sibling Preparation',
          description: 'Help your child understand and prepare for their new role as a big brother or sister with our age-appropriate resources and classes.',
          ctaButton: toProjectButton('View Sibling Preparation Tips', '/blog/preparing-siblings', 'tertiary')
        }],
        columns: 1,
        align: 'right',
        image: {
          src: '/images/placeholders/siblings-together.jpg',
          alt: 'Siblings together',
          position: 'left'
        }
      }
    },
    // Age-Specific Tips Section
    {
      id: 'age-specific-tips',
      component: FeaturesGrid,
      showOnPages: ['page5'],
      props: {
        title: 'Age-Appropriate Preparation',
        description: 'Tailored approaches for different developmental stages',
        items: [
          {
            title: 'Toddlers (1-3 years)',
            description: 'Simple explanations, picture books, and role-playing with dolls',
            icon: 'BabySolid'
          },
          {
            title: 'Preschoolers (3-5 years)',
            description: 'Storytelling, helping prepare for baby, and expressing feelings',
            icon: 'ChildReachingSolid'
          },
          {
            title: 'School Age (5-8 years)',
            description: 'More detailed explanations and involving them in baby care',
            icon: 'ChildSolid'
          },
          {
            title: 'Tweens & Teens (9+ years)',
            description: 'Discussing changes in family dynamics and their important role',
            icon: 'UserSolid'
          }
        ],
        columns: 2
      }
    },
    // Activities Section
    {
      id: 'sibling-activities',
      component: FeaturesGrid,
      showOnPages: ['page5'],
      props: {
        title: 'Fun Activities for Sibling Bonding',
        description: 'Engage your child with these activities to help them bond with their new sibling and feel involved in the process.',
        items: [{
          title: 'Sibling Bonding Activities',
          description: '• Read books about becoming a big brother/sister together\n• Have them help prepare the nursery or pick out a gift for the baby\n• Look at their own baby photos and share stories\n• Practice gentle touch with a doll or stuffed animal\n• Create a special "big sibling" photo album\n• Set aside special one-on-one time after baby arrives',
          ctaButton: toProjectButton('Download Activity Guide', '/downloads/sibling-activities.pdf', 'tertiary')
        }],
        columns: 1,
        align: 'left',
        image: {
          src: '/images/placeholders/sibling-activities.jpg',
          alt: 'Sibling activities',
          position: 'right'
        }
      }
    },
    // Call to Action
    {
      id: 'sibling-cta',
      component: CallToAction,
      showOnPages: ['page5'],
      props: {
        title: 'Help Your Child Embrace Their New Role',
        description: 'Our sibling preparation classes and resources make the transition smoother for your entire family.',
        primaryButton: toProjectButton('Register for Sibling Class', '/classes/sibling-preparation', 'primary'),
        secondaryButton: toProjectButton('Get Sibling Prep Kit', '/shop/sibling-kit', 'tertiary'),
        align: 'center',
        background: 'gradient'
      }
    }
  ];
</script>

<BasePage {pageData} {pageWidgets} />
