"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Download, Share2, Calculator, Recycle, Trash2, DollarSign, BarChart3 } from "lucide-react"

export function CostCalculator() {
  // State for calculator inputs
  const [wasteVolume, setWasteVolume] = useState(500) // kg per month
  const [wasteType, setWasteType] = useState("mixed")
  const [collectionFrequency, setCollectionFrequency] = useState("weekly")
  const [recyclingRate, setRecyclingRate] = useState(30) // percentage
  const [includeTransportation, setIncludeTransportation] = useState(true)
  const [includeProcessing, setIncludeProcessing] = useState(true)
  const [includeDisposal, setIncludeDisposal] = useState(true)
  const [includeAdministration, setIncludeAdministration] = useState(true)

  // State for calculated costs
  const [currentCosts, setCurrentCosts] = useState({
    total: 0,
    collection: 0,
    transportation: 0,
    processing: 0,
    disposal: 0,
    administration: 0,
  })

  const [optimizedCosts, setOptimizedCosts] = useState({
    total: 0,
    collection: 0,
    transportation: 0,
    processing: 0,
    disposal: 0,
    administration: 0,
    savings: 0,
    savingsPercentage: 0,
  })

  // Calculate costs based on inputs
  useEffect(() => {
    // Base rates (per kg)
    const rates = {
      mixed: {
        collection: 0.15,
        transportation: 0.08,
        processing: 0.12,
        disposal: 0.1,
        administration: 0.05,
      },
      organic: {
        collection: 0.12,
        transportation: 0.07,
        processing: 0.15,
        disposal: 0.08,
        administration: 0.05,
      },
      recyclable: {
        collection: 0.18,
        transportation: 0.09,
        processing: 0.2,
        disposal: 0.05,
        administration: 0.05,
      },
      hazardous: {
        collection: 0.25,
        transportation: 0.15,
        processing: 0.3,
        disposal: 0.2,
        administration: 0.1,
      },
    }

    // Frequency multipliers
    const frequencyMultiplier = {
      daily: 1.5,
      weekly: 1.0,
      biweekly: 0.8,
      monthly: 0.6,
    }

    // Calculate current costs
    const baseRates = rates[wasteType as keyof typeof rates]
    const multiplier = frequencyMultiplier[collectionFrequency as keyof typeof frequencyMultiplier]

    const collection = wasteVolume * baseRates.collection * multiplier * (includeTransportation ? 1 : 0)
    const transportation = wasteVolume * baseRates.transportation * multiplier * (includeTransportation ? 1 : 0)
    const processing = wasteVolume * baseRates.processing * (includeProcessing ? 1 : 0)
    const disposal = wasteVolume * baseRates.disposal * (includeDisposal ? 1 : 0)
    const administration = wasteVolume * baseRates.administration * (includeAdministration ? 1 : 0)

    const total = collection + transportation + processing + disposal + administration

    setCurrentCosts({
      total,
      collection,
      transportation,
      processing,
      disposal,
      administration,
    })

    // Calculate optimized costs (with increased recycling)
    const recyclingFactor = 1 - recyclingRate / 100
    const optimizedDisposal = disposal * recyclingFactor
    const optimizedProcessing = processing * 1.1 // Slightly higher processing costs for recycling
    const optimizedTransportation = transportation * 0.9 // Optimized routes

    const optimizedTotal =
      collection + optimizedTransportation + optimizedProcessing + optimizedDisposal + administration
    const savings = total - optimizedTotal
    const savingsPercentage = (savings / total) * 100

    setOptimizedCosts({
      total: optimizedTotal,
      collection,
      transportation: optimizedTransportation,
      processing: optimizedProcessing,
      disposal: optimizedDisposal,
      administration,
      savings,
      savingsPercentage,
    })
  }, [
    wasteVolume,
    wasteType,
    collectionFrequency,
    recyclingRate,
    includeTransportation,
    includeProcessing,
    includeDisposal,
    includeAdministration,
  ])

  // Prepare data for charts
  const currentCostBreakdown = [
    { name: "Collection", value: currentCosts.collection, color: "#3b82f6" },
    { name: "Transportation", value: currentCosts.transportation, color: "#22c55e" },
    { name: "Processing", value: currentCosts.processing, color: "#eab308" },
    { name: "Disposal", value: currentCosts.disposal, color: "#ef4444" },
    { name: "Administration", value: currentCosts.administration, color: "#8b5cf6" },
  ].filter((item) => item.value > 0)

  const optimizedCostBreakdown = [
    { name: "Collection", value: optimizedCosts.collection, color: "#3b82f6" },
    { name: "Transportation", value: optimizedCosts.transportation, color: "#22c55e" },
    { name: "Processing", value: optimizedCosts.processing, color: "#eab308" },
    { name: "Disposal", value: optimizedCosts.disposal, color: "#ef4444" },
    { name: "Administration", value: optimizedCosts.administration, color: "#8b5cf6" },
  ].filter((item) => item.value > 0)

  const comparisonData = [
    { name: "Current", value: currentCosts.total, color: "#ef4444" },
    { name: "Optimized", value: optimizedCosts.total, color: "#22c55e" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Cost Calculator</h2>
          <p className="text-muted-foreground">Calculate and optimize your waste management costs</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calculator Inputs</CardTitle>
              <CardDescription>Adjust parameters to calculate costs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Waste Volume: {wasteVolume} kg/month</Label>
                </div>
                <Slider
                  value={[wasteVolume]}
                  min={100}
                  max={5000}
                  step={100}
                  onValueChange={(value) => setWasteVolume(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="waste-type">Waste Type</Label>
                <Select value={wasteType} onValueChange={setWasteType}>
                  <SelectTrigger id="waste-type">
                    <SelectValue placeholder="Select waste type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mixed">Mixed Waste</SelectItem>
                    <SelectItem value="organic">Organic Waste</SelectItem>
                    <SelectItem value="recyclable">Recyclable Materials</SelectItem>
                    <SelectItem value="hazardous">Hazardous Waste</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="collection-frequency">Collection Frequency</Label>
                <Select value={collectionFrequency} onValueChange={setCollectionFrequency}>
                  <SelectTrigger id="collection-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Recycling Rate: {recyclingRate}%</Label>
                </div>
                <Slider
                  value={[recyclingRate]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) => setRecyclingRate(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label>Include Cost Components</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="include-transportation"
                      checked={includeTransportation}
                      onCheckedChange={setIncludeTransportation}
                    />
                    <Label htmlFor="include-transportation">Transportation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="include-processing"
                      checked={includeProcessing}
                      onCheckedChange={setIncludeProcessing}
                    />
                    <Label htmlFor="include-processing">Processing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="include-disposal" checked={includeDisposal} onCheckedChange={setIncludeDisposal} />
                    <Label htmlFor="include-disposal">Disposal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="include-administration"
                      checked={includeAdministration}
                      onCheckedChange={setIncludeAdministration}
                    />
                    <Label htmlFor="include-administration">Administration</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cost Analysis</CardTitle>
              <CardDescription>Current vs. optimized waste management costs</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="summary" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="summary" className="flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Summary
                  </TabsTrigger>
                  <TabsTrigger value="breakdown" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Breakdown
                  </TabsTrigger>
                  <TabsTrigger value="comparison" className="flex items-center gap-2">
                    <Recycle className="h-4 w-4" />
                    Comparison
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-muted p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium">Current Cost</h3>
                          <p className="text-sm text-muted-foreground">Based on current parameters</p>
                        </div>
                        <Trash2 className="h-8 w-8 text-destructive opacity-70" />
                      </div>
                      <div className="text-3xl font-bold mb-2">฿{currentCosts.total.toFixed(2)}</div>
                      <p className="text-sm text-muted-foreground">per month</p>

                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Collection</span>
                          <span>฿{currentCosts.collection.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Transportation</span>
                          <span>฿{currentCosts.transportation.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Processing</span>
                          <span>฿{currentCosts.processing.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Disposal</span>
                          <span>฿{currentCosts.disposal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Administration</span>
                          <span>฿{currentCosts.administration.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted p-6 rounded-lg border-green-500 border">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium">Optimized Cost</h3>
                          <p className="text-sm text-muted-foreground">With recycling and optimization</p>
                        </div>
                        <Recycle className="h-8 w-8 text-green-500" />
                      </div>
                      <div className="text-3xl font-bold mb-2 text-green-500">฿{optimizedCosts.total.toFixed(2)}</div>
                      <p className="text-sm text-muted-foreground">per month</p>

                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Collection</span>
                          <span>฿{optimizedCosts.collection.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Transportation</span>
                          <span>฿{optimizedCosts.transportation.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Processing</span>
                          <span>฿{optimizedCosts.processing.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Disposal</span>
                          <span>฿{optimizedCosts.disposal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Administration</span>
                          <span>฿{optimizedCosts.administration.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <DollarSign className="h-8 w-8 text-green-500 mr-4" />
                      <div>
                        <h3 className="font-medium">Potential Monthly Savings</h3>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold text-green-600 mr-2">
                            ฿{optimizedCosts.savings.toFixed(2)}
                          </span>
                          <span className="text-green-600">
                            ({optimizedCosts.savingsPercentage.toFixed(1)}% reduction)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      <div>
                        <h4 className="text-sm font-medium">Annual Savings</h4>
                        <p className="text-lg font-bold text-green-600">฿{(optimizedCosts.savings * 12).toFixed(2)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">5-Year Savings</h4>
                        <p className="text-lg font-bold text-green-600">
                          ฿{(optimizedCosts.savings * 12 * 5).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Environmental Impact</h4>
                        <p className="text-sm">
                          {(wasteVolume * (recyclingRate / 100) * 0.5).toFixed(1)} kg CO₂ reduction/month
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="breakdown" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Current Cost Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={currentCostBreakdown}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {currentCostBreakdown.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => [`฿${Number(value).toFixed(2)}`, "Cost"]} />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Optimized Cost Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={optimizedCostBreakdown}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {optimizedCostBreakdown.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => [`฿${Number(value).toFixed(2)}`, "Cost"]} />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Cost Component Comparison</CardTitle>
                      <CardDescription>Current vs. Optimized costs by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Collection</span>
                            <div className="flex gap-4">
                              <span>฿{currentCosts.collection.toFixed(2)}</span>
                              <span className="text-green-500">฿{optimizedCosts.collection.toFixed(2)}</span>
                              <span className="text-muted-foreground">
                                {(
                                  ((optimizedCosts.collection - currentCosts.collection) / currentCosts.collection) *
                                  100
                                ).toFixed(1)}
                                %
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-blue-500 h-2.5" style={{ width: "100%" }}></div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="bg-green-500 h-2.5"
                              style={{ width: `${(optimizedCosts.collection / currentCosts.collection) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Transportation</span>
                            <div className="flex gap-4">
                              <span>฿{currentCosts.transportation.toFixed(2)}</span>
                              <span className="text-green-500">฿{optimizedCosts.transportation.toFixed(2)}</span>
                              <span className="text-muted-foreground">
                                {(
                                  ((optimizedCosts.transportation - currentCosts.transportation) /
                                    currentCosts.transportation) *
                                  100
                                ).toFixed(1)}
                                %
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-blue-500 h-2.5" style={{ width: "100%" }}></div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="bg-green-500 h-2.5"
                              style={{
                                width: `${(optimizedCosts.transportation / currentCosts.transportation) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Processing</span>
                            <div className="flex gap-4">
                              <span>฿{currentCosts.processing.toFixed(2)}</span>
                              <span className="text-green-500">฿{optimizedCosts.processing.toFixed(2)}</span>
                              <span className="text-muted-foreground">
                                {(
                                  ((optimizedCosts.processing - currentCosts.processing) / currentCosts.processing) *
                                  100
                                ).toFixed(1)}
                                %
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-blue-500 h-2.5" style={{ width: "100%" }}></div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="bg-green-500 h-2.5"
                              style={{ width: `${(optimizedCosts.processing / currentCosts.processing) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Disposal</span>
                            <div className="flex gap-4">
                              <span>฿{currentCosts.disposal.toFixed(2)}</span>
                              <span className="text-green-500">฿{optimizedCosts.disposal.toFixed(2)}</span>
                              <span className="text-muted-foreground">
                                {(
                                  ((optimizedCosts.disposal - currentCosts.disposal) / currentCosts.disposal) *
                                  100
                                ).toFixed(1)}
                                %
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-blue-500 h-2.5" style={{ width: "100%" }}></div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="bg-green-500 h-2.5"
                              style={{ width: `${(optimizedCosts.disposal / currentCosts.disposal) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="comparison" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cost Comparison</CardTitle>
                      <CardDescription>Current vs. Optimized total costs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={comparisonData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, value }) => `${name}: ฿${value.toFixed(2)}`}
                            >
                              {comparisonData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`฿${Number(value).toFixed(2)}`, "Cost"]} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="mt-6 bg-green-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Optimization Recommendations</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                              <Recycle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Increase recycling rate to {recyclingRate}%</p>
                              <p className="text-sm text-muted-foreground">
                                Reduces disposal costs by{" "}
                                {((1 - optimizedCosts.disposal / currentCosts.disposal) * 100).toFixed(0)}%
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                              <Recycle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Optimize transportation routes</p>
                              <p className="text-sm text-muted-foreground">
                                Reduces transportation costs by{" "}
                                {((1 - optimizedCosts.transportation / currentCosts.transportation) * 100).toFixed(0)}%
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                              <Recycle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Implement waste sorting at source</p>
                              <p className="text-sm text-muted-foreground">
                                Improves recycling quality and reduces processing costs
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Return on Investment</CardTitle>
                      <CardDescription>Financial benefits of optimization</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="bg-muted p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-muted-foreground">Monthly Savings</h3>
                            <p className="text-2xl font-bold mt-1">฿{optimizedCosts.savings.toFixed(2)}</p>
                            <p className="text-xs text-green-500 mt-1">
                              {optimizedCosts.savingsPercentage.toFixed(1)}% reduction
                            </p>
                          </div>

                          <div className="bg-muted p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-muted-foreground">Annual Savings</h3>
                            <p className="text-2xl font-bold mt-1">฿{(optimizedCosts.savings * 12).toFixed(2)}</p>
                            <p className="text-xs text-green-500 mt-1">
                              {optimizedCosts.savingsPercentage.toFixed(1)}% reduction
                            </p>
                          </div>

                          <div className="bg-muted p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-muted-foreground">5-Year Savings</h3>
                            <p className="text-2xl font-bold mt-1">฿{(optimizedCosts.savings * 12 * 5).toFixed(2)}</p>
                            <p className="text-xs text-green-500 mt-1">
                              {optimizedCosts.savingsPercentage.toFixed(1)}% reduction
                            </p>
                          </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h3 className="text-sm font-medium mb-2">Implementation Costs</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Recycling equipment</span>
                              <span>฿{(wasteVolume * 2).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Staff training</span>
                              <span>฿{(wasteVolume * 0.5).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Process redesign</span>
                              <span>฿{(wasteVolume * 1).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm font-medium">
                              <span>Total implementation cost</span>
                              <span>฿{(wasteVolume * 3.5).toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h3 className="text-sm font-medium mb-2">Payback Period</h3>
                            <p className="text-lg font-bold">
                              {Math.ceil((wasteVolume * 3.5) / optimizedCosts.savings)} months
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" /> Export Report
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
              <Button>Get Detailed Analysis</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
