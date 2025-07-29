"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Flame, Calendar, Clock, Dumbbell, TrendingUp, Target, CheckCircle, LogOut, Bot } from "lucide-react"
import type { User, WorkoutLog } from "@/types/user"
import { getCurrentUser, logout, getWorkoutLogs, calculateStreak, workoutTemplates } from "@/lib/storage"
import { AuthForm } from "@/components/auth-form"
import { WorkoutLogger } from "@/components/workout-logger"
import { UserProfile } from "@/components/user-profile"

export default function WorkoutApp() {
  const [user, setUser] = useState<User | null>(null)
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      loadWorkoutLogs(currentUser.id)
    }
    setIsLoading(false)
  }, [])

  const loadWorkoutLogs = (userId: string) => {
    const logs = getWorkoutLogs(userId)
    setWorkoutLogs(logs)
  }

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser)
    loadWorkoutLogs(loggedInUser.id)
  }

  const handleLogout = () => {
    logout()
    setUser(null)
    setWorkoutLogs([])
  }

  const handleWorkoutLogged = (updatedUser: User) => {
    setUser(updatedUser)
    loadWorkoutLogs(updatedUser.id)
  }

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const getRecentWorkouts = () => {
    return workoutLogs
      .filter((log) => log.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
      .map((log) => {
        const template = workoutTemplates.find((t) => t.id === log.workoutId)
        return {
          ...log,
          name: template?.name || "Unknown Workout",
          type: template?.type || "Unknown",
        }
      })
  }

  const getCurrentStreak = () => {
    return user ? calculateStreak(user.id) : 0
  }

  const getThisWeekWorkouts = () => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    return workoutLogs.filter((log) => log.completed && new Date(log.date) >= oneWeekAgo).length
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <Dumbbell className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm onLogin={handleLogin} />
  }

  const currentStreak = getCurrentStreak()
  const thisWeekWorkouts = getThisWeekWorkouts()
  const recentWorkouts = getRecentWorkouts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">FitHome</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/ai-assistant">
                <Button variant="outline" size="sm">
                  <Bot className="w-4 h-4 mr-2" />
                  AI Assistant
                </Button>
              </Link>
              <span className="text-sm text-gray-600">Welcome, {user.name}!</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Daily Indoor Workout Assistant</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your workout assistant in your hands, in your home. Build healthy habits with personalized indoor workouts.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Current Streak</p>
                  <p className="text-3xl font-bold">{currentStreak} days</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Flame className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">This Week</p>
                  <p className="text-3xl font-bold text-gray-900">{thisWeekWorkouts} workouts</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Time</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {Math.round((user.totalMinutes / 60) * 10) / 10} hrs
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Streak Section */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Current Streak 🔥
            </CardTitle>
            <CardDescription>Keep up the momentum! You're on a {currentStreak}-day streak.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((currentStreak / 30) * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-600">{currentStreak}/30 days</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                Goal: 30 days
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {Math.round((currentStreak / 30) * 100)}% complete
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile - Full width on mobile, 1 column on desktop */}
          <div className="lg:col-span-3">
            <UserProfile user={user} onUserUpdated={handleWorkoutLogged} />
          </div>

          {/* Workout Logger */}
          <div className="lg:col-span-2">
            <WorkoutLogger user={user} onWorkoutLogged={handleWorkoutLogged} />
          </div>

          {/* Recent Workouts */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Workouts</CardTitle>
                <CardDescription>Your latest completed workout sessions</CardDescription>
              </CardHeader>
              <CardContent>
                {recentWorkouts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Dumbbell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No workouts completed yet.</p>
                    <p className="text-sm">Start your first workout to see it here!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentWorkouts.map((workout, index) => (
                      <div key={workout.id}>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{workout.name}</h3>
                              <div className="flex items-center gap-3 mt-1">
                                <Badge variant="secondary" className={getWorkoutTypeColor(workout.type)}>
                                  {workout.type}
                                </Badge>
                                <span className="text-sm text-gray-600 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {workout.duration} min
                                </span>
                                <span className="text-sm text-gray-600">{formatDate(workout.date)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < recentWorkouts.length - 1 && <Separator className="my-2" />}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
