<script>
  export let href = '';
  export let type = 'button';
  export let variant = 'primary'; // 'primary', 'secondary', or 'tertiary'
  export let size = 'md'; // 'sm', 'md', 'lg'
  export let fullWidth = false;
  export let disabled = false;
  export let className = '';
  
  // Handle click events
  export let onClick = () => {};
  
  // Generate class names based on props
  $: buttonClasses = `
    btn 
    ${variant} 
    ${size} 
    ${fullWidth ? 'w-full' : ''} 
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;
</script>

{#if href}
  <a 
    href={disabled ? undefined : href}
    class={buttonClasses}
    on:click|preventDefault={!disabled ? onClick : null}
    {disabled}
  >
    <slot />
  </a>
{:else}
  <button
    type={type}
    class={buttonClasses}
    on:click|preventDefault={!disabled ? onClick : null}
    {disabled}
  >
    <slot />
  </button>
{/if}

<style>
  /* Base button styles */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 1.5rem;
    border: 1px solid rgba(156, 163, 175, 1);
    background-color: transparent;
    font-weight: 500;
    text-align: center;
    font-size: 1rem;
    line-height: 1.25rem;
    transition: all 0.2s ease-in;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    color: var(--aw-color-text-page, #0f172a);
    text-decoration: none;
    white-space: nowrap;
  }

  /* Button sizes */
  .btn.sm {
    font-size: 0.875rem;
    padding: 0.375rem 1rem;
  }
  
  .btn.lg {
    font-size: 1.125rem;
    padding: 0.75rem 2rem;
  }

  /* Button variants */
  .btn.primary {
    background-color: var(--aw-color-primary, #E8B4B8);
    border-color: var(--aw-color-primary, #E8B4B8);
    color: var(--aw-color-text-heading, #404040);
    transition: all 0.2s ease-in-out;
  }

  .btn.primary:hover:not(:disabled) {
    background-color: var(--aw-color-secondary, #D48A8F);
    border-color: var(--aw-color-secondary, #D48A8F);
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .btn.secondary {
    background-color: var(--aw-color-bg-page, #FFFDFA);
    border: 2px solid var(--aw-color-primary, #E8B4B8);
    color: var(--aw-color-text-default, #595959);
    transition: all 0.2s ease-in-out;
  }

  .btn.secondary:hover:not(:disabled) {
    background-color: var(--aw-color-accent, #FFDADD);
    border-color: var(--aw-color-secondary, #D48A8F);
    transform: translateY(-1px);
  }

  .btn.tertiary {
    background-color: transparent;
    border: 2px solid transparent;
    color: var(--aw-color-text-default, #595959);
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-thickness: 1px;
    padding: 0.5rem 1rem;
    transition: all 0.2s ease-in-out;
  }

  .btn.tertiary:hover:not(:disabled) {
    color: var(--aw-color-primary, #E8B4B8);
    text-decoration-thickness: 2px;
    transform: translateY(-1px);
  }

  /* Focus state */
  .btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--aw-color-accent, #FFDADD);
    border-color: var(--aw-color-secondary, #D48A8F);
  }

  /* Disabled state */
  .btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    transform: none !important;
    box-shadow: none !important;
  }
  
  /* Dark mode overrides */
  .dark .btn.primary {
    color: var(--aw-color-text-heading, #FAFAFA);
  }
  
  .dark .btn.secondary {
    background-color: var(--aw-color-bg-page, #1E1A1F);
    color: var(--aw-color-text-default, #E5E5E5);
  }
</style>
