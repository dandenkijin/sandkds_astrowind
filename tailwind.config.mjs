// Import default theme and plugins
import defaultTheme from 'tailwindcss/defaultTheme.js';
import typographyPlugin from '@tailwindcss/typography';
import flowbitePlugin from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
    "./src/**/*.astro"
  ],
  darkMode: 'class',
  corePlugins: {
    preflight: true,
  },
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
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
      spacing: {
        'accordion': '1rem',
      },
      borderRadius: {
        '3xl': '1.5rem',
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
  plugins: [
    typographyPlugin,
    flowbitePlugin,
  ],
};
