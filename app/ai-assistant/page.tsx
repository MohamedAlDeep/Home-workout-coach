"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/types/user"
import { getCurrentUser, logout } from "@/lib/storage"
import { AuthForm } from "@/components/auth-form"
import { Dumbbell, LogOut, Send, Bot, UserIcon, Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function AIAssistantPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      // Add welcome message
      setMessages([
        {
          id: "welcome",
          content: `Hi ${currentUser.name}! I'm your AI fitness assistant. I can help you with workout recommendations, form tips, nutrition advice, and answer any fitness-related questions. What would you like to know?`,
          role: "assistant",
          timestamp: new Date(),
        },
      ])
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser)
  }

  const handleLogout = () => {
    logout()
    setUser(null)
    setMessages([])
  }

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('https://ai.hackclub.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are a helpful AI fitness assistant for a home workout app called Daily Home Coach. Provide personalized workout advice, form tips, nutrition guidance, and motivation. Keep responses concise and actionable. Focus on home workouts, bodyweight exercises, and general fitness advice."
            },
            {
              role: "user",
              content: userMessage
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract the AI response from the API response
      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        return data.choices[0].message.content;
      } else {
        throw new Error('Invalid response format from AI service');
      }
    } catch (error) {
      console.error('Error calling AI service:', error);
      
      // Fallback to default responses if API fails
      const fallbackResponses = [
        "I'm sorry, I'm having trouble connecting to my AI service right now. However, I can tell you that consistency is key in fitness! What specific workout or fitness topic would you like to discuss?",
        "There seems to be a temporary issue with my AI connection. In the meantime, remember that any movement is better than no movement! What fitness goal are you working towards?",
        "I'm experiencing some technical difficulties, but I'm still here to help! For general fitness advice: stay hydrated, warm up before workouts, and listen to your body. What would you like to know more about?",
      ];
      
      return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    try {
      const aiResponse = await getAIResponse(inputMessage)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">AI Fitness Assistant</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Beta
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}!</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your AI Fitness Coach</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get personalized workout advice, form tips, nutrition guidance, and motivation from your AI fitness
            assistant.
          </p>
        </div>

        <Card className="border-0 shadow-xl h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-500" />
              Chat with Your AI Assistant
            </CardTitle>
            <CardDescription>Ask me anything about workouts, nutrition, form, or fitness goals!</CardDescription>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500">
                        <AvatarFallback className="bg-transparent">
                          <Bot className="w-4 h-4 text-white" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.role === "user" ? "text-orange-100" : "text-gray-500"}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>

                    {message.role === "user" && (
                      <Avatar className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500">
                        <AvatarFallback className="bg-transparent">
                          <UserIcon className="w-4 h-4 text-white" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500">
                      <AvatarFallback className="bg-transparent">
                        <Bot className="w-4 h-4 text-white" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about workouts, nutrition, form tips, or anything fitness-related..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Suggestions */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Questions to Get Started:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "What workout should I do today?",
              "How do I improve my push-up form?",
              "What should I eat after a workout?",
              "How often should I exercise?",
              "I'm a beginner, where should I start?",
              "How can I stay motivated?",
            ].map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left justify-start h-auto p-3 bg-white hover:bg-gray-50"
                onClick={() => setInputMessage(suggestion)}
              >
                <span className="text-sm">{suggestion}</span>
              </Button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
