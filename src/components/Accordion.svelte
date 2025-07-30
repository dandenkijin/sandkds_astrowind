<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  export let items: Array<{ 
    title: string; 
    content: string; 
    isOpen?: boolean 
  }> = [];
  
  export const multiple = false;
  
  function toggleItem(index: number) {
    if (multiple) {
      items = items.map((item, i) => 
        i === index ? { ...item, isOpen: !item.isOpen } : item
      );
    } else {
      items = items.map((item, i) => ({
        ...item,
        isOpen: i === index ? !item.isOpen : false
      }));
    }
  }
</script>

<div class="accordion">
  {#each items as item, i (i)}
    <div class="accordion-item" class:open={item.isOpen}>
      <button 
        class="accordion-header" 
        on:click={() => toggleItem(i)}
        aria-expanded={item.isOpen}
        aria-controls={`accordion-panel-${i}`}
      >
        <span class="accordion-title">{item.title}</span>
        <span class="accordion-icon" transition:fly={{
          y: 0,
          duration: 200,
          easing: cubicOut
        }}>+</span>
      </button>
      
      {#if item.isOpen}
        <div 
          id={`accordion-panel-${i}`}
          class="accordion-content"
          transition:fade={{ duration: 150 }}
          role="region"
          aria-labelledby={`accordion-header-${i}`}
        >
          <div class="accordion-content-inner">
            {@html item.content}
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .accordion {
    width: 100%;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .accordion-item {
    border-bottom: 1px solid #e2e8f0;
  }
  
  .accordion-item:last-child {
    border-bottom: none;
  }
  
  .accordion-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    background: #f8fafc;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .accordion-header:hover {
    background: #f1f5f9;
  }
  
  .accordion-item.open .accordion-header {
    background: #e2e8f0;
    font-weight: 600;
  }
  
  .accordion-title {
    text-align: left;
  }
  
  .accordion-icon {
    transition: transform 0.2s ease;
    font-size: 1.25rem;
    line-height: 1;
  }
  
  .accordion-item.open .accordion-icon {
    transform: rotate(45deg);
  }
  
  .accordion-content {
    padding: 0 1.25rem;
    background: white;
    overflow: hidden;
  }
  
  .accordion-content-inner {
    padding: 1rem 0;
    line-height: 1.6;
  }
  
  /* Animation for the content */
  .accordion-content {
    transition: height 0.3s ease-out;
  }
</style>
