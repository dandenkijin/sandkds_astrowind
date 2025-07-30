<script>
  import BasePage from './BasePage.svelte';
  import { FeaturesGrid, CallToAction } from '../../flowbite';
  
  // Page 4 specific data
  const pageData = {
    title: 'Sleep Coaching',
    description: 'Empowering you with knowledge and skills for a confident birth experience.',
    heroImage: '/images/placeholders/childbirth-education.jpg',
    icon: 'tabler:book',
    ctaText: 'View Class Schedule',
    ctaLink: '/classes/childbirth',
    pageId: 'page4'
  };
  
  // Page 4 specific widgets
  const pageWidgets = [
    // Intro Section
    {
      id: 'education-intro',
      component: FeaturesGrid,
      showOnPages: ['page4'],
      props: {
        title: 'Comprehensive Sleep Coaching',
        description: 'Our evidence-based Sleep Coaching classes are designed to prepare you and your partner for labor, delivery, and the early days with your newborn. Whether you prefer group classes or private instruction, we offer flexible options to fit your schedule and learning style.',
        items: [{
          title: 'Sleep Coaching',
          description: 'Our evidence-based Sleep Coaching classes are designed to prepare you and your partner for labor, delivery, and the early days with your newborn.',
          ctaText: 'View Class Options',
          ctaLink: '/classes/childbirth'
        }],
        columns: 1,
        align: 'left',
        image: {
          src: '/images/placeholders/childbirth-class.jpg',
          alt: 'Sleep Coaching class',
          position: 'right'
        }
      }
    },
    // Class Types Section
    {
      id: 'class-types',
      component: FeaturesGrid,
      showOnPages: ['page4'],
      props: {
        title: 'Our Class Offerings',
        description: 'Choose the education path that\'s right for you',
        items: [
          {
            title: 'Comprehensive Series',
            description: 'Multi-week series covering all aspects of childbirth and newborn care',
            icon: 'CalendarDaysSolid'
          },
          {
            title: 'Weekend Intensive',
            description: 'Condensed weekend workshop for busy parents-to-be',
            icon: 'CalendarDaySolid'
          },
          {
            title: 'Private Instruction',
            description: 'Customized one-on-one sessions in your home',
            icon: 'UserSolid'
          },
          {
            title: 'Virtual Classes',
            description: 'Live online classes from the comfort of your home',
            icon: 'VideoCameraSolid'
          },
          {
            title: 'Refresher Course',
            description: 'For experienced parents preparing for another birth',
            icon: 'ArrowPathSolid'
          },
          {
            title: 'Sibling Class',
            description: 'Helping big brothers and sisters prepare for baby',
            icon: 'UserGroupSolid'
          }
        ],
        columns: 2
      }
    },
    // Curriculum Section
    {
      id: 'curriculum',
      component: FeaturesGrid,
      showOnPages: ['page4'],
      props: {
        title: 'What You\'ll Learn',
        description: 'Our comprehensive curriculum covers all aspects of childbirth and early parenting, including:\n\n• Stages of labor and what to expect\n• Comfort measures and pain management options\n• Medical procedures and interventions\n• Birth planning and advocacy\n• Newborn care basics\n• Postpartum recovery and adjustment\n\nAll classes include hands-on practice, visual aids, and ample time for questions.',
        items: [{
          title: 'Curriculum Details',
          description: 'Our comprehensive curriculum covers all aspects of childbirth and early parenting, including stages of labor, comfort measures, medical procedures, birth planning, newborn care, and postpartum recovery.',
          ctaText: 'Download Class Syllabus',
          ctaLink: '/downloads/childbirth-education-syllabus.pdf'
        }],
        columns: 1,
        align: 'right',
        image: {
          src: '/images/placeholders/childbirth-education-2.jpg',
          alt: 'Childbirth education',
          position: 'left'
        }
      }
    },
    // Call to Action
    {
      id: 'education-cta',
      component: CallToAction,
      showOnPages: ['page4'],
      props: {
        title: 'Ready to Prepare for Your Birth?',
        description: 'Join our supportive community of expectant parents and gain the knowledge and confidence you need for a positive birth experience.',
        primaryButton: {
          text: 'Register for Classes',
          url: '/register/childbirth-classes'
        },
        secondaryButton: {
          text: 'Meet Our Educators',
          url: '/about/educators'
        },
        align: 'center',
        background: 'gradient'
      }
    }
  ];
</script>

<BasePage {pageData} {pageWidgets} />
