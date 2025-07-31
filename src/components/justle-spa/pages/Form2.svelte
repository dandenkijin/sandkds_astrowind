<script>
  import { onMount } from 'svelte';

  onMount(() => {
    try {
      const container = document.getElementById('form-container');
      if (!container) return;

      // Clear any existing content
      container.innerHTML = '';

      // Create iframe
      const iframe = document.createElement('iframe');
      iframe.setAttribute('aria-label', 'Snugs and Kisses Doula Intake');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'camera');
      iframe.style.width = '99%';
      iframe.style.minHeight = '500px';
      iframe.style.border = 'none';
      iframe.style.transition = 'all 0.3s ease';
      iframe.loading = 'lazy';
      
      // Set the source with the Zoho form URL
      iframe.src = 'https://forms.zohopublic.com/sandkds1/form/SnugsandKissesDoulaIntake/formperma/iQK25B2BCzJQXKelEBa_HY8LWOuI0xofBYm63y4UMbo?zf_enablecamera=true';

      // Add iframe to container
      container.appendChild(iframe);

      // Handle iframe resize messages (similar to Form1)
      const handleMessage = (event) => {
        try {
          const data = event.data;
          if (typeof data === 'string') {
            const [zfPerma, height] = data.split('|');
            if (zfPerma && height && iframe.src.includes(zfPerma)) {
              const newHeight = `${Number.parseInt(height, 10) + 15}px`;
              if (iframe.style.height !== newHeight) {
                iframe.style.height = newHeight;
              }
            }
          }
        } catch (e) {
          console.error('Error handling message:', e);
        }
      };

      window.addEventListener('message', handleMessage);

      // Cleanup
      return () => {
        window.removeEventListener('message', handleMessage);
        if (container.contains(iframe)) {
          container.removeChild(iframe);
        }
      };
    } catch (e) {
      console.error('Error initializing form:', e);
    }
  });
</script>

<div id="form-container" class="form-container">
  <div class="loading">Loading form...</div>
</div>

<style>
  .form-container {
    width: 100%;
    display: flex;
    justify-content: center;
    min-height: 500px;
    position: relative;
  }
  
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #666;
    font-style: italic;
  }
  
  iframe {
    max-width: 100%;
    margin: 0 auto;
    display: block;
  }
</style>
