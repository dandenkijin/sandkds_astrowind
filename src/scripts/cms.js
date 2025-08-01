// src/scripts/cms.js
// This script initializes Decap CMS with the configuration from static/admin/config.yml

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Decap CMS
  if (window.CMS) {
    CMS.init({
      config: {
        load_config_file: true,
        local_backend: true,
        backend: {
          name: 'git-gateway',
          branch: 'main', // Update to your default branch
        },
        // These values will be overridden by config.yml
        media_folder: 'public/images/uploads',
        public_folder: '/images/uploads'
      }
    });

    // Log in to the CMS
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', (user) => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
  }
});
