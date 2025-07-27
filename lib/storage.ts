import type { User, WorkoutLog, WorkoutTemplate } from "@/types/user"

const USERS_KEY = "workout_users"
const WORKOUT_LOGS_KEY = "workout_logs"
const CURRENT_USER_KEY = "current_user"

export const workoutTemplates: WorkoutTemplate[] = [
  // Cardio Workouts
  {
    id: "1",
    name: "Morning Cardio Blast",
    type: "Cardio",
    duration: 25,
    description: "High-energy cardio to kickstart your day",
    exercises: ["Jumping Jacks", "High Knees", "Burpees", "Mountain Climbers", "Jump Squats"],
  },
  {
    id: "7",
    name: "Fat Burning HIIT",
    type: "Cardio",
    duration: 20,
    description: "Intense fat-burning cardio session",
    exercises: ["Burpee Tuck Jumps", "Sprint in Place", "Jump Lunges", "Plank Jacks", "Star Jumps"],
  },
  {
    id: "8",
    name: "Low Impact Cardio",
    type: "Cardio",
    duration: 30,
    description: "Joint-friendly cardio for all fitness levels",
    exercises: ["Step Touch", "Arm Circles", "Marching in Place", "Side Steps", "Gentle Bouncing"],
  },
  {
    id: "9",
    name: "Dance Cardio",
    type: "Cardio",
    duration: 35,
    description: "Fun dance-inspired cardio workout",
    exercises: ["Grapevine Steps", "Hip Swings", "Arm Waves", "Cha-Cha Steps", "Body Rolls"],
  },

  // Upper Body Workouts
  {
    id: "2",
    name: "Upper Body Strength",
    type: "Strength",
    duration: 35,
    description: "Build upper body muscle and strength",
    exercises: ["Push-ups", "Pike Push-ups", "Tricep Dips", "Plank", "Wall Handstand"],
  },
  {
    id: "10",
    name: "Arms & Shoulders Blast",
    type: "Strength",
    duration: 25,
    description: "Target arms and shoulders for definition",
    exercises: ["Diamond Push-ups", "Arm Circles", "Wall Push-ups", "Shoulder Taps", "Tricep Wall Push"],
  },
  {
    id: "11",
    name: "Chest & Back Builder",
    type: "Strength",
    duration: 30,
    description: "Strengthen chest and back muscles",
    exercises: ["Wide Push-ups", "Superman", "Reverse Plank", "T-Push-ups", "Wall Angels"],
  },
  {
    id: "12",
    name: "Upper Body Endurance",
    type: "Strength",
    duration: 40,
    description: "Build muscular endurance in upper body",
    exercises: ["Push-up Hold", "Plank to Downward Dog", "Arm Pulses", "Wall Sit with Arms", "Isometric Holds"],
  },

  // Lower Body Workouts
  {
    id: "5",
    name: "Lower Body Burn",
    type: "Strength",
    duration: 28,
    description: "Target your legs and glutes",
    exercises: ["Squats", "Lunges", "Calf Raises", "Wall Sit", "Single-leg Glute Bridge"],
  },
  {
    id: "13",
    name: "Glute Activation",
    type: "Strength",
    duration: 20,
    description: "Activate and strengthen your glutes",
    exercises: ["Glute Bridges", "Clamshells", "Fire Hydrants", "Donkey Kicks", "Single-leg Deadlifts"],
  },
  {
    id: "14",
    name: "Leg Power & Strength",
    type: "Strength",
    duration: 35,
    description: "Build powerful, strong legs",
    exercises: ["Jump Squats", "Bulgarian Split Squats", "Single-leg Squats", "Lateral Lunges", "Cossack Squats"],
  },
  {
    id: "15",
    name: "Thigh & Calf Toner",
    type: "Strength",
    duration: 25,
    description: "Tone and strengthen thighs and calves",
    exercises: ["Sumo Squats", "Reverse Lunges", "Calf Raises", "Inner Thigh Lifts", "Standing Leg Curls"],
  },

  // Core & Abs Workouts
  {
    id: "3",
    name: "Core & Flexibility",
    type: "Flexibility",
    duration: 20,
    description: "Strengthen your core and improve flexibility",
    exercises: ["Plank", "Russian Twists", "Leg Raises", "Cat-Cow Stretch", "Child's Pose"],
  },
  {
    id: "16",
    name: "Abs Destroyer",
    type: "Strength",
    duration: 15,
    description: "Intense core workout for strong abs",
    exercises: ["Bicycle Crunches", "Plank Hold", "Dead Bug", "Russian Twists", "Mountain Climbers"],
  },
  {
    id: "17",
    name: "Core Stability",
    type: "Strength",
    duration: 25,
    description: "Build core stability and balance",
    exercises: ["Side Plank", "Bird Dog", "Pallof Press", "Single-leg Stand", "Hollow Body Hold"],
  },

  // Full Body Workouts
  {
    id: "18",
    name: "Total Body Blast",
    type: "Strength",
    duration: 45,
    description: "Complete full-body strength workout",
    exercises: ["Burpees", "Squat to Press", "Push-up to T", "Lunge with Twist", "Plank Up-downs"],
  },
  {
    id: "19",
    name: "Functional Movement",
    type: "Strength",
    duration: 35,
    description: "Improve everyday movement patterns",
    exercises: ["Squat to Stand", "Step-ups", "Carry Walks", "Get-ups", "Multi-planar Lunges"],
  },
  {
    id: "20",
    name: "Bodyweight Circuit",
    type: "Strength",
    duration: 30,
    description: "No-equipment full body circuit",
    exercises: ["Push-ups", "Squats", "Plank", "Lunges", "Jumping Jacks"],
  },

  // HIIT Workouts
  {
    id: "4",
    name: "HIIT Power Session",
    type: "HIIT",
    duration: 30,
    description: "High-intensity interval training for maximum burn",
    exercises: ["Burpees", "Jump Squats", "Push-ups", "High Knees", "Plank Jacks"],
  },
  {
    id: "21",
    name: "Tabata Torch",
    type: "HIIT",
    duration: 20,
    description: "4-minute Tabata-style intervals",
    exercises: ["Squat Jumps", "Push-up Burpees", "Mountain Climbers", "Jump Lunges", "Plank to Jump"],
  },
  {
    id: "22",
    name: "Metabolic Mayhem",
    type: "HIIT",
    duration: 25,
    description: "Boost your metabolism with intense intervals",
    exercises: ["Thrusters", "Burpee Box Jumps", "Speed Skaters", "Tuck Jumps", "Battle Ropes Motion"],
  },

  // Flexibility & Recovery
  {
    id: "6",
    name: "Yoga Flow",
    type: "Flexibility",
    duration: 40,
    description: "Gentle yoga flow for mind and body",
    exercises: ["Sun Salutation", "Warrior Pose", "Downward Dog", "Tree Pose", "Savasana"],
  },
  {
    id: "23",
    name: "Morning Stretch",
    type: "Flexibility",
    duration: 15,
    description: "Gentle stretches to start your day",
    exercises: ["Neck Rolls", "Shoulder Shrugs", "Spinal Twists", "Hip Circles", "Ankle Rolls"],
  },
  {
    id: "24",
    name: "Deep Stretch & Recovery",
    type: "Flexibility",
    duration: 30,
    description: "Deep stretching for muscle recovery",
    exercises: ["Pigeon Pose", "Forward Fold", "Seated Spinal Twist", "Hip Flexor Stretch", "Hamstring Stretch"],
  },
  {
    id: "25",
    name: "Bedtime Relaxation",
    type: "Flexibility",
    duration: 20,
    description: "Calming stretches before bed",
    exercises: ["Legs Up Wall", "Gentle Twists", "Child's Pose", "Shoulder Rolls", "Deep Breathing"],
  },

  // Beginner Friendly
  {
    id: "26",
    name: "Beginner's First Workout",
    type: "Strength",
    duration: 15,
    description: "Perfect introduction to home workouts",
    exercises: ["Wall Push-ups", "Chair Squats", "Standing March", "Arm Raises", "Gentle Stretches"],
  },
  {
    id: "27",
    name: "Low Impact Strength",
    type: "Strength",
    duration: 25,
    description: "Build strength without high impact",
    exercises: ["Isometric Squats", "Wall Sits", "Standing Calf Raises", "Seated Leg Extensions", "Arm Circles"],
  },

  // Advanced Challenges
  {
    id: "28",
    name: "Advanced Athlete",
    type: "Strength",
    duration: 50,
    description: "Challenging workout for experienced athletes",
    exercises: ["One-arm Push-ups", "Pistol Squats", "Handstand Push-ups", "Single-leg Burpees", "Advanced Planks"],
  },
  {
    id: "29",
    name: "Plyometric Power",
    type: "HIIT",
    duration: 30,
    description: "Explosive movements for power development",
    exercises: ["Box Jumps", "Depth Jumps", "Clap Push-ups", "Jump Squats", "Broad Jumps"],
  },
  {
    id: "30",
    name: "Endurance Challenge",
    type: "Cardio",
    duration: 60,
    description: "Long-duration endurance building workout",
    exercises: ["Steady State Cardio", "Active Recovery", "Tempo Changes", "Breathing Exercises", "Cool Down"],
  },
]

export const getUsers = (): User[] => {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : []
}

export const saveUser = (user: User): void => {
  if (typeof window === "undefined") return
  const users = getUsers()
  const existingIndex = users.findIndex((u) => u.id === user.id)

  if (existingIndex >= 0) {
    users[existingIndex] = user
  } else {
    users.push(user)
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null
  const userId = localStorage.getItem(CURRENT_USER_KEY)
  if (!userId) return null

  const users = getUsers()
  return users.find((u) => u.id === userId) || null
}

export const setCurrentUser = (userId: string): void => {
  if (typeof window === "undefined") return
  localStorage.setItem(CURRENT_USER_KEY, userId)
}

export const logout = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem(CURRENT_USER_KEY)
}

export const getWorkoutLogs = (userId: string): WorkoutLog[] => {
  if (typeof window === "undefined") return []
  const logs = localStorage.getItem(WORKOUT_LOGS_KEY)
  const allLogs: WorkoutLog[] = logs ? JSON.parse(logs) : []
  return allLogs.filter((log) => log.userId === userId)
}

export const saveWorkoutLog = (log: WorkoutLog): void => {
  if (typeof window === "undefined") return
  const logs = localStorage.getItem(WORKOUT_LOGS_KEY)
  const allLogs: WorkoutLog[] = logs ? JSON.parse(logs) : []

  const existingIndex = allLogs.findIndex((l) => l.id === log.id)
  if (existingIndex >= 0) {
    allLogs[existingIndex] = log
  } else {
    allLogs.push(log)
  }

  localStorage.setItem(WORKOUT_LOGS_KEY, JSON.stringify(allLogs))
}

export const calculateStreak = (userId: string): number => {
  const logs = getWorkoutLogs(userId).filter((log) => log.completed)
  if (logs.length === 0) return 0

  // Sort by date descending
  logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < logs.length; i++) {
    const logDate = new Date(logs[i].date)
    logDate.setHours(0, 0, 0, 0)

    const expectedDate = new Date(today)
    expectedDate.setDate(today.getDate() - streak)

    if (logDate.getTime() === expectedDate.getTime()) {
      streak++
    } else if (logDate.getTime() < expectedDate.getTime()) {
      break
    }
  }

  return streak
}
