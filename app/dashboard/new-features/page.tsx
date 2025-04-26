"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MaterialScanner } from "@/components/material-scanner"
import { GoalTracker } from "@/components/goal-tracker"
import { CommunityLeaderboard } from "@/components/community-leaderboard"
import { CollectionScheduler } from "@/components/collection-scheduler"
import { EducationHub } from "@/components/education-hub"
import { Sparkles } from "lucide-react"

export default function NewFeaturesPage() {
  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-primary" />
          New Features
        </h1>
        <p className="text-muted-foreground">
          Explore our latest features designed to enhance your recycling and sustainability experience.
        </p>
      </div>

      <Tabs defaultValue="scanner" className="w-full">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="scanner">Material Scanner</TabsTrigger>
          <TabsTrigger value="goals">Goal Tracker</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="scheduler">Collection Scheduler</TabsTrigger>
          <TabsTrigger value="education">Education Hub</TabsTrigger>
        </TabsList>

        <TabsContent value="scanner">
          <MaterialScanner />
        </TabsContent>

        <TabsContent value="goals">
          <GoalTracker />
        </TabsContent>

        <TabsContent value="leaderboard">
          <CommunityLeaderboard />
        </TabsContent>

        <TabsContent value="scheduler">
          <CollectionScheduler />
        </TabsContent>

        <TabsContent value="education">
          <EducationHub />
        </TabsContent>
      </Tabs>
    </div>
  )
}
