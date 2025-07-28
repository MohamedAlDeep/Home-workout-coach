"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { User } from "@/types/user"
import { getUsers, saveUser, setCurrentUser } from "@/lib/storage"
import { Dumbbell, UserIcon, Scale, Ruler } from "lucide-react"

interface AuthFormProps {
  onLogin: (user: User) => void
}

export function AuthForm({ onLogin }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedGender, setSelectedGender] = useState<string>("")

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const weight = Number.parseFloat(formData.get("weight") as string)
    const height = Number.parseFloat(formData.get("height") as string)

    if (!name || !email || !password || !selectedGender || !weight || !height) {
      setError("All fields are required")
      setIsLoading(false)
      return
    }

    if (weight <= 0 || weight > 500) {
      setError("Please enter a valid weight (1-500 kg)")
      setIsLoading(false)
      return
    }

    if (height <= 0 || height > 300) {
      setError("Please enter a valid height (1-300 cm)")
      setIsLoading(false)
      return
    }

    const users = getUsers()
    if (users.find((u) => u.email === email)) {
      setError("Email already exists")
      setIsLoading(false)
      return
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      gender: selectedGender as "male" | "female" | "other" | "prefer-not-to-say",
      weight,
      height,
      createdAt: new Date().toISOString(),
      currentStreak: 0,
      totalWorkouts: 0,
      totalMinutes: 0,
    }

    saveUser(newUser)
    setCurrentUser(newUser.id)
    onLogin(newUser)
    setIsLoading(false)
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      setError("All fields are required")
      setIsLoading(false)
      return
    }

    const users = getUsers()
    const user = users.find((u) => u.email === email)

    if (!user) {
      setError("Invalid email or password")
      setIsLoading(false)
      return
    }

    setCurrentUser(user.id)
    onLogin(user)
    setIsLoading(false)
  }

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100
    return (weight / (heightInMeters * heightInMeters)).toFixed(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Welcome to FitHome</CardTitle>
          <CardDescription>Your personal workout assistant</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input id="signin-email" name="email" type="email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input id="signup-name" name="name" type="text" placeholder="Enter your full name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" name="email" type="email" placeholder="Enter your email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={selectedGender} onValueChange={setSelectedGender} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
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
                    <Label htmlFor="weight" className="flex items-center gap-2">
                      <Scale className="w-4 h-4" />
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      placeholder="70"
                      min="1"
                      max="500"
                      step="0.1"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height" className="flex items-center gap-2">
                      <Ruler className="w-4 h-4" />
                      Height (cm)
                    </Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      placeholder="175"
                      min="1"
                      max="300"
                      step="1"
                      required
                    />
                  </div>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
