"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import { AuthCheck } from "@/components/auth/auth-check"
import { SettingsContent } from "@/components/dashboard/settings-content"

export default function SettingsPage() {
  return (
    <AuthCheck>
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardHeader />
          <SettingsContent />
        </div>
        <ChatbotButton />
      </div>
    </AuthCheck>
  )
}

