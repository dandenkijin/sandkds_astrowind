<script lang="ts">
  export let name: string;
  export const size: number = 20;
  export const color: string = 'currentColor';
  export const className: string = '';

  // Tabler Icons
  const icons = {
    // Existing icons
    'tabler:home': 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    'tabler:heart-handshake': 'M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572',
    'tabler:users': 'M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0m10 5a4 4 0 0 1 4 4v1h-8v-1a4 4 0 0 1 4 -4zm-14 0a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v1h-12v-1z',
    'tabler:moon': 'M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z',
    'tabler:book': 'M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0M3 6v13a9 9 0 0 0 9 0a9 9 0 0 0 -9 0',
    'tabler:device-laptop': 'M3 19l18 0M5 6m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z',
    'tabler:arrow-right': 'M5 12h14m-4 4l4-4m-4-4l4 4',
    'tabler:sparkles': 'M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z',
    'tabler:message-circle': 'M21 12a9 9 0 1 1 -18 0a9 9 0 0 1 18 0z M12 8v4 M12 16h.01',
    'tabler:help': 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0 M12 17l0 .01 M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4',
    'tabler:mail': 'M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10zm3.5 2h9a.5 .5 0 0 1 .5 .5v7a.5 .5 0 0 1 -.5 .5h-9a.5 .5 0 0 1 -.5 -.5v-7a.5 .5 0 0 1 .5 -.5z',
    
    // New icons for Postpartum Support Features
    'tabler:message-circle-2': 'M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1',
    'tabler:cooker': 'M12 7h.01M15 7h.01M9 7h.01M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z',
    'tabler:heart-rate-monitor': 'M3 4m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z M7 20h10 M9 16v4 M15 16v4 M7 10h2l2 3l2 -6l1 3h3',
    'tabler:baby-bottle': 'M5 10h14M12 2v2M12 4a5 5 0 0 1 5 5v11a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-11a5 5 0 0 1 5 -5z',
    'tabler:baby-carriage': 'M8 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M18 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M2 5a2 2 0 0 1 2 -2h14a1 1 0 0 1 1 1v11a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-10z M4 16l4 -5h6l4 5',
    'tabler:clock': 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0 M12 12l3 2 M12 7v5',
    'tabler:diaper': 'M10 5v6a3 3 0 0 0 3 3h.5a3.5 3.5 0 0 0 3.5 -3.5v-3.5h-7z M6 10h.01m0 4h.01 M7 19h10a2 2 0 0 0 1.75 -2.75l-.55 -1.1a3 3 0 0 0 -2.4 -1.6l-3.8 -.7h-3.4a3 3 0 0 0 -2.4 1.6l-.55 1.1a2 2 0 0 0 1.75 2.75z',
    'tabler:cross': 'M10 21h4v-9h5v-4h-5v-5h-4v5h-5v4h5z',
    'tabler:bandage': 'M14 12l.01 0m-2.01 0l.01 0m4.01 0l.01 0m-6.01 0l.01 0m-1.99 0l-.01 0m8.01 -3.5l-5 5.02m-5 -5.02l5 5.02',
    'tabler:droplet': 'M12 3l5 5a7 7 0 1 1 -10 0l5 -5',
    'tabler:chart-dots': 'M3 3v18h18 M9 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M19 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M14 15m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M17 17l-2 2 M12 12l-2 2',
    'tabler:car': 'M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5',
    'tabler:briefcase': 'M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2',
    'tabler:shopping-cart': 'M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M17 17h-11v-14h-2 M6 5l14 1l-1 7h-13',
    'tabler:heart': 'M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572',
    'tabler:link': 'M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-1.5 1.5 M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l1.5 -1.5',
  };

  // Default icon if the requested one doesn't exist
  $: iconPath = icons[name] || '';
</script>

<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width={size} 
  height={size} 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke={color} 
  stroke-width="2" 
  stroke-linecap="round" 
  stroke-linejoin="round"
  class={className}
>
  {#if iconPath}
    <path d={iconPath} />
  {:else}
    <rect width="24" height="24" fill="none" />
  {/if}
</svg>
