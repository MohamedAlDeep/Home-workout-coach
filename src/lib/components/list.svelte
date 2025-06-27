<script>
  import { liveQuery } from "dexie";
  import { db } from "$lib/db";

  let friends = liveQuery(
    () => db.friends.toArray()
  );

</script>
<ul>
  {#if $friends}
    {#each $friends as friend (friend.id)}
      <li>{friend.name}, {friend.age}</li>
    {/each}
  {/if}
</ul>
