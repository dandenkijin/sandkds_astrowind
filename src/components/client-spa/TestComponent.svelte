<script>
  import TestLocal from './TestLocalComponent.svelte';
  
  console.log('TestComponent - TestLocal:', TestLocal);
  
  const testProps = {
    title: 'Local Test Component',
    items: [
      { title: 'Local Item 1', description: 'This is a local test item' },
      { title: 'Local Item 2', description: 'Another local test item' }
    ]
  };
</script>

<div class="test-component">
  <h2>Local Component Test</h2>
  <TestLocal {...testProps} />
</div>

<style>
  .test-component {
    padding: 1rem;
    border: 1px solid #ccc;
    margin: 1rem 0;
  }
</style>
