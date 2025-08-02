import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';

// This configuration ensures that the admin panel works correctly with Astro's static site generation
// and handles SPA routing for the Decap CMS admin interface

// CMS configuration has been moved to /public/admin/cms.js

// Import custom plugins
import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

// Import theme integration
import astrowind from './vendor/integration';

// Import Svelte integration
import svelte from '@astrojs/svelte';

export default defineConfig({
  output: 'static',

  integrations: [
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    compress({
      CSS: true, // Enable CSS compression
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
    astrowind({
      config: './src/config.yaml',
    }),
    svelte()
  ],

  image: {
    domains: ['cdn.pixabay.com'],
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  // Vite configuration
  vite: {
    build: {
      // Ensure proper handling of static assets
      assetsInlineLimit: 0
    },
    resolve: {
      alias: {
        '~': new URL('./src', import.meta.url).pathname
      }
    },
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization'
      },
      fs: {
        // Allow serving files from the admin directory
        allow: ['..']
      },
      cors: true
    },
    optimizeDeps: {
      // Ensure Vite properly optimizes dependencies
      include: ['@astrojs/mdx']
    }
  },
  
  // Configure the dev server
  server: {
    // Handle SPA routing for the admin panel
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store'
    },
    // Ensure /admin and /admin/ both serve index.html
    open: '/admin'
  },
  
  // Configure the output directory for the static build
  outDir: 'dist',
  
  // Configure the public directory for static assets
  publicDir: 'public',
});
