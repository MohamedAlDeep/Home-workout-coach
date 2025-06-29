<script>
    import Dexie from "dexie";
    const db = new Dexie("DailyHomeCoachDB");
    

    // Example: Add a workout
    async function addWorkout(workout) {
        await db.workout.add(workout);
    }

    // Example usage
    // addWorkout({ name: "Push Ups", date: new Date().toISOString(), duration: 30 });
</script>

