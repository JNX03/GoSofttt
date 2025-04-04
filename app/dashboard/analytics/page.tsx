import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { WasteStats } from "@/components/dashboard/waste-stats"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import { AuthCheck } from "@/components/auth/auth-check"

export default function AnalyticsPage() {
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
                  <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
                  <p className="text-muted-foreground">
                    Detailed insights into your waste management and environmental impact.
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Waste Management Overview</CardTitle>
                  <CardDescription>Monthly waste and recycling trends</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>

              <WasteStats />
            </div>
          </div>
        </div>
        <ChatbotButton />
      </div>
    </AuthCheck>
  )
}

