<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  // import Form1 from './pages/Form1.svelte';
  import Form1a from './pages/Form1a.svelte';
  // import Form2 from './pages/Form2.svelte';
  import Form2a from './pages/Form2a.svelte';

  // Available forms
  const forms = [
    // { id: 'client-intake', name: 'Client Intake', component: Form1 },
    { id: 'client-intake', name: 'Client Intake', component: Form1a },
    // { id: 'doula-intake', name: 'Doula Intake', component: Form2 },
    { id: 'doula-intake', name: 'Doula Intake', component: Form2a },
  ];

  let currentForm = '';
  let currentFormData = forms[0];
  
  // Initialize form from URL
  function updateFormFromUrl() {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const formParam = urlParams.get('form');
      currentForm = formParam || forms[0].id;
      currentFormData = forms.find(f => f.id === currentForm) || forms[0];
    }
  }
  
  // Navigation functions
  function navigateToForm(formId) {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      url.searchParams.set('form', formId);
      window.history.pushState({}, '', url);
      updateFormFromUrl();
    }
  }
  
  // Initialize and set up popstate listener
  onMount(() => {
    updateFormFromUrl();
    
    const handlePopState = () => {
      updateFormFromUrl();
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  });
</script>

<main class="forms-container">
  <nav class="forms-nav">
    {#each forms as form}
      <button
        class:active={currentForm === form.id}
        on:click={() => navigateToForm(form.id)}
        aria-current={currentForm === form.id ? 'page' : undefined}
      >
        {form.name}
      </button>
    {/each}
  </nav>

  <div class="form-content" in:fade={{ duration: 200, easing: quintOut }}>
    <svelte:component this={currentFormData.component} />
  </div>
</main>

<style>
  .forms-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .forms-nav {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 1rem;
  }

  .forms-nav button {
    padding: 0.5rem 1rem;
    background: none;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.875rem;
    color: #4a5568;
  }

  .forms-nav button:hover {
    background-color: #f7fafc;
    border-color: #cbd5e0;
  }

  .forms-nav button.active {
    background-color: #4299e1;
    color: white;
    border-color: #3182ce;
  }

  .forms-nav button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }

  .form-content {
    flex: 1;
    position: relative;
    min-height: 0;
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 768px) {
    .forms-nav {
      flex-direction: column;
    }
    
    .forms-nav button {
      width: 100%;
      text-align: left;
    }
  }
</style>
