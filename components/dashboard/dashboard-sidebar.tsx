import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Logo } from "@/components/ui/logo"
import { BarChart3, Home, Leaf, Map, Recycle, Settings, Trash2, Award } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSidebar({ className }: SidebarProps) {
  return (
    <div className={cn("flex flex-col h-screen border-r", className)}>
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard">
          <Logo />
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 px-2 py-4">
          <Link href="/dashboard" passHref legacyBehavior>
            <Button variant="ghost" className="justify-start gap-2 font-normal" asChild>
              <a>
                <Home className="h-4 w-4" />
                Dashboard
              </a>
            </Button>
          </Link>
          <Link href="/dashboard/waste-management" passHref legacyBehavior>
            <Button variant="ghost" className="justify-start gap-2 font-normal" asChild>
              <a>
                <Recycle className="h-4 w-4" />
                Waste Management
              </a>
            </Button>
          </Link>
          <Link href="/dashboard/carbon-tracking" passHref legacyBehavior>
            <Button variant="ghost" className="justify-start gap-2 font-normal" asChild>
              <a>
                <Leaf className="h-4 w-4" />
                Carbon Tracking
              </a>
            </Button>
          </Link>
          <Link href="/dashboard/analytics" passHref legacyBehavior>
            <Button variant="ghost" className="justify-start gap-2 font-normal" asChild>
              <a>
                <BarChart3 className="h-4 w-4" />
                Analytics
              </a>
            </Button>
          </Link>
          <Link href="/dashboard/recycling-map" passHref legacyBehavior>
            <Button variant="ghost" className="justify-start gap-2 font-normal" asChild>
              <a>
                <Map className="h-4 w-4" />
                Recycling Map
              </a>
            </Button>
          </Link>
          <Link href="/dashboard/collection" passHref legacyBehavior>
            <Button variant="ghost" className="justify-start gap-2 font-normal" asChild>
              <a>
                <Trash2 className="h-4 w-4" />
                Waste Collection
              </a>
            </Button>
          </Link>
          <Link href="/dashboard/rewards" passHref legacyBehavior>
            <Button variant="ghost" className="justify-start gap-2 font-normal" asChild>
              <a>
                <Award className="h-4 w-4" />
                Rewards
              </a>
            </Button>
          </Link>
          <Link href="/dashboard/settings" passHref legacyBehavior>
            <Button variant="ghost" className="justify-start gap-2 font-normal" asChild>
              <a>
                <Settings className="h-4 w-4" />
                Settings
              </a>
            </Button>
          </Link>
        </nav>
      </ScrollArea>
    </div>
  )
}

