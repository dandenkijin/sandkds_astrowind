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
  <nav class="flex gap-3 mb-8 flex-wrap border-b border-border-muted pb-4">
    {#each forms as form}
      <button
        class="px-6 py-2 rounded-3xl text-sm transition-all duration-200 border border-gray-400
          {currentForm === form.id 
            ? 'bg-primary text-white border-primary hover:bg-secondary hover:border-secondary dark:bg-primary dark:text-white dark:border-primary' 
            : 'bg-transparent text-text-base hover:bg-gray-100 hover:text-gray-900 hover:border-gray-600 dark:text-slate-300 dark:border-slate-500 dark:hover:bg-slate-800 dark:hover:border-slate-800'}"
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
  :global(body) {
    background-color: var(--color-bg-base, #ffffff);
    color: var(--color-text-base, #1a202c);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .forms-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--color-bg-base, #ffffff);
    color: var(--color-text-base, #1a202c);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .form-content {
    flex: 1;
    position: relative;
    min-height: 0;
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0;
    background-color: var(--color-bg-base, #ffffff);
    color: var(--color-text-base, #1a202c);
  }

  /* Dark mode styles */
  @media (prefers-color-scheme: dark) {
    :global(html.dark) .form-content,
    :global(html.dark) .forms-container {
      --color-bg-base: #1a202c;
      --color-text-base: #e2e8f0;
      --color-border-muted: #2d3748;
      --color-bg-muted: #2d3748;
      --color-border-base: #4a5568;
      --color-primary: #63b3ed;
      --color-primary-dark: #4299e1;
      --color-primary-opacity: rgba(99, 179, 237, 0.5);
    }
  }

  @media (max-width: 768px) {
    nav {
      flex-direction: column;
    }
    
    nav button {
      width: 100%;
      text-align: left;
    }
  }
</style>
