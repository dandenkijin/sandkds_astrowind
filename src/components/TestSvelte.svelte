<script>
  let count = 0;
  
  function increment() {
    count += 1;
  }
</script>

<button on:click={increment} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<style>
  button {
    transition: background-color 0.2s;
  }
</style>
