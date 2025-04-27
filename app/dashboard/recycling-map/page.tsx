import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapView } from "@/components/map-view"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import { AuthCheck } from "@/components/auth/auth-check"

export default function RecyclingMapPage() {
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
                  <h2 className="text-2xl font-bold tracking-tight">Recycling Map</h2>
                  <p className="text-muted-foreground">Find recycling centers and waste collection points near you.</p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recycling Locations</CardTitle>
                  <CardDescription>Map of nearby recycling centers and waste collection points</CardDescription>
                </CardHeader>
                <CardContent>
                  <MapView />
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
