/**
 * Decap CMS Initialization Script
 * This script handles the initialization of Decap CMS with proper error handling
 * and fallback mechanisms.
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // use strict';

  // Get DOM elements
  const loadingElement = document.querySelector('.loading');
  let errorElement = document.getElementById('cms-error');
  
  // Create error element if it doesn't exist
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.id = 'cms-error';
    document.body.appendChild(errorElement);
  }
  
  // Update loading message
  const updateLoadingMessage = (message) => {
    console.log(message);
    if (loadingElement) {
      const messageEl = loadingElement.querySelector('p:first-child');
      if (messageEl) {
        messageEl.textContent = message;
      }
    }
  };

  // Show error message
  const showError = (message) => {
    console.error(message);
    
    if (errorElement) {
      errorElement.innerHTML = [
        '<div class="error-message">',
        '  <h3>',
        '    <span class="error-icon">⚠️</span>',
        '    Error loading CMS',
        '  </h3>',
        `  <p>${message}</p>`,
        '  <p class="error-details">Check the browser console for more details.</p>',
        '  <div class="error-actions">',
        '    <button class="btn btn-retry" onclick="window.location.reload()">Try Again</button>',
        '    <button class="btn btn-help" onclick="window.open(\'https://decapcms.org/docs/troubleshooting\', \'_blank\')">Help</button>',
        '  </div>',
        '</div>'
      ].join('\n');
      errorElement.style.display = 'block';
    }
    
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
  };

  // Initialize the CMS with the given configuration
  const initializeCMS = (config) => {
    try {
      updateLoadingMessage('Initializing CMS...');
      
      // Validate CMS object
      if (typeof CMS === 'undefined') {
        throw new Error('CMS is not defined. Make sure decap-cms.js is loaded.');
      }
      
      // Register preview styles if available
      if (typeof CMS.registerPreviewStyle === 'function') {
        CMS.registerPreviewStyle('/admin/cms.css');
      }
      
      // Ensure root element exists
      const rootElement = document.getElementById('nc-root');
      if (!rootElement) {
        throw new Error('Root element (#nc-root) not found in the DOM');
      }
      
      // Initialize CMS with a small delay
      setTimeout(() => {
        try {
          if (typeof CMS.init === 'function') {
            CMS.init({
              config: config
            });
            
            console.log('CMS initialized successfully');
            updateLoadingMessage('CMS ready! Loading interface...');
            
            // Hide loading indicator
            if (loadingElement) {
              loadingElement.style.opacity = '0';
              setTimeout(() => {
                loadingElement.style.display = 'none';
              }, 300);
            }
          } else {
            throw new Error('CMS.init is not available');
          }
        } catch (error) {
          throw new Error(`Failed to initialize CMS: ${error.message || 'Unknown error'}`);
        }
      }, 100);
      
    } catch (error) {
      showError(error.message || 'Failed to initialize CMS');
    }
  };

  // Load configuration from YAML file
  const loadConfig = () => {
    updateLoadingMessage('Loading configuration...');
    
    // Try to load from YAML first
    fetch('/admin/config.yml')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load config: ${response.status}`);
        }
        return response.text();
      })
      .then((yamlText) => {
        try {
          // Use the global jsyaml object loaded from CDN
          if (window.jsyaml?.load) {
            const config = window.jsyaml.load(yamlText);
            
            // Validate config
            if (!config) {
              throw new Error('Empty configuration');
            }
            
            // Set default values
            config.site_url = config.site_url || window.location.origin;
            
            // Enable local backend for localhost
            if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
              config.local_backend = true;
              console.log('Local development mode: Enabled local backend');
            }
            
            // Initialize with the loaded config
            initializeCMS(config);
          } else {
            throw new Error('YAML parser not available');
          }
        } catch (yamlError) {
          console.warn('Failed to parse YAML, using fallback config:', yamlError);
          useFallbackConfig();
        }
      })
      .catch((error) => {
        console.warn('Failed to load config, using fallback:', error);
        useFallbackConfig();
      });
  };
  
  // Fallback configuration if YAML loading fails
  const useFallbackConfig = () => {
    console.log('Using fallback configuration');
    
    const fallbackConfig = {
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
          ]
        }
      ]
    };
    
    // Enable local backend for localhost
    if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
      fallbackConfig.local_backend = true;
    }
    
    initializeCMS(fallbackConfig);
  };

  // Initialize everything when the DOM is ready
  const init = () => {
    try {
      // Check if we have a root element
      if (!document.getElementById('nc-root')) {
        throw new Error('Root element (#nc-root) not found in the DOM');
      }
      
      // Start loading the configuration
      loadConfig();
      
    } catch (error) {
      showError(error.message || 'Failed to initialize CMS');
    }
  };

  // Start the initialization process
  init();
});
