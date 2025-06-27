<!-- FriendAdder.svelte -->
<script>
  import { db } from "$lib/db";

  export let defaultAge = 21;

  let status = "";

  let Name = "";
  let lastName = "";
  let Age = defaultAge;
  let weight;
  let height;
  async function addFriend() {
    try {

      // Add the new friend!
      const id = await db.user.add({
        name: friendName,
        age: friendAge
      });

      status = `Friend ${friendName} successfully added. Got id ${id}`;
      
      // Reset form:
      friendName = "";
      friendAge = defaultAge;
    } catch (error) {
      status = `Failed to add ${friendName}: ${error}`;
    }
  }
</script>
<div>
  <p>{status}</p>
  <fieldset>
    <legend>Add new friend</legend>
    <label>
      Name:
      <input
          type="text"
          bind:value={Name} />
    </label>
    <br/>
    <label>
      Last Name:
      <input
          type="text"
          bind:value={lastName} />
    </label>
    <br/>
    <label>
      Age:
      <input
        type="number"
        bind:value={Age} />
    </label>
    <br />
    <label>
      Weight:
      <input
        type="number"
        bind:value={weight} />
    </label>
    <br />
    <label>
      Height:
      <input
        type="number"
        bind:value={height} />
    </label>
    <br />
    <button on:click={addFriend}>Add Friend</button>
  </fieldset>
</div>