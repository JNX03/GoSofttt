"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const carbonData = [
  {
    name: "Jan",
    "CO2 Reduced": 10,
  },
  {
    name: "Feb",
    "CO2 Reduced": 15,
  },
  {
    name: "Mar",
    "CO2 Reduced": 20,
  },
  {
    name: "Apr",
    "CO2 Reduced": 25,
  },
  {
    name: "May",
    "CO2 Reduced": 18,
  },
  {
    name: "Jun",
    "CO2 Reduced": 22,
  },
  {
    name: "Jul",
    "CO2 Reduced": 30,
  },
  {
    name: "Aug",
    "CO2 Reduced": 35,
  },
  {
    name: "Sep",
    "CO2 Reduced": 40,
  },
  {
    name: "Oct",
    "CO2 Reduced": 45,
  },
  {
    name: "Nov",
    "CO2 Reduced": 50,
  },
  {
    name: "Dec",
    "CO2 Reduced": 55,
  },
]

export function CarbonImpact() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Carbon Reduction Over Time</CardTitle>
          <CardDescription>Track your CO2 emissions reduction progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={carbonData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}kg`}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="CO2 Reduced"
                  stroke="#4ade80"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Carbon Reduction Goal</CardTitle>
          <CardDescription>Progress towards your annual carbon reduction target</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Annual Goal: 200kg CO2</span>
                <span className="text-sm font-medium">145kg / 200kg</span>
              </div>
              <Progress value={72.5} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">
              You're on track to meet your annual carbon reduction goal. Keep up the good work!
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Environmental Impact</CardTitle>
          <CardDescription>The positive impact of your carbon reduction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-2 rounded-full">
                <div className="h-4 w-4 text-green-500">🌳</div>
              </div>
              <div>
                <h4 className="text-sm font-medium">Equivalent to planting 7 trees</h4>
                <p className="text-sm text-muted-foreground">
                  Your carbon reduction is equivalent to the CO2 absorption of 7 trees over a year.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-2 rounded-full">
                <div className="h-4 w-4 text-green-500">🚗</div>
              </div>
              <div>
                <h4 className="text-sm font-medium">580 km not driven</h4>
                <p className="text-sm text-muted-foreground">
                  Your carbon reduction is equivalent to not driving 580 km in an average car.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-2 rounded-full">
                <div className="h-4 w-4 text-green-500">💡</div>
              </div>
              <div>
                <h4 className="text-sm font-medium">240 hours of energy saved</h4>
                <p className="text-sm text-muted-foreground">
                  Your carbon reduction is equivalent to turning off a light bulb for 240 hours.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

