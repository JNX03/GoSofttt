"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { ArrowUpRight, ArrowDownRight, TrendingDown, BarChart3, PieChartIcon, LineChartIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data - in a real app, this would come from an API
const monthlyData = [
  { month: "Jan", recycled: 65, waste: 45, cost: 120, savings: 30 },
  { month: "Feb", recycled: 59, waste: 40, cost: 110, savings: 35 },
  { month: "Mar", recycled: 80, waste: 35, cost: 105, savings: 45 },
  { month: "Apr", recycled: 81, waste: 30, cost: 95, savings: 50 },
  { month: "May", recycled: 56, waste: 25, cost: 90, savings: 40 },
  { month: "Jun", recycled: 55, waste: 20, cost: 85, savings: 45 },
  { month: "Jul", recycled: 40, waste: 15, cost: 80, savings: 35 },
  { month: "Aug", recycled: 70, waste: 25, cost: 90, savings: 55 },
  { month: "Sep", recycled: 90, waste: 30, cost: 100, savings: 65 },
  { month: "Oct", recycled: 95, waste: 35, cost: 105, savings: 70 },
  { month: "Nov", recycled: 85, waste: 25, cost: 95, savings: 60 },
  { month: "Dec", recycled: 100, waste: 20, cost: 90, savings: 75 },
]

const wasteComposition = [
  { name: "Plastic", value: 35, color: "#3b82f6" },
  { name: "Paper", value: 25, color: "#22c55e" },
  { name: "Glass", value: 15, color: "#eab308" },
  { name: "Metal", value: 10, color: "#ef4444" },
  { name: "Organic", value: 10, color: "#8b5cf6" },
  { name: "Other", value: 5, color: "#94a3b8" },
]

const competitorComparison = [
  { name: "EcoTrack", recyclingRate: 75, costEfficiency: 85, userSatisfaction: 90 },
  { name: "GreenWaste", recyclingRate: 65, costEfficiency: 70, userSatisfaction: 75 },
  { name: "RecycleNow", recyclingRate: 70, costEfficiency: 60, userSatisfaction: 80 },
  { name: "EcoSmart", recyclingRate: 60, costEfficiency: 75, userSatisfaction: 65 },
]

const costBreakdown = [
  { name: "Collection", value: 40, color: "#3b82f6" },
  { name: "Processing", value: 25, color: "#22c55e" },
  { name: "Transportation", value: 20, color: "#eab308" },
  { name: "Administration", value: 15, color: "#ef4444" },
]

export function AdvancedDashboard() {
  const [timeRange, setTimeRange] = useState("year")
  const [dataType, setDataType] = useState("volume")

  // Calculate metrics
  const totalRecycled = monthlyData.reduce((sum, item) => sum + item.recycled, 0)
  const totalWaste = monthlyData.reduce((sum, item) => sum + item.waste, 0)
  const totalCost = monthlyData.reduce((sum, item) => sum + item.cost, 0)
  const totalSavings = monthlyData.reduce((sum, item) => sum + item.savings, 0)

  // Calculate percentage changes (comparing to previous period)
  const recycledChange = 12.5 // In a real app, this would be calculated
  const wasteChange = -8.3
  const costChange = -5.2
  const savingsChange = 15.7

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Advanced Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis of your waste management and sustainability metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dataType} onValueChange={setDataType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select data type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="volume">Volume (kg)</SelectItem>
              <SelectItem value="cost">Cost (฿)</SelectItem>
              <SelectItem value="carbon">Carbon Impact</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recycled</CardTitle>
            <div className={`${recycledChange >= 0 ? "text-green-500" : "text-red-500"} flex items-center`}>
              {recycledChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {Math.abs(recycledChange)}%
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecycled} kg</div>
            <p className="text-xs text-muted-foreground">Compared to previous period</p>
            <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-green-500 h-1 rounded-full" style={{ width: `${(recycledChange + 100) / 2}%` }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Waste</CardTitle>
            <div className={`${wasteChange <= 0 ? "text-green-500" : "text-red-500"} flex items-center`}>
              {wasteChange <= 0 ? (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              )}
              {Math.abs(wasteChange)}%
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWaste} kg</div>
            <p className="text-xs text-muted-foreground">Compared to previous period</p>
            <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-1 rounded-full"
                style={{ width: `${(Math.abs(wasteChange) + 100) / 2}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <div className={`${costChange <= 0 ? "text-green-500" : "text-red-500"} flex items-center`}>
              {costChange <= 0 ? (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              )}
              {Math.abs(costChange)}%
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿{totalCost}</div>
            <p className="text-xs text-muted-foreground">Compared to previous period</p>
            <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-1 rounded-full"
                style={{ width: `${(Math.abs(costChange) + 100) / 2}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <div className={`${savingsChange >= 0 ? "text-green-500" : "text-red-500"} flex items-center`}>
              {savingsChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {Math.abs(savingsChange)}%
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿{totalSavings}</div>
            <p className="text-xs text-muted-foreground">Compared to previous period</p>
            <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-green-500 h-1 rounded-full" style={{ width: `${(savingsChange + 100) / 2}%` }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <LineChartIcon className="h-4 w-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="composition" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            Composition
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Comparison
          </TabsTrigger>
          <TabsTrigger value="cost" className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4" />
            Cost Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recycling and Waste Trends</CardTitle>
              <CardDescription>Monthly trends of recycled materials vs. waste</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRecycled" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="recycled"
                      stroke="#22c55e"
                      fillOpacity={1}
                      fill="url(#colorRecycled)"
                      name="Recycled (kg)"
                    />
                    <Area
                      type="monotone"
                      dataKey="waste"
                      stroke="#ef4444"
                      fillOpacity={1}
                      fill="url(#colorWaste)"
                      name="Waste (kg)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost and Savings Analysis</CardTitle>
              <CardDescription>Monthly cost vs. savings from recycling initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cost" stroke="#ef4444" name="Cost (฿)" strokeWidth={2} />
                    <Line type="monotone" dataKey="savings" stroke="#22c55e" name="Savings (฿)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="composition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Waste Composition</CardTitle>
              <CardDescription>Breakdown of waste by material type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={wasteComposition}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {wasteComposition.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Comparison</CardTitle>
              <CardDescription>How EcoTrack compares to other waste management services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={competitorComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="recyclingRate" name="Recycling Rate (%)" fill="#22c55e" />
                    <Bar dataKey="costEfficiency" name="Cost Efficiency (%)" fill="#3b82f6" />
                    <Bar dataKey="userSatisfaction" name="User Satisfaction (%)" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cost" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown</CardTitle>
                <CardDescription>Where your waste management budget goes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {costBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Optimization Opportunities</CardTitle>
                <CardDescription>Potential areas for cost reduction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Collection Frequency Optimization</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <span className="text-green-500 font-medium">High</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Material Sorting Efficiency</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                    <span className="text-green-500 font-medium">Medium</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Transportation Route Optimization</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                    <span className="text-amber-500 font-medium">Medium</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Administrative Process Streamlining</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                      </div>
                    </div>
                    <span className="text-amber-500 font-medium">Low</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
