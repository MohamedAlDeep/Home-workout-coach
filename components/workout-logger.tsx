"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { WorkoutTemplate, WorkoutLog, User } from "@/types/user"
import { workoutTemplates, saveWorkoutLog, saveUser } from "@/lib/storage"
import { Clock, Play, CheckCircle, Dumbbell } from "lucide-react"

interface WorkoutLoggerProps {
  user: User
  onWorkoutLogged: (user: User) => void
}

export function WorkoutLogger({ user, onWorkoutLogged }: WorkoutLoggerProps) {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutTemplate | null>(null)
  const [isLogging, setIsLogging] = useState(false)

  const getWorkoutTypeColor = (type: string) => {
    switch (type) {
      case "Cardio":
        return "bg-red-100 text-red-800"
      case "Strength":
        return "bg-blue-100 text-blue-800"
      case "Flexibility":
        return "bg-green-100 text-green-800"
      case "HIIT":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const logWorkout = async (workout: WorkoutTemplate) => {
    setIsLogging(true)

    // Simulate workout completion
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const workoutLog: WorkoutLog = {
      id: Date.now().toString(),
      userId: user.id,
      workoutId: workout.id,
      date: new Date().toISOString().split("T")[0],
      duration: workout.duration,
      completed: true,
    }

    saveWorkoutLog(workoutLog)

    // Update user stats
    const updatedUser: User = {
      ...user,
      totalWorkouts: user.totalWorkouts + 1,
      totalMinutes: user.totalMinutes + workout.duration,
    }

    saveUser(updatedUser)
    onWorkoutLogged(updatedUser)
    setIsLogging(false)
    setSelectedWorkout(null)
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Available Workouts</CardTitle>
        <CardDescription>Choose a workout to complete today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workoutTemplates.map((workout) => (
            <Card key={workout.id} className="border border-gray-200 hover:border-orange-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{workout.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{workout.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getWorkoutTypeColor(workout.type)}>{workout.type}</Badge>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {workout.duration} min
                      </span>
                    </div>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-transparent"
                      variant="outline"
                      onClick={() => setSelectedWorkout(workout)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Workout
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Dumbbell className="w-5 h-5 text-orange-500" />
                        {selectedWorkout?.name}
                      </DialogTitle>
                      <DialogDescription>{selectedWorkout?.description}</DialogDescription>
                    </DialogHeader>

                    {selectedWorkout && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Badge className={getWorkoutTypeColor(selectedWorkout.type)}>{selectedWorkout.type}</Badge>
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {selectedWorkout.duration} minutes
                          </span>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Exercises included:</h4>
                          <ul className="space-y-1">
                            {selectedWorkout.exercises.map((exercise, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {exercise}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => setSelectedWorkout(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                            onClick={() => logWorkout(selectedWorkout)}
                            disabled={isLogging}
                          >
                            {isLogging ? "Logging..." : "Complete Workout"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
