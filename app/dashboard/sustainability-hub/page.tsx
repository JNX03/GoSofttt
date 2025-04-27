import { SustainabilityHub } from "@/components/advanced-features/sustainability-hub"
import { CarbonOffsetMarketplace } from "@/components/advanced-features/carbon-offset-marketplace"
import { Leaf } from "lucide-react"

export default function SustainabilityHubPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <Leaf className="mr-2 h-6 w-6 text-green-500" />
          Sustainability Hub
        </h1>
        <p className="text-muted-foreground">
          Your all-in-one platform for sustainability management and environmental impact reduction
        </p>
      </div>

      <div className="grid gap-6">
        <SustainabilityHub />
        <CarbonOffsetMarketplace />
      </div>
    </div>
  )
}
