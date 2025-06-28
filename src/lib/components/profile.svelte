<script>
  import { liveQuery } from "dexie";
  import { db } from "$lib/db";
  import { derived } from "svelte/store";

  const firstUser = derived(
    liveQuery(() => db.user.toArray()),
    ($users, set) => {
      if ($users && $users.length > 0) set($users[0]);
      else set(null);
    }
  );

</script>
<ul>
{#if $firstUser}
  Name: 
  <li>{$firstUser.name}</li>
  Last Name:
  <li>{$firstUser.lastName}</li>
  Age: 
  <li>{$firstUser.age}</li>
  Weight:
  <li>{$firstUser.weight}</li>
  Height:
  <li>{$firstUser.height}</li>
{:else}
  <li>No user found</li>
{/if}
</ul>
