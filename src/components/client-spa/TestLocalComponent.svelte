<script>
  export let title = 'Local Test Component';
  export let items = [
    { title: 'Local Item 1', description: 'This is a local test item' },
    { title: 'Local Item 2', description: 'Another local test item' }
  ];
</script>

<div class="local-test">
  <h2>{title}</h2>
  <div class="items">
    {#each items as item}
      <div class="item">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .local-test {
    padding: 1rem;
    border: 2px solid #4CAF50;
    border-radius: 0.5rem;
    margin: 1rem 0;
  }
  .items {
    margin-top: 1rem;
  }
  .item {
    margin: 0.5rem 0;
    padding: 0.5rem;
    background: #f0f8ff;
    border-radius: 0.25rem;
  }
</style>
