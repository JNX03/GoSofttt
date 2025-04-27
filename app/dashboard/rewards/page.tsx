import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, Recycle, Coins } from "lucide-react"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import { AuthCheck } from "@/components/auth/auth-check"

export default function RewardsPage() {
  return (
    <AuthCheck>
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <div className="flex flex-col space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Rewards</h2>
                  <p className="text-muted-foreground">Earn rewards for your recycling efforts.</p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Your Rewards</CardTitle>
                  <CardDescription>Current points and rewards status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-primary/10 rounded-full p-6">
                      <Award className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold">218 Points</h3>
                    <p className="text-muted-foreground">You've earned 42 points this month</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Next Reward: 1 TD Token (500 points)</span>
                        <span className="text-sm font-medium">218/500</span>
                      </div>
                      <Progress value={43.6} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Rewards</CardTitle>
                    <CardDescription>Rewards you can redeem with your points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-amber-100 p-2 rounded-full">
                          <Coins className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">1 TD Token</h4>
                          <p className="text-xs text-muted-foreground">500 points</p>
                          <p className="text-sm font-medium text-green-600 mt-1">Value: 500 baht</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Earn More Points</CardTitle>
                    <CardDescription>Ways to earn more reward points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Recycle className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Recycle Plastic</h4>
                          <p className="text-xs text-muted-foreground">5 points per kg</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Recycle className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Recycle Paper</h4>
                          <p className="text-xs text-muted-foreground">3 points per kg</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Recycle className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Recycle Glass</h4>
                          <p className="text-xs text-muted-foreground">4 points per kg</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <ChatbotButton />
      </div>
    </AuthCheck>
  )
}
