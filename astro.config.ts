import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import compress from 'astro-compress';

// Import custom plugins
import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';
import astrowind from './vendor/integration';
import svelte from '@astrojs/svelte';

export default defineConfig({
  // Basic configuration
  // For AppSail, we can serve static assets via Nginx (current Dockerfile),
  // and expose any dynamic API under /api via Astro endpoints running in Node during preview/dev.
  // Keep SSG for pages; API routes are server-only and not pre-rendered.
  output: 'static',
  outDir: 'dist',
  publicDir: 'public',
  // Remove the Node.js adapter since we're using static site generation
  // adapter: node({
  //   mode: 'standalone'
  // }),
  
  // Remove Astro-level redirects for /admin to avoid loops; rely on Netlify/static serving
  // redirects: {
  //   '/admin': '/admin/index.html'
  // },
  
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
    // Enable Partytown only in production builds to avoid dev 404s on /~partytown/*
    ...(process.env.NODE_ENV === 'production'
      ? [
          (await import('@astrojs/partytown')).default({
            config: { forward: ['dataLayer.push'] },
          }),
        ]
      : []),
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
      // Keep assets as separate files (don't inline them)
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          // Use a consistent naming pattern for all assets
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            // Safely handle cases where name might be undefined
            if (!assetInfo.name) {
              return 'assets/[name].[hash][extname]';
            }
            
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1].toLowerCase();
            
            // Handle CSS files - use consistent naming without hash for main CSS
            if (ext === 'css') {
              if (assetInfo.name.includes('client')) {
                return 'assets/client.css';
              }
              if (assetInfo.name.includes('index')) {
                return 'assets/index.css';
              }
              return 'assets/[name].[hash][extname]';
            }
            
            // Handle image files
            if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif'].includes(ext)) {
              return 'images/[name][extname]';
            }
            
            // Default for other assets
            return 'assets/[name].[hash][extname]';
          }
        }
      },
      minify: 'esbuild',
      cssMinify: true,
      sourcemap: true,
      cssTarget: 'esnext',
      // Disable CSS code splitting to ensure all styles are in one file
      cssCodeSplit: false,
      // Ensure consistent asset handling
      chunkSizeWarningLimit: 1000 // Increase chunk size warning limit
    },
    // Ensure public assets are copied correctly
    publicDir: 'public',
    resolve: {
      alias: { '~': new URL('./src', import.meta.url).pathname },
      mainFields: ['browser', 'module', 'jsnext:main', 'jsnext']
    },
    server: {
      fs: { 
        allow: ['..', '../public', '../tina'], 
        strict: false 
      },
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
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {}
      },
      modules: {
        localsConvention: 'camelCaseOnly'
      }
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
    }
  }
});


