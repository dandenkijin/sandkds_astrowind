<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';

  // Configuration
  const FORM_URL = 'https://forms.zohopublic.com/sandkds1/form/SnugsandKissesClientIntake/formperma/S29R17y2wYZvq58p9iWy9edlpwXfuht4kWfh_sLtySM?zf_rszfm=1';
  const FORM_TITLE = 'Snugs and Kisses Client Intake';
  
  // State
  let isLoading = true;
  let error = null;
  let iframeRef;
  
  // Handle iframe load events
  const handleIframeLoad = () => {
    isLoading = false;
  };
  
  // Handle iframe error
  const handleIframeError = () => {
    error = 'Failed to load the form. Please try again later.';
    isLoading = false;
  };
  
  // Handle window messages for dynamic resizing
  const handleMessage = (event) => {
    try {
      // Only process messages that come from our iframe
      if (!iframeRef || !iframeRef.contentWindow || event.source !== iframeRef.contentWindow) {
        return;
      }
      
      const data = event.data;
      if (typeof data === 'string') {
        const [formId, height] = data.split('|');
        if (formId && height) {
          const newHeight = `${Number.parseInt(height, 10) + 15}px`;
          if (iframeRef.style.height !== newHeight) {
            if (data.split('|').length === 3) {
              // If there's a third parameter, scroll into view after a delay
              setTimeout(() => {
                iframeRef.style.height = newHeight;
                iframeRef.scrollIntoView({ behavior: 'smooth' });
              }, 500);
            } else {
              iframeRef.style.height = newHeight;
            }
          }
        }
      }
    } catch (e) {
      console.error('Error handling message:', e);
    }
  };
  
  // Lifecycle
  onMount(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  });
  
  // Cleanup
  onDestroy(() => {
    if (iframeRef) {
      iframeRef.removeEventListener('load', handleIframeLoad);
      iframeRef.removeEventListener('error', handleIframeError);
    }
  });
</script>

<div id="form-container" class="w-full max-w-full overflow-hidden">
  {#if error}
    <div class="error-message">
      <p>{error}</p>
      <button class="retry-button" on:click={() => window.location.reload()}>Try Again</button>
    </div>
  {:else}
    <div class="form-iframe-container w-full h-[600px] md:h-[800px]">
      {#if isLoading}
        <div class="loading-overlay">
          <div class="loading-spinner"></div>
          <p>Loading form, please wait...</p>
        </div>
      {/if}
      <iframe
        bind:this={iframeRef}
        title={FORM_TITLE}
        aria-label={FORM_TITLE}
        frameborder="0"
        allow="camera"
        src={FORM_URL}
        on:load={handleIframeLoad}
        on:error={handleIframeError}
        class="w-full h-full border-0 {isLoading ? 'opacity-0' : 'opacity-100'}"
        loading="lazy"
      ></iframe>
    </div>
  {/if}
</div>

<style>
  #form-container {
    background-color: var(--color-bg-base, #ffffff);
    color: var(--color-text-base, #1a202c);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .form-iframe-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    background-color: var(--color-bg-base, #ffffff);
    border-radius: 0.5rem;
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(var(--color-bg-base-rgb, 255, 255, 255), 0.9);
    color: var(--color-text-base, #1a202c);
    z-index: 10;
  }
  
  .loading-spinner {
    border: 4px solid var(--color-border-muted, #e2e8f0);
    border-radius: 50%;
    border-top: 4px solid var(--color-primary, #4299e1);
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  iframe {
    width: 100% !important;
    min-width: 100% !important;
    max-width: none !important;
    height: 100% !important;
    min-height: 600px !important;
    margin: 0 !important;
    padding: 0 !important;
    display: block;
    border: none !important;
    transition: opacity 0.3s ease, height 0.3s ease;
    box-sizing: border-box;
    background-color: var(--color-bg-base, #ffffff);
    color-scheme: light dark;
  }
  
  .error-message {
    text-align: center;
    padding: 2rem;
    background: var(--color-bg-muted, #fff5f5);
    border: 1px solid var(--color-error-border, #feb2b2);
    border-radius: 0.5rem;
    color: var(--color-error-text, #c53030);
    margin: 1rem auto;
    max-width: 90%;
  }
  
  .retry-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: var(--color-primary, #4f46e5);
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .retry-button:hover {
    background: var(--color-primary-dark, #4338ca);
  }

  /* Dark mode specific styles */
  @media (prefers-color-scheme: dark) {
    :global(html.dark) {
      --color-error-border: #f56565;
      --color-error-text: #fed7d7;
      --color-bg-muted: #2d3748;
    }
  }
</style>
