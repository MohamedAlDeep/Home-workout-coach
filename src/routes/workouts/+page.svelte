<script>
  import workouts from '$lib/workouts.json';
  
  // Helper function to format text
  const formatText = (text) => {
    return text.split('_').join(' ').toUpperCase();
  };
</script>

<style>
  /* Same styles as before */
  .workout-container {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 30px;
  }
  
  .category {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  h2 {
    color: #3498db;
    border-bottom: 2px solid #3498db;
    padding-bottom: 8px;
    margin-top: 0;
  }
  
  h3 {
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  .muscle-group {
    margin-bottom: 15px;
  }
  
  .exercise {
    background-color: white;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .exercise-name {
    font-weight: bold;
    color: #e74c3c;
    margin-bottom: 5px;
  }
  
  .equipment {
    font-style: italic;
    color: #7f8c8d;
    margin-bottom: 5px;
  }
  
  .variations {
    margin-top: 5px;
  }
  
  .variation {
    display: inline-block;
    background-color: #eaf2f8;
    padding: 3px 8px;
    border-radius: 12px;
    margin-right: 5px;
    font-size: 0.8em;
  }
</style>




<div class="workout-container">
  <h1>Workouts List</h1>
  
  {#each Object.entries(workouts.workouts) as [category, muscleGroups]}
    <div class="category">
      <h2>{formatText(category)}</h2>
      
      {#if Array.isArray(muscleGroups)}
        {#each muscleGroups as exercise}
          <div class="exercise">
            <div class="exercise-name">{exercise.name}</div>
            <div class="equipment">Equipment: {exercise.equipment || 'None'}</div>
            {#if exercise.variations}
              <div class="variations">
                Variations: 
                {#each exercise.variations as variation}
                  <span class="variation">{variation}</span>
                {/each}
              </div>
            {/if}
            <div>Difficulty: <span class="variation">{exercise.difficulty}</span></div>
            <a href={exercise.name}>Log exercise</a>
          </div>
        {/each}
      {:else}
        {#each Object.entries(muscleGroups) as [muscleGroup, exercises]}
          <div class="muscle-group">
            <h3>{muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1)}</h3>
            
            {#each exercises as exercise}
              <div class="exercise">
                <div class="exercise-name">{exercise.name}</div>
                <div class="equipment">Equipment: {exercise.equipment || 'None'}</div>
                {#if exercise.variations}
                  <div class="variations">
                    Variations: 
                    {#each exercise.variations as variation}
                      <span class="variation">{variation}</span>
                    {/each}
                  </div>
                {/if}
                <div>Difficulty: <span class="variation">{exercise.difficulty}</span></div>
                <a href={exercise.name}>Log exercise</a>
              </div>
            {/each}
          </div>
        {/each}
      {/if}
    </div>
  {/each}
  
  <div class="category">
    <h2>Equipment Suggestions</h2>
    <ul>
      {#each workouts.equipment_suggestions as item}
        <li>{item}</li>
      {/each}
    </ul>
  </div>

  <div class="category">
    <h2>Workout Tips</h2>
    <ul>
      {#each workouts.workout_tips as item}
        <li>{item}</li>
      {/each}
    </ul>
  </div>

</div>