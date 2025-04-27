"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Trophy, TrendingDown, Calendar, Trash2, Plus, CheckCircle } from "lucide-react"
import { useNotification } from "@/components/ui/notification-toast"

export function GoalTracker() {
  const [activeTab, setActiveTab] = useState("active")
  const [showNewGoalForm, setShowNewGoalForm] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: "",
    category: "waste",
    target: "",
    deadline: "",
    unit: "kg",
  })
  const { addNotification } = useNotification()

  // Sample goals data - in a real app, this would be stored in a database
  const [goals, setGoals] = useState([
    {
      id: "1",
      title: "Reduce Plastic Waste",
      category: "waste",
      current: 35,
      target: 50,
      unit: "kg",
      deadline: "2023-12-31",
      progress: 70,
      status: "active",
    },
    {
      id: "2",
      title: "Increase Recycling Rate",
      category: "recycling",
      current: 65,
      target: 80,
      unit: "%",
      deadline: "2023-12-31",
      progress: 81,
      status: "active",
    },
    {
      id: "3",
      title: "Reduce Carbon Footprint",
      category: "carbon",
      current: 120,
      target: 200,
      unit: "kg",
      deadline: "2023-12-31",
      progress: 60,
      status: "active",
    },
    {
      id: "4",
      title: "Zero Waste Week",
      category: "waste",
      current: 100,
      target: 100,
      unit: "%",
      deadline: "2023-10-15",
      progress: 100,
      status: "completed",
    },
  ])

  const handleCreateGoal = () => {
    if (!newGoal.title || !newGoal.target || !newGoal.deadline) {
      addNotification({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        type: "error",
        duration: 3000,
      })
      return
    }

    const id = Math.random().toString(36).substring(2, 9)
    const createdGoal = {
      id,
      title: newGoal.title,
      category: newGoal.category,
      current: 0,
      target: Number.parseInt(newGoal.target),
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      progress: 0,
      status: "active",
    }

    setGoals([...goals, createdGoal])
    setNewGoal({
      title: "",
      category: "waste",
      target: "",
      deadline: "",
      unit: "kg",
    })
    setShowNewGoalForm(false)

    addNotification({
      title: "Goal Created",
      description: `Your goal "${newGoal.title}" has been created.`,
      type: "success",
      duration: 3000,
    })
  }

  const updateGoalProgress = (id: string, newProgress: number) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === id) {
          const updatedGoal = {
            ...goal,
            current: Math.round((newProgress / 100) * goal.target),
            progress: newProgress,
          }

          // Check if goal is completed
          if (newProgress >= 100 && goal.status !== "completed") {
            updatedGoal.status = "completed"
            addNotification({
              title: "Goal Completed!",
              description: `Congratulations! You've completed your "${goal.title}" goal.`,
              type: "success",
              duration: 5000,
            })
          }

          return updatedGoal
        }
        return goal
      }),
    )
  }

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
    addNotification({
      title: "Goal Deleted",
      description: "Your goal has been deleted.",
      type: "info",
      duration: 3000,
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "waste":
        return <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
      case "recycling":
        return <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
      case "carbon":
        return <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
      default:
        return <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
    }
  }

  const filteredGoals = goals.filter((goal) => {
    if (activeTab === "active") return goal.status === "active"
    if (activeTab === "completed") return goal.status === "completed"
    return true
  })

  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
          <div>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Target className="mr-2 h-5 w-5" />
              Waste Reduction Goals
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Set and track your sustainability goals</CardDescription>
          </div>
          <Button size="sm" onClick={() => setShowNewGoalForm(!showNewGoalForm)} className="w-full sm:w-auto">
            {showNewGoalForm ? (
              "Cancel"
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                New Goal
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        {showNewGoalForm && (
          <Card className="mb-6 border-dashed">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Create New Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Goal Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Reduce Plastic Waste"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newGoal.category}
                      onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="waste">Waste Reduction</SelectItem>
                        <SelectItem value="recycling">Recycling</SelectItem>
                        <SelectItem value="carbon">Carbon Footprint</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="target">Target Amount</Label>
                    <Input
                      id="target"
                      type="number"
                      placeholder="e.g., 50"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={newGoal.unit} onValueChange={(value) => setNewGoal({ ...newGoal, unit: value })}>
                      <SelectTrigger id="unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="%">Percentage (%)</SelectItem>
                        <SelectItem value="items">Items</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCreateGoal}>
                Create Goal
              </Button>
            </CardFooter>
          </Card>
        )}

        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 w-full grid grid-cols-3">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Goals</TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            {filteredGoals.length === 0 ? (
              <div className="text-center py-8">
                <Trophy className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <h3 className="text-base sm:text-lg font-medium">No {activeTab} goals</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {activeTab === "active"
                    ? "Create a new goal to get started."
                    : "Complete some goals to see them here."}
                </p>
                {activeTab !== "active" && (
                  <Button variant="outline" className="mt-4" onClick={() => setActiveTab("active")}>
                    View Active Goals
                  </Button>
                )}
              </div>
            ) : (
              filteredGoals.map((goal) => (
                <Card
                  key={goal.id}
                  className={`border-l-4 ${goal.status === "completed" ? "border-l-green-500" : "border-l-primary"}`}
                >
                  <CardHeader className="pb-2 px-4 sm:px-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {getCategoryIcon(goal.category)}
                        <CardTitle className="text-sm sm:text-base ml-2">{goal.title}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        {goal.status === "completed" && (
                          <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Completed</span>
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8"
                          onClick={() => deleteGoal(goal.id)}
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6 pb-2">
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-2 sm:gap-0">
                        <div className="flex items-center">
                          <Target className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-1" />
                          <span>
                            Target: {goal.target} {goal.unit}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-1" />
                          <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>Progress</span>
                          <span>
                            {goal.current} / {goal.target} {goal.unit} ({goal.progress}%)
                          </span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>

                      {goal.status === "active" && (
                        <div className="pt-2">
                          <Label htmlFor={`update-${goal.id}`} className="text-xs sm:text-sm">
                            Update Progress
                          </Label>
                          <div className="flex items-center mt-1 space-x-2">
                            <Input
                              id={`update-${goal.id}`}
                              type="range"
                              min="0"
                              max="100"
                              step="5"
                              value={goal.progress}
                              onChange={(e) => updateGoalProgress(goal.id, Number.parseInt(e.target.value))}
                              className="flex-1"
                            />
                            <span className="text-xs sm:text-sm font-medium w-10 sm:w-12 text-right">
                              {goal.progress}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4 px-4 sm:px-6 text-xs sm:text-sm">
        <div className="text-muted-foreground">{goals.filter((g) => g.status === "active").length} active goals</div>
        <div className="text-muted-foreground">{goals.filter((g) => g.status === "completed").length} completed</div>
      </CardFooter>
    </Card>
  )
}
