<script>
  import Button from './Button.svelte';
  
  export let title = 'Get the Support You Deserve';
  export let description = 'Contact us to learn more about our postpartum doula services and how we can help your family thrive.';
  export let actions = [
    { label: 'Schedule a Consultation', href: '/contact', variant: 'primary' },
    { label: 'View Service Packages', href: '/services/postpartum#packages', variant: 'secondary' }
  ];
</script>

<div class="cta-section">
  <div class="cta-container">
    {#if title}
      <h2 class="cta-title">{title}</h2>
    {/if}
    
    {#if description}
      <p class="cta-description">{description}</p>
    {/if}
    
    {#if actions && actions.length > 0}
      <div class="cta-actions">
        {#each actions as action}
          <Button
            href={action.href}
            variant={action.variant || 'primary'}
            class={action.className}
            on:click={action.onClick}
          >
            {action.label}
          </Button>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .cta-section {
    width: 100%;
    margin: 6rem 0;
    position: relative;
    overflow: hidden;
  }
  
  /* Gradient background with fade effect */
  .cta-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      #ffb6c1 0%,
      #ff69b4 50%,
      #db7093 100%
    );
    z-index: -1;
    opacity: 0.95;
  }
  
  /* Subtle pattern overlay */
  .cta-section::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      circle at 10% 20%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 20%
    ),
    radial-gradient(
      circle at 90% 80%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 20%
    );
    z-index: -1;
    opacity: 0.8;
  }
  
  .cta-container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 5rem 2rem;
    position: relative;
    z-index: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  
  .cta-title {
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 700;
    letter-spacing: -0.025em;
    margin: 0 0 1.25rem;
    color: #ffffff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  }
  
  .cta-description {
    max-width: 48rem;
    font-size: 1.25rem;
    line-height: 1.7;
    margin: 0 0 2.5rem;
    color: #f8f9fa;
    font-weight: 400;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }
  
  .cta-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    max-width: 32rem;
  }
  
  /* Responsive styles */
  @media (min-width: 640px) {
    .cta-container {
      padding: 6rem 4rem;
    }
    
    .cta-title {
      font-size: 3rem;
    }
    
    .cta-actions {
      flex-direction: row;
    }
  }
  
  /* Dark mode support */
  :global(.dark) .cta-section::before {
    background: linear-gradient(
      135deg,
      #db7093 0%,
      #c71585 50%,
      #8b008b 100%
    );
    opacity: 0.95;
  }
  
  /* Ensure text is always readable */
  :global(.dark) .cta-title {
    color: #ffffff;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.35);
  }
  
  :global(.dark) .cta-description {
    color: #f8f9fa;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  }
</style>
