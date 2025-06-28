<script>
    import { goto } from '$app/navigation';
    import { userStore } from '$lib/stores/user';
    import { redirect } from '@sveltejs/kit';
    import { onMount } from 'svelte';
    
    let user = null;

    // Subscribe to the user store
    userStore.subscribe(value => {
        user = value;
    });
 
    onMount(() => {

    });
</script>

<h1>Profile</h1>
<a href="/">Homepage</a>
{#if user}
    <ul>
        {#each Object.entries(user) as [key, value]}
            <li><strong>{key.toUpperCase()}:</strong> {value}</li>
        {/each}
    </ul>
{:else}
    <p>Sign Up First 😄<a href="/">Homepage</a></p>
{/if}

