import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart } from "@/components/pie-chart"
import { TaskList } from "@/components/task-list"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import { AuthCheck } from "@/components/auth/auth-check"

export default function WasteManagementPage() {
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
                  <h2 className="text-2xl font-bold tracking-tight">Waste Management</h2>
                  <p className="text-muted-foreground">Track and manage your waste collection and recycling efforts.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Waste Composition</CardTitle>
                    <CardDescription>Breakdown of your waste by material type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PieChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Waste Collection Tasks</CardTitle>
                    <CardDescription>Your upcoming and recent waste collection tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TaskList />
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
