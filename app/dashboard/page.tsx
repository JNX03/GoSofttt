"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import { AuthCheck } from "@/components/auth/auth-check"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdvancedDashboard } from "@/components/analytics/advanced-dashboard"
import { EnhancedMapView } from "@/components/map/enhanced-map-view"
import { DocumentAnalyzer } from "@/components/ai/document-analyzer"
import { CampaignManager } from "@/components/marketing/campaign-manager"
import { CostCalculator } from "@/components/cost/cost-calculator"
import { CompanyAnalyzer } from "@/components/ai/company-analyzer"
import { BarChart3, Map, FileText, Megaphone, Calculator, Building, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <AuthCheck>
      <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
        {/* Mobile sidebar toggle */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden absolute top-4 left-4 z-50">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[240px]">
            <DashboardSidebar className="border-0" />
          </SheetContent>
        </Sheet>

        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <DashboardSidebar />
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto p-4 md:p-6 pt-14 lg:pt-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="overflow-x-auto pb-2">
                <TabsList className="grid min-w-max w-full grid-cols-3 md:grid-cols-6">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="map" className="flex items-center gap-2">
                    <Map className="h-4 w-4" />
                    <span className="hidden sm:inline">Recycling Map</span>
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Document Analysis</span>
                  </TabsTrigger>
                  <TabsTrigger value="campaigns" className="flex items-center gap-2">
                    <Megaphone className="h-4 w-4" />
                    <span className="hidden sm:inline">Campaigns</span>
                  </TabsTrigger>
                  <TabsTrigger value="calculator" className="flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    <span className="hidden sm:inline">Cost Calculator</span>
                  </TabsTrigger>
                  <TabsTrigger value="companies" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span className="hidden sm:inline">Companies</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="mt-2">
                <AdvancedDashboard />
              </TabsContent>

              <TabsContent value="map" className="mt-2">
                <EnhancedMapView />
              </TabsContent>

              <TabsContent value="documents" className="mt-2">
                <DocumentAnalyzer />
              </TabsContent>

              <TabsContent value="campaigns" className="mt-2">
                <CampaignManager />
              </TabsContent>

              <TabsContent value="calculator" className="mt-2">
                <CostCalculator />
              </TabsContent>

              <TabsContent value="companies" className="mt-2">
                <CompanyAnalyzer />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <ChatbotButton />
      </div>
    </AuthCheck>
  )
}
