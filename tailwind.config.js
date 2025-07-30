import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import typographyPlugin from '@tailwindcss/typography';
import flowbite from 'flowbite/plugin';

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
      },
      fontFamily: {
        sans: ['var(--aw-font-sans, "Cormorant Garamond")', 'serif', ...defaultTheme.fontFamily.serif],
        serif: ['var(--aw-font-serif, "Playfair Display")', 'serif', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading, "Dancing Script")', 'cursive', ...defaultTheme.fontFamily.sans],
      },

      animation: {
        fade: 'fadeInUp 1s both',
      },

      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(2rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },

      // Custom accordion styles
      extend: {
        spacing: {
          'accordion': '1rem',
        },
        borderRadius: {
          'accordion': '0.5rem',
        },
        boxShadow: {
          'accordion': '0 1px 3px rgba(0, 0, 0, 0.1)',
          'accordion-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        transitionProperty: {
          'accordion': 'all 0.3s ease-in-out',
        },
      },
    },
  },
  plugins: [
    typographyPlugin,
    flowbite,
    plugin(({ addVariant }) => {
      addVariant('intersect', '&:not([no-intersect])');
    }),
  ],
  darkMode: 'class',
};
