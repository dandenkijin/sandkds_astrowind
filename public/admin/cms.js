// Wait for the CMS to be fully loaded
function initCMS() {
  const loadingElement = document.querySelector('.loading');
  
  // Show loading state
  if (loadingElement) {
    loadingElement.textContent = 'Initializing CMS...';
  }

  // Check if CMS is available
  if (typeof CMS === 'undefined') {
    console.error('CMS is not defined. Make sure decap-cms.js is loaded before this script.');
    showError('CMS is not loaded. Please check your internet connection and refresh the page.');
    return;
  }

  // Function to initialize the CMS with config
  function initializeCMS(config) {
    try {
      console.log('Initializing CMS with config:', config);
      
      // Register preview styles
      CMS.registerPreviewStyle('/admin/cms.css');
      
      // Initialize CMS with a small delay to ensure everything is ready
      setTimeout(() => {
        try {
          CMS.init({
            config: config
          });
          console.log('CMS initialized successfully');
          
          // Hide loading indicator
          if (loadingElement) {
            loadingElement.style.display = 'none';
          }
        } catch (error) {
          console.error('Error during CMS.init():', error);
          showError(`CMS initialization failed: ${error.message || 'Unknown error'}`);
        }
      }, 100);
      
    } catch (error) {
      console.error('Error in initializeCMS:', error);
      showError(`Failed to initialize CMS: ${error.message || 'Unknown error'}`);
    }
  }
  
  // Show error message
  function showError(message) {
    console.error(message);
    if (loadingElement) {
      loadingElement.innerHTML = `
        <div style="color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 1rem; border-radius: 4px; max-width: 600px; margin: 0 auto;">
          <h3 style="margin-top: 0;">Error loading CMS</h3>
          <p>${message}</p>
          <p>Check the browser console for more details.</p>
          <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Try Again
          </button>
        </div>
      `;
    }
  }

  // Load config from YAML
  async function loadConfig() {
    try {
      if (loadingElement) {
        loadingElement.textContent = 'Loading CMS configuration...';
      }
      
      const response = await fetch('/admin/config.yml');
      if (!response.ok) {
        throw new Error(`Failed to load config.yml: ${response.status} ${response.statusText}`);
      }
      
      const yamlText = await response.text();
      const yaml = window.jsyaml || {};
      const config = yaml.load ? yaml.load(yamlText) : null;
      
      if (!config) {
        throw new Error('Failed to parse YAML config. Please check the config.yml file for syntax errors.');
      }
      
      // Ensure site URL is set
      config.site_url = config.site_url || window.location.origin;
      
      // Add local backend configuration if not present
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        config.local_backend = true;
        console.log('Local development mode enabled');
      }
      
      // Initialize CMS with the loaded config
      initializeCMS(config);
      
    } catch (error) {
      console.warn('Using fallback config due to error:', error);
      
      // Fallback to a basic config
      initializeCMS({
        backend: {
          name: 'git-gateway',
          branch: 'main',
        },
        local_backend: true,
        media_folder: 'public/images/uploads',
        public_folder: '/images/uploads',
        site_url: window.location.origin,
        collections: [
          {
            name: 'blog',
            label: 'Blog Posts',
            folder: 'src/content/blog',
            create: true,
            fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Publish Date', name: 'date', widget: 'datetime' },
              { label: 'Description', name: 'description', widget: 'text', required: false },
              { label: 'Body', name: 'body', widget: 'markdown' },
              { 
                label: 'Tags', 
                name: 'tags', 
                widget: 'list', 
                required: false,
                field: { label: 'Tag', name: 'tag', widget: 'string' }
              },
              { 
                label: 'Draft', 
                name: 'draft', 
                widget: 'boolean', 
                required: false, 
                default: false 
              }
            ],
          },
        ],
      });
    }
  }

  // Start loading the configuration
  loadConfig();
}

// Start initialization when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCMS);
} else {
  // If the document is already loaded, run immediately
  initCMS();
}
