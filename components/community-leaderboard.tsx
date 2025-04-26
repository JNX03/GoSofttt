"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Award, Users, Search, ArrowUp, ArrowDown, Medal, Trophy } from "lucide-react"
import { useNotification } from "@/components/ui/notification-toast"

export function CommunityLeaderboard() {
  const [activeTab, setActiveTab] = useState("weekly")
  const [searchQuery, setSearchQuery] = useState("")
  const [leaderboardData, setLeaderboardData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userRank, setUserRank] = useState<number | null>(null)
  const { addNotification } = useNotification()

  // Sample user data
  const currentUser = {
    id: "user123",
    name: "Jnxinwza007",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 1250,
    recycled: 85,
    badges: ["Early Adopter", "Recycling Pro"],
  }

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchLeaderboardData = async () => {
      setIsLoading(true)

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Generate sample leaderboard data
        const sampleData = generateSampleData(activeTab)
        setLeaderboardData(sampleData)

        // Find current user's rank
        const userRankIndex = sampleData.findIndex((user) => user.id === currentUser.id)
        setUserRank(userRankIndex !== -1 ? userRankIndex + 1 : null)
      } catch (error) {
        console.error("Error fetching leaderboard data:", error)
        addNotification({
          title: "Error",
          description: "Failed to load leaderboard data. Please try again.",
          type: "error",
          duration: 5000,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboardData()
  }, [activeTab, addNotification])

  // Generate sample leaderboard data
  const generateSampleData = (period: string) => {
    const baseUsers = [
      {
        id: "user1",
        name: "EcoWarrior",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 2450,
        recycled: 120,
        change: 2,
      },
      {
        id: "user2",
        name: "GreenHero",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 2100,
        recycled: 105,
        change: 0,
      },
      {
        id: "user3",
        name: "RecycleKing",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 1950,
        recycled: 98,
        change: 1,
      },
      {
        id: "user4",
        name: "EarthSaver",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 1800,
        recycled: 90,
        change: -2,
      },
      {
        id: "user5",
        name: "GreenThumb",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 1650,
        recycled: 82,
        change: 3,
      },
      {
        id: "user123",
        name: "Jnxinwza007",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 1250,
        recycled: 85,
        change: -1,
      },
      {
        id: "user6",
        name: "EcoFriend",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 1100,
        recycled: 75,
        change: 0,
      },
      {
        id: "user7",
        name: "PlanetProtector",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 950,
        recycled: 68,
        change: 2,
      },
      {
        id: "user8",
        name: "WasteWarrior",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 800,
        recycled: 60,
        change: 1,
      },
      {
        id: "user9",
        name: "RecycleHero",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 750,
        recycled: 55,
        change: -3,
      },
      {
        id: "user10",
        name: "GreenChampion",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 700,
        recycled: 50,
        change: 0,
      },
    ]

    // Adjust data based on period
    if (period === "monthly") {
      return baseUsers.map((user) => ({
        ...user,
        points: Math.round(user.points * 4.2),
        recycled: Math.round(user.recycled * 4),
      }))
    } else if (period === "alltime") {
      return baseUsers.map((user) => ({
        ...user,
        points: Math.round(user.points * 12.5),
        recycled: Math.round(user.recycled * 12),
        change: 0, // No change for all-time
      }))
    }

    return baseUsers
  }

  // Filter leaderboard data based on search query
  const filteredData = leaderboardData.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Get medal icon based on rank
  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <Users className="mr-2 h-5 w-5" />
          Community Recycling Leaderboard
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          See how you rank against other recyclers in your community
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Tabs defaultValue="weekly" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="w-full grid grid-cols-3 sm:w-auto sm:flex">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="alltime">All Time</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative w-full sm:w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="rounded-md border overflow-x-auto">
                <div className="min-w-[600px]">
                  <div className="grid grid-cols-12 gap-2 p-3 sm:p-4 font-medium border-b bg-muted/50 text-xs sm:text-sm">
                    <div className="col-span-1 text-center">#</div>
                    <div className="col-span-5 sm:col-span-4">User</div>
                    <div className="col-span-3 text-right">Points</div>
                    <div className="col-span-3 sm:col-span-3 text-right">Recycled (kg)</div>
                    <div className="hidden sm:block sm:col-span-1 text-center">Change</div>
                  </div>

                  <div className="divide-y">
                    {filteredData.length > 0 ? (
                      filteredData.map((user, index) => (
                        <div
                          key={user.id}
                          className={`grid grid-cols-12 gap-2 p-3 sm:p-4 items-center text-xs sm:text-sm ${user.id === currentUser.id ? "bg-primary/5" : ""}`}
                        >
                          <div className="col-span-1 text-center flex justify-center">
                            {getMedalIcon(index + 1) || <span>{index + 1}</span>}
                          </div>
                          <div className="col-span-5 sm:col-span-4 flex items-center gap-2">
                            <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium truncate max-w-[120px] sm:max-w-none">{user.name}</div>
                              {user.id === currentUser.id && (
                                <Badge variant="outline" className="text-[10px] sm:text-xs">
                                  You
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="col-span-3 text-right font-medium">{user.points.toLocaleString()}</div>
                          <div className="col-span-3 sm:col-span-3 text-right">{user.recycled.toLocaleString()} kg</div>
                          <div className="hidden sm:flex sm:col-span-1 justify-center">
                            {user.change > 0 ? (
                              <div className="flex items-center text-green-500">
                                <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                <span>{user.change}</span>
                              </div>
                            ) : user.change < 0 ? (
                              <div className="flex items-center text-red-500">
                                <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                <span>{Math.abs(user.change)}</span>
                              </div>
                            ) : (
                              <span>-</span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">No users found matching your search.</div>
                    )}
                  </div>
                </div>
              </div>

              {userRank && (
                <div className="bg-primary/10 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-primary">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm sm:text-base">Your Ranking</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          Keep recycling to climb the leaderboard!
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-bold">#{userRank}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        {activeTab === "weekly" ? "This Week" : activeTab === "monthly" ? "This Month" : "All Time"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 border-t pt-4 px-4 sm:px-6">
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => {
            addNotification({
              title: "Leaderboard Updated",
              description: "The leaderboard has been refreshed with the latest data.",
              type: "success",
              duration: 3000,
            })

            // Simulate refreshing data
            setIsLoading(true)
            setTimeout(() => {
              const refreshedData = generateSampleData(activeTab)
              setLeaderboardData(refreshedData)
              setIsLoading(false)
            }, 1000)
          }}
        >
          Refresh
        </Button>
        <Button size="sm" className="w-full sm:w-auto">
          <Award className="mr-2 h-4 w-4" />
          View Rewards
        </Button>
      </CardFooter>
    </Card>
  )
}
