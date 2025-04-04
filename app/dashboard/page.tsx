import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import { AuthCheck } from "@/components/auth/auth-check"

export default function DashboardPage() {
  return (
    <AuthCheck>
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardHeader />
          <DashboardContent />
        </div>
        <ChatbotButton />
      </div>
    </AuthCheck>
  )
}

