<script>
    import { onMount } from 'svelte';
    import { getCookie } from '$lib/utils/cookies';
    import { userStore } from '$lib/stores/user';

    onMount(() => {
        // Get specific user cookies
        const name = getCookie('name');
        const lastname = getCookie('lastName');
        const age = getCookie('age');
        const weight = getCookie('weight');
        const height = getCookie('height');
        const bmi = getCookie('bmi');
        
        // Check if essential user data exists
        if (name || lastname) {
            const user = {
                ...(name && { name }),
                ...(lastname && { lastname }),
                ...(age && { age }),
                ...(weight && { weight }),
                ...(height && { height }),
                ...(bmi && { bmi })
            };
            
            // Update the store with user data
            userStore.set(user);
        } else {
            // Set store to null if no user data
            userStore.set(null);
        }
    });
</script>

<main>
    <slot />
</main>

<style>
    main {
        padding: 1rem;
        max-width: 1200px;
        margin: 0 auto;
    }
</style>
