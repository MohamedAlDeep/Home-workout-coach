<script>
  import { setCookie } from '$lib/utils/cookies';
  import { userStore } from '$lib/stores/user';

  export let defaultAge = 21;

  let status = "";

  let Name = "";
  let lastName = "";
  let Age = defaultAge;
  let weight;
  let height;
  function addUser() {
    try {
      // Create user object
      const userData = {
        name: Name,
        lastname: lastName,
        age: Age,
        weight: weight,
        height: height
      };
      
      // Calculate BMI
      const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
      userData.bmi = bmi;

      // Set cookies for persistence
      setCookie('name', Name);
      setCookie('lastName', lastName);
      setCookie('age', Age);
      setCookie('weight', weight);
      setCookie('height', height);
      setCookie('bmi', bmi);

      

      status = `User ${Name} successfully signed up. Data saved to store and cookies.`;
    } catch (error) {
      status = `Failed to sign up ${Name}: ${error}`;
    }
  }
</script>


<div>
  <p>{status}</p>
  <fieldset>
    <legend>Sign Up</legend>
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
    <button on:click={addUser}>Sign Up</button>
  </fieldset>
</div>
