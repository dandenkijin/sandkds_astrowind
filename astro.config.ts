import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';

// Import custom plugins
import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';
import astrowind from './vendor/integration';
import svelte from '@astrojs/svelte';

export default defineConfig({
  // Basic configuration
  output: 'static',
  outDir: 'dist',
  publicDir: 'public',
  
  // Integrations
  integrations: [
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template', 'gallery', 'approval', 'document',
          'advertising', 'currency-exchange', 'voice-presentation',
          'business-contact', 'database',
        ],
      },
    }),
    partytown({
      config: { forward: ['dataLayer.push'] },
    }),
    compress({
      CSS: true,
      HTML: { 'html-minifier-terser': { removeAttributeQuotes: false } },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
    astrowind({ config: './src/config.yaml' }),
    svelte()
  ],

  // Image handling
  image: {
    domains: ['cdn.pixabay.com'],
  },

  // Markdown configuration
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  // Vite configuration
  vite: {
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash][extname]'
        }
      }
    },
    resolve: {
      alias: { '~': new URL('./src', import.meta.url).pathname },
      mainFields: ['browser', 'module', 'jsnext:main', 'jsnext']
    },
    server: {
      fs: { allow: ['..', '../public'], strict: true },
      cors: true,
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host: '127.0.0.1',
        port: 24678,
        clientPort: 24678
      }
    },
    optimizeDeps: {
      include: ['@astrojs/mdx']
    }
  },
  
  // Development server configuration
  server: {
    host: '0.0.0.0',
    port: 4321,
    open: '/admin',
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    // Required for TinaCMS
    fs: {
      allow: ['..', '../public', '../tina'],
      strict: false
    }
  }
});
