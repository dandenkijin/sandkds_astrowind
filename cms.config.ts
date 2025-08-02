import type { CmsConfig } from 'decap-cms-core';

// Check if we're in the browser
const isBrowser = typeof window !== 'undefined';

const config: CmsConfig = {
  backend: {
    name: 'git-gateway',
    branch: 'main',
    repo: 'dandenkijin/sandkds_astrowind',
    // Remove base_url and auth_endpoint as they are not needed with git-gateway
  },
  // Enable local development without authentication
  local_backend: isBrowser && window.location.hostname === 'localhost',
  // Media and public folders
  media_folder: 'public/images/uploads',
  public_folder: '/images/uploads',
  collections: [
    {
      name: 'blog',
      label: 'Blog Posts',
      folder: 'src/content/blog',
      create: true,
      slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
      fields: [
        { 
          label: 'Title', 
          name: 'title', 
          widget: 'string',
          required: true 
        },
        { 
          label: 'Publish Date', 
          name: 'date', 
          widget: 'datetime',
          date_format: 'YYYY-MM-DD',
          time_format: 'HH:mm',
          format: 'YYYY-MM-DD HH:mm',
          required: true 
        },
        { 
          label: 'Description', 
          name: 'description', 
          widget: 'text',
          required: false 
        },
        { 
          label: 'Body', 
          name: 'body', 
          widget: 'markdown',
          required: true 
        }
      ]
    }
  ]
};

export default config;
