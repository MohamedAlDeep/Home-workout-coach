<!-- FriendAdder.svelte -->
<script>
  import SignUpElement from "$lib/components/SignUpElement.svelte";
  let showModal = false;
 
</script>

<link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">

<button on:click={() => showModal = true} class="w3-button w3-green">Sign Up</button>

{#if showModal}
  <div class="w3-modal" style="display: block;">
    <div class="w3-modal-content">
      <div class="w3-container">
        <span on:click={() => showModal = false} class="w3-button w3-display-topright">&times;</span>
        <SignUpElement/>
      </div>
    </div>
  </div>
{/if}