import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskList } from "@/components/task-list"
import { NotificationCard } from "@/components/notification-card"
import { Bell, Calendar } from "lucide-react"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import { AuthCheck } from "@/components/auth/auth-check"

export default function CollectionPage() {
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
                  <h2 className="text-2xl font-bold tracking-tight">Waste Collection</h2>
                  <p className="text-muted-foreground">Schedule and track your waste collection tasks.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <NotificationCard
                  icon={<Bell className="h-5 w-5 text-blue-500" />}
                  bgColor="bg-blue-50"
                  iconBgColor="bg-blue-100"
                  title="Next Collection"
                  subtitle="Tomorrow at 10:00 AM"
                />
                <NotificationCard
                  icon={<Calendar className="h-5 w-5 text-green-500" />}
                  bgColor="bg-green-50"
                  iconBgColor="bg-green-100"
                  title="Scheduled Collections"
                  subtitle="3 upcoming collections"
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Collection Tasks</CardTitle>
                  <CardDescription>Your upcoming and recent waste collection tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <TaskList />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <ChatbotButton />
      </div>
    </AuthCheck>
  )
}

