<script lang="ts">
  export let name: string;
  export const size: number = 20;
  export const color: string = 'currentColor';
  export const className: string = '';

  // Tabler Icons (simplified version with just the icons we need)
  const icons = {
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
