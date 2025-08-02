// Wait for the CMS to be fully loaded
(function() {
  var loadingElement = document.querySelector('.loading');
  
  // Show loading state
  function updateLoadingMessage(message) {
    if (loadingElement) {
      var messageEl = loadingElement.querySelector('p:first-child');
      if (messageEl) {
        messageEl.textContent = message;
      }
    }
    console.log(message);
  }

  updateLoadingMessage('Preparing CMS...');

  // Function to initialize the CMS with config
  function initializeCMS(config) {
    try {
      updateLoadingMessage('Initializing CMS...');
      console.log('Initializing CMS with config:', config);
      
      // Initialize Decap CMS
      if (typeof CMS !== 'undefined') {
        CMS.init({ config });
      } else {
        throw new Error('CMS object not found. Make sure Decap CMS script is loaded.');
      }
          <anonymous> https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js:2
      decap-cms.js:54:69373
      Preparing CMS... cms.js:13:13
      CMS is not defined. Make sure decap-cms.js is loaded before this script. cms.js:185:15
      CMS is not loaded. Please check your internet connection and refresh the page. cms.js:65:13
      updateLoadingMessage('Initializing CMS...');
      
      // Ensure CMS is available
      if (typeof CMS === 'undefined') {
        throw new Error('CMS is not defined');
      }
      
      // Register preview styles if available
      if (typeof CMS.registerPreviewStyle === 'function') {
        CMS.registerPreviewStyle('/admin/cms.css');
      }
      
      // Initialize CMS with a small delay to ensure everything is ready
      setTimeout(function() {
        try {
          if (typeof CMS.init === 'function') {
            // Ensure the root element exists
            var rootElement = document.getElementById('nc-root');
            if (!rootElement) {
              throw new Error('Root element (#nc-root) not found in the DOM');
            }
            
            // Initialize the CMS
            CMS.init({
              config: config
            });
            
            console.log('CMS initialized successfully');
            updateLoadingMessage('CMS ready! Loading interface...');
            
            // Hide loading indicator after a short delay
            setTimeout(function() {
              if (loadingElement) {
                loadingElement.style.opacity = '0';
                setTimeout(function() {
                  loadingElement.style.display = 'none';
                }, 300);
              }
            }, 500);
            
          } else {
            throw new Error('CMS.init is not a function. The CMS script may not have loaded correctly.');
          }
        } catch (error) {
          console.error('Error during CMS.init():', error);
          showError('CMS initialization failed: ' + (error.message || 'Unknown error'));
        }
      }, 100);
      
    } catch (error) {
      console.error('Error in initializeCMS:', error);
      showError(`Failed to initialize CMS: ${error.message || 'Unknown error'}`);
    }
  }

  // Load config from YAML or use fallback
  async function loadConfig() {
    try {
      updateLoadingMessage('Loading configuration...');
      
      let config;
      
      // Try to load from YAML first
      try {
        const response = await fetch('/admin/config.yml');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const yamlText = await response.text();
        const yaml = window.jsyaml || {};
        
        if (yaml.load) {
          config = yaml.load(yamlText);
          if (!config) throw new Error('Empty configuration');
          console.log('Successfully loaded config from YAML');
        } else {
          throw new Error('YAML parser not available');
        }
      } catch (yamlError) {
        console.warn('Failed to load config from YAML, using fallback config:', yamlError);
        throw new Error('Could not load configuration file. Using fallback configuration.');
      }
      
      // Ensure required fields are set
      config.site_url = config.site_url || window.location.origin;
      
      // Auto-enable local backend for localhost
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        config.local_backend = true;
        console.log('Local development mode: Enabled local backend');
      }
      
      // Initialize with the loaded config
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

  // Start the initialization process
  function init() {
    try {
      // Check if CMS is available
      if (typeof CMS === 'undefined') {
        throw new Error('CMS is not defined. Make sure decap-cms.js is loaded before this script.');
      }
      
      // Check if root element exists
      if (!document.getElementById('nc-root')) {
        throw new Error('Root element (#nc-root) not found in the DOM');
      }
      
      console.log('Starting CMS initialization...');
      updateLoadingMessage('Preparing CMS...');
      
      // Start loading the configuration
      loadConfig();
      
    } catch (error) {
      console.error('Failed to initialize CMS:', error);
      showError(error.message || 'Failed to initialize CMS. Please check the console for details.');
    }
  }

  // Start initialization when the DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // If the document is already loaded, run immediately
    setTimeout(init, 0);
  }
})();
