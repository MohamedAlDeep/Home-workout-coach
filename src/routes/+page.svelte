
<!-- App.svelte -->
<script>
  import Add from "$lib/components/signup.svelte";
  import List from "$lib/components/profile.svelte";
  import { userStore } from '$lib/stores/user';
  
  let user = null;

  // Subscribe to the user store
  userStore.subscribe(value => {
    user = value;
  });
</script>

<h1>Daily Indoor Workout Assistant</h1>
<p>Your workout assistant in your hands, in your home.</p>

{#if !user || Object.keys(user).length === 0}
  <Add />
{:else}
  <p>Welcome back, {user.name || 'User'}! Check <a href="/profile">profile</a></p>
{/if}

<h2>Result</h2>
<List />
