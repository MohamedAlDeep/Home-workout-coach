// place files you want to import through the `$lib` alias in this folder.
// db.js
import Dexie from 'dexie';

export const db = new Dexie('DailyHomeCoachDB');
db.version(1).stores({
  workouts: '++id, name, reps, sets, calories, date, duration',
  user: '++id, name, lastName, age, weight, height, bmi' // Primary key and indexed props
});
