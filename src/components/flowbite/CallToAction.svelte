<script lang="ts">
  import { Button, A } from 'flowbite-svelte';
  
  export let title = '';
  export let description = '';
  export let tagline = '';
  export let primaryButton = { text: '', url: '#' };
  export let secondaryButton = { text: '', url: '#' };
  export let align = 'center';
  export let background = 'default';
  export let darkMode = false;
  
  // Helper function to get alignment classes
  $: alignmentClasses = {
    'left': 'text-left items-start',
    'center': 'text-center items-center',
    'right': 'text-right items-end'
  }[align] || 'text-center items-center';
  
  // Helper function to get background classes
  $: backgroundClasses = {
    'default': 'bg-white dark:bg-gray-900',
    'gray': 'bg-gray-50 dark:bg-gray-800',
    'gradient': 'bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700',
    'dark': 'bg-gray-800 dark:bg-gray-900'
  }[background] || 'bg-white dark:bg-gray-900';
  
  // Text color based on background
  $: textColor = {
    'gradient': 'text-white',
    'dark': 'text-white',
    'default': 'text-gray-900 dark:text-white',
    'gray': 'text-gray-900 dark:text-white'
  }[background] || 'text-gray-900 dark:text-white';
  
  // Button variant based on background
  $: primaryButtonVariant = {
    'gradient': 'alternative',
    'dark': 'alternative',
    'default': 'blue',
    'gray': 'blue'
  }[background] || 'blue';
  
  $: secondaryButtonVariant = {
    'gradient': 'alternative',
    'dark': 'alternative',
    'default': 'gray',
    'gray': 'gray'
  }[background] || 'gray';
</script>

<div class={`w-full py-16 px-4 sm:px-6 lg:px-8 ${backgroundClasses} ${textColor}`}>
  <div class={`max-w-7xl mx-auto flex flex-col ${alignmentClasses} gap-6`}>
    {#if tagline}
      <span class="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
        {tagline}
      </span>
    {/if}
    
    {#if title}
      <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
    {/if}
    
    {#if description}
      <p class="max-w-3xl text-lg leading-6">
        {description}
      </p>
    {/if}
    
    <div class="mt-6 flex flex-col sm:flex-row gap-4">
      {#if primaryButton?.text}
        <Button 
          href={primaryButton.url} 
          color={primaryButtonVariant}
          size="lg"
          class="w-full sm:w-auto"
        >
          {primaryButton.text}
        </Button>
      {/if}
      
      {#if secondaryButton?.text}
        <Button 
          href={secondaryButton.url} 
          color={secondaryButtonVariant}
          size="lg"
          variant="outline"
          class="w-full sm:w-auto"
        >
          {secondaryButton.text}
        </Button>
      {/if}
    </div>
  </div>
</div>
