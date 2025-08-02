/**
 * Decap CMS Custom Initialization
 * This script handles the initialization of Decap CMS with proper loading states and error handling.
 */

(function() {
  'use strict';

  // DOM Elements
  const loadingElement = document.querySelector('.loading');
  const errorElement = document.querySelector('.error');
  
  // Show loading state
  function updateLoadingMessage(message) {
    if (loadingElement) {
      const messageEl = loadingElement.querySelector('p:first-child') || document.createElement('p');
      messageEl.textContent = message;
      if (!loadingElement.contains(messageEl)) {
        loadingElement.appendChild(messageEl);
      }
      console.log(`[CMS] ${message}`);
    }
  }

  // Show error state
  function showError(message, error = null) {
    console.error(`[CMS Error] ${message}`, error || '');
    
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
    
    if (errorElement) {
      errorElement.style.display = 'block';
      const errorMessage = errorElement.querySelector('p:first-child') || document.createElement('p');
      errorMessage.textContent = `${message}${error ? `: ${error.message || error}` : ''}`;
      if (!errorElement.contains(errorMessage)) {
        errorElement.appendChild(errorMessage);
      }
    }
  }

  // Initialize the CMS with configuration
  async function initializeCMS() {
    try {
      updateLoadingMessage('Loading CMS configuration...');
      
      // Check if fetch is available
      if (typeof fetch === 'undefined') {
        throw new Error('Fetch API is not available in this environment');
      }
      
      // Load the config file
      const configUrl = '/admin/config.yml';
      console.log(`[CMS] Loading config from: ${configUrl}`);
      
      const response = await fetch(configUrl);
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details available');
        console.error(`[CMS] Config load failed: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`Failed to load config: ${response.status} ${response.statusText} - ${errorText}`);
      }
      
      const configText = await response.text();
      console.log('[CMS] Config loaded successfully');
      
      try {
        // Try to parse as YAML to validate
        const yaml = window.jsyaml || (window.CMS && window.CMS.yaml) || null;
        if (yaml) {
          const config = yaml.load(configText);
          console.log('[CMS] Config parsed successfully');
        } else {
          console.warn('[CMS] YAML parser not available, skipping config validation');
        }
      } catch (yamlError) {
        console.error('[CMS] Error parsing config YAML:', yamlError);
        throw new Error(`Invalid YAML in config: ${yamlError.message}`);
      }
      
      updateLoadingMessage('Initializing CMS...');
      
      // Check if CMS is available
      if (typeof CMS === 'undefined') {
        const errorMsg = 'CMS object not found. Make sure Decap CMS script is loaded before this script.';
        console.error(`[CMS] ${errorMsg}`, { 
          scripts: Array.from(document.scripts).map(s => s.src),
          windowKeys: Object.keys(window).filter(k => k.includes('CMS') || k.includes('Netlify'))
        });
        throw new Error(errorMsg);
      }
      
      console.log('[CMS] Initializing with config...');
      
      // Initialize CMS with the loaded config
      try {
        CMS.init({
          config: configText
        });
        console.log('[CMS] Initialization complete');
      } catch (initError) {
        console.error('[CMS] Error during CMS.init():', initError);
        throw new Error(`CMS initialization failed: ${initError.message}`);
      }
      
      // Hide loading state when CMS is initialized
      if (loadingElement) {
        loadingElement.style.opacity = '0';
        setTimeout(() => {
          loadingElement.style.display = 'none';
        }, 300);
      }
      
      console.log('[CMS] Initialized successfully');
      
    } catch (error) {
      showError('Failed to initialize CMS', error);
    }
  }

  // Start initialization when the DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCMS);
  } else {
    // DOM already loaded, initialize immediately
    initializeCMS();
  }
})();
