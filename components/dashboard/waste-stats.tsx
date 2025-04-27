"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const wasteData = [
  { name: "Plastic", value: 35, color: "#3b82f6" },
  { name: "Paper", value: 25, color: "#22c55e" },
  { name: "Glass", value: 15, color: "#eab308" },
  { name: "Metal", value: 10, color: "#ef4444" },
  { name: "Organic", value: 10, color: "#8b5cf6" },
  { name: "Other", value: 5, color: "#94a3b8" },
]

const recyclingData = [
  { name: "Recycled", value: 65, color: "#22c55e" },
  { name: "Non-recycled", value: 35, color: "#ef4444" },
]

export function WasteStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Waste Composition</CardTitle>
          <CardDescription>Breakdown of your waste by material type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {wasteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Recycling Rate</CardTitle>
          <CardDescription>Percentage of waste that was recycled</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={recyclingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {recyclingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Waste Management Tips</CardTitle>
          <CardDescription>Recommendations to improve your recycling habits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-2 rounded-full">
                <div className="h-4 w-4 text-green-500">1</div>
              </div>
              <div>
                <h4 className="text-sm font-medium">Reduce plastic usage</h4>
                <p className="text-sm text-muted-foreground">
                  Consider using reusable containers and bags to reduce plastic waste.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-2 rounded-full">
                <div className="h-4 w-4 text-green-500">2</div>
              </div>
              <div>
                <h4 className="text-sm font-medium">Separate recyclables</h4>
                <p className="text-sm text-muted-foreground">
                  Make sure to separate recyclable materials from general waste.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-2 rounded-full">
                <div className="h-4 w-4 text-green-500">3</div>
              </div>
              <div>
                <h4 className="text-sm font-medium">Compost organic waste</h4>
                <p className="text-sm text-muted-foreground">
                  Consider composting food scraps and yard waste to reduce landfill waste.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
