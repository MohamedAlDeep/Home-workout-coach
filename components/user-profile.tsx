"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/types/user"
import { saveUser } from "@/lib/storage"
import { UserIcon, Scale, Ruler, Edit, Calendar, Trophy, Clock } from "lucide-react"

interface UserProfileProps {
  user: User
  onUserUpdated: (user: User) => void
}

export function UserProfile({ user, onUserUpdated }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedGender, setSelectedGender] = useState(user.gender)

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100
    return (weight / (heightInMeters * heightInMeters)).toFixed(1)
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "bg-blue-100 text-blue-800" }
    if (bmi < 25) return { category: "Normal", color: "bg-green-100 text-green-800" }
    if (bmi < 30) return { category: "Overweight", color: "bg-yellow-100 text-yellow-800" }
    return { category: "Obese", color: "bg-red-100 text-red-800" }
  }

  const formatGender = (gender: string) => {
    switch (gender) {
      case "male":
        return "Male"
      case "female":
        return "Female"
      case "other":
        return "Other"
      case "prefer-not-to-say":
        return "Prefer not to say"
      default:
        return gender
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const weight = Number.parseFloat(formData.get("weight") as string)
    const height = Number.parseFloat(formData.get("height") as string)

    if (!name || !weight || !height || !selectedGender) {
      setIsLoading(false)
      return
    }

    const updatedUser: User = {
      ...user,
      name,
      gender: selectedGender as "male" | "female" | "other" | "prefer-not-to-say",
      weight,
      height,
    }

    saveUser(updatedUser)
    onUserUpdated(updatedUser)
    setIsEditing(false)
    setIsLoading(false)
  }

  const bmi = Number.parseFloat(calculateBMI(user.weight, user.height))
  const bmiInfo = getBMICategory(bmi)

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-orange-500" />
              Profile Information
            </CardTitle>
            <CardDescription>Your personal details and fitness metrics</CardDescription>
          </div>
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Update your personal information</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input id="edit-name" name="name" defaultValue={user.name} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-gender">Gender</Label>
                  <Select value={selectedGender} onValueChange={setSelectedGender} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-weight">Weight (kg)</Label>
                    <Input
                      id="edit-weight"
                      name="weight"
                      type="number"
                      defaultValue={user.weight}
                      min="1"
                      max="500"
                      step="0.1"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-height">Height (cm)</Label>
                    <Input
                      id="edit-height"
                      name="height"
                      type="number"
                      defaultValue={user.height}
                      min="1"
                      max="300"
                      step="1"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-3">Personal Details</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Name</span>
                <span className="font-medium">{user.name}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email</span>
                <span className="font-medium text-sm">{user.email}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Gender</span>
                <span className="font-medium">{formatGender(user.gender)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Member Since
                </span>
                <span className="font-medium text-sm">{formatDate(user.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Physical Stats */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-3">Physical Stats</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Scale className="w-3 h-3" />
                  Weight
                </span>
                <span className="font-medium">{user.weight} kg</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Ruler className="w-3 h-3" />
                  Height
                </span>
                <span className="font-medium">{user.height} cm</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">BMI</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{bmi}</span>
                  <Badge className={bmiInfo.color}>{bmiInfo.category}</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fitness Stats */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-semibold text-gray-900 mb-3">Fitness Progress</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
                <Trophy className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{user.totalWorkouts}</p>
              <p className="text-sm text-gray-600">Total Workouts</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{Math.round((user.totalMinutes / 60) * 10) / 10}</p>
              <p className="text-sm text-gray-600">Hours Trained</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                <UserIcon className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(user.totalMinutes / user.totalWorkouts || 0)}
              </p>
              <p className="text-sm text-gray-600">Avg. Minutes</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
