<script>
  import { onMount } from 'svelte';

  onMount(() => {
    try {
      const f = document.createElement('iframe');
      let ifrmSrc = 'https://forms.zohopublic.com/sandkds1/form/SnugsandKissesClientIntake/formperma/S29R17y2wYZvq58p9iWy9edlpwXfuht4kWfh_sLtySM?zf_rszfm=1';

      // UTM parameter handling
      try {
        if (typeof ZFAdvLead !== 'undefined' && typeof zfutm_zfAdvLead !== 'undefined') {
          for (const utmPm of ZFAdvLead.utmPNameArr) {
            const utmKey = ZFAdvLead.isSameDomain && !ZFAdvLead.utmcustPNameArr.includes(utmPm) 
              ? `zf_${utmPm}` 
              : utmPm;
            const utmVal = zfutm_zfAdvLead.zfautm_gC_enc(utmPm);
            
            if (utmVal) {
              ifrmSrc += ifrmSrc.includes('?') ? '&' : '?';
              ifrmSrc += `${encodeURIComponent(utmKey)}=${encodeURIComponent(utmVal)}`;
            }
          }
        }

        if (typeof ZFLead !== 'undefined' && typeof zfutm_zfLead !== 'undefined') {
          for (const utmPm of ZFLead.utmPNameArr) {
            const utmVal = zfutm_zfLead.zfutm_gC_enc(utmPm);
            if (utmVal) {
              ifrmSrc += ifrmSrc.includes('?') ? '&' : '?';
              ifrmSrc += `${encodeURIComponent(utmPm)}=${encodeURIComponent(utmVal)}`;
            }
          }
        }
      } catch (e) {
        console.error('Error processing UTM parameters:', e);
      }

      // Set iframe attributes
      f.src = ifrmSrc;
      f.style.border = 'none';
      f.style.width = '90%';
      f.style.minHeight = '100px'; // Initial min height
      f.style.transition = 'all 0.5s ease';
      f.setAttribute('aria-label', 'Snugs and Kisses Client Intake');
      f.setAttribute('title', 'Client Intake Form');
      f.setAttribute('loading', 'lazy');

      // Add iframe to container
      const container = document.getElementById('form-container');
      if (container) {
        container.appendChild(f);
      }

      // Handle iframe resize messages
      const handleMessage = (event) => {
        try {
          const data = event.data;
          if (typeof data === 'string') {
            const [zfPerma, height] = data.split('|');
            if (zfPerma && height) {
              const iframe = container?.querySelector?.('iframe');
              if (iframe?.src?.includes(zfPerma)) {
                const newHeight = `${Number.parseInt(height, 10) + 15}px`;
                if (iframe.style.height !== newHeight) {
                  if (data.split('|').length === 3) {
                    // If there's a third parameter, scroll into view
                    setTimeout(() => {
                      iframe.style.height = newHeight;
                      iframe.scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                  } else {
                    iframe.style.height = newHeight;
                  }
                }
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
        if (container?.contains?.(f)) {
          container.removeChild(f);
        }
      };
    } catch (e) {
      console.error('Error initializing form:', e);
    }
  });
</script>

<div id="form-container" class="form-container">
  <!-- Form will be inserted here by JavaScript -->
  <div class="loading">Loading form...</div>
</div>

<style>
  .form-container {
    width: 100%;
    display: flex;
    justify-content: center;
    min-height: 400px;
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
