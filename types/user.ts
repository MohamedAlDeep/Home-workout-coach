export interface User {
  id: string
  name: string
  email: string
  gender: "male" | "female" | "other" | "prefer-not-to-say"
  weight: number // in kg
  height: number // in cm
  createdAt: string
  currentStreak: number
  totalWorkouts: number
  totalMinutes: number
}

export interface WorkoutLog {
  id: string
  userId: string
  workoutId: string
  date: string
  duration: number
  completed: boolean
}

export interface WorkoutTemplate {
  id: string
  name: string
  type: string
  duration: number
  description: string
  exercises: string[]
}
