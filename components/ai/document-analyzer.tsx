"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Upload,
  FileUp,
  Loader2,
  CheckCircle,
  AlertCircle,
  Download,
  Copy,
  Share2,
  FileQuestion,
} from "lucide-react"
import {
  ResponsiveContainer,
  PieChart as PieChartRecharts,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
} from "recharts"

export function DocumentAnalyzer() {
  const [activeTab, setActiveTab] = useState("upload")
  const [files, setFiles] = useState<File[]>([])
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sample analysis results - in a real app, this would come from an API
  const sampleResults = {
    summary:
      "This document contains waste management data for Q1 2023. It shows a 15% increase in recycling rates compared to the previous quarter, with plastic and paper being the most recycled materials. The document also outlines cost-saving opportunities through optimized collection routes and improved sorting processes.",
    keyInsights: [
      "15% increase in recycling rates compared to Q4 2022",
      "Plastic (35%) and paper (28%) are the most recycled materials",
      "Potential for 12% cost reduction through route optimization",
      "Community engagement programs showing positive impact on participation rates",
      "Recommendation to expand collection points in northern districts",
    ],
    wasteComposition: [
      { name: "Plastic", value: 35 },
      { name: "Paper", value: 28 },
      { name: "Glass", value: 15 },
      { name: "Metal", value: 12 },
      { name: "Organic", value: 7 },
      { name: "Other", value: 3 },
    ],
    costAnalysis: {
      current: 125000,
      projected: 110000,
      savings: 15000,
      savingsPercentage: 12,
      breakdownCurrent: [
        { category: "Collection", amount: 55000 },
        { category: "Processing", amount: 35000 },
        { category: "Transportation", amount: 25000 },
        { category: "Administration", amount: 10000 },
      ],
      breakdownProjected: [
        { category: "Collection", amount: 50000 },
        { category: "Processing", amount: 30000 },
        { category: "Transportation", amount: 20000 },
        { category: "Administration", amount: 10000 },
      ],
    },
    recommendations: [
      {
        title: "Expand Collection Network",
        description:
          "Add 5 new collection points in northern districts to improve accessibility and increase participation rates.",
        impact: "high",
        timeframe: "medium",
        cost: "medium",
      },
      {
        title: "Optimize Collection Routes",
        description: "Implement AI-driven route optimization to reduce transportation costs and carbon emissions.",
        impact: "high",
        timeframe: "short",
        cost: "low",
      },
      {
        title: "Enhance Sorting Technology",
        description: "Invest in advanced sorting technology to improve material recovery rates and quality.",
        impact: "medium",
        timeframe: "long",
        cost: "high",
      },
      {
        title: "Community Education Campaign",
        description: "Launch targeted education campaigns to improve waste separation at source.",
        impact: "medium",
        timeframe: "short",
        cost: "low",
      },
    ],
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const startAnalysis = () => {
    setAnalyzing(true)
    setAnalysisProgress(0)
    setActiveTab("analyzing")

    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setAnalysisComplete(true)
          setAnalysisResults(sampleResults)
          setActiveTab("results")
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const resetAnalysis = () => {
    setFiles([])
    setAnalyzing(false)
    setAnalysisComplete(false)
    setAnalysisProgress(0)
    setAnalysisResults(null)
    setActiveTab("upload")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Document Analysis</h2>
          <p className="text-muted-foreground">
            Upload waste management reports and documents for AI-powered analysis and insights
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload" disabled={analyzing}>
            Upload
          </TabsTrigger>
          <TabsTrigger value="analyzing" disabled={!analyzing || analysisComplete}>
            Analyzing
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!analysisComplete}>
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Upload waste management reports, sustainability documents, or any text-based files for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.xls"
                />
                <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-1">Drag and drop files here</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports PDF, Word, Excel, and text files up to 20MB
                </p>
                <Button>
                  <Upload className="mr-2 h-4 w-4" /> Select Files
                </Button>
              </div>

              {files.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h3 className="text-sm font-medium">Selected Files ({files.length})</h3>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                          <div>
                            <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFile(index)
                          }}
                        >
                          <span className="sr-only">Remove</span>
                          <AlertCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={resetAnalysis}>
                Reset
              </Button>
              <Button onClick={startAnalysis} disabled={files.length === 0}>
                Start Analysis
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analyzing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyzing Documents</CardTitle>
              <CardDescription>Our AI is processing your documents to extract valuable insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className={`rounded-full p-2 ${analysisProgress >= 25 ? "bg-green-100" : "bg-muted"}`}>
                    {analysisProgress >= 25 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Document Processing</h4>
                    <p className="text-xs text-muted-foreground">Converting documents to analyzable text</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className={`rounded-full p-2 ${analysisProgress >= 50 ? "bg-green-100" : "bg-muted"}`}>
                    {analysisProgress >= 50 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : analysisProgress >= 25 ? (
                      <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                    ) : (
                      <FileQuestion className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Content Analysis</h4>
                    <p className="text-xs text-muted-foreground">Extracting key information and metrics</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className={`rounded-full p-2 ${analysisProgress >= 75 ? "bg-green-100" : "bg-muted"}`}>
                    {analysisProgress >= 75 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : analysisProgress >= 50 ? (
                      <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                    ) : (
                      <FileQuestion className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Data Visualization</h4>
                    <p className="text-xs text-muted-foreground">Generating charts and visual representations</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className={`rounded-full p-2 ${analysisProgress >= 100 ? "bg-green-100" : "bg-muted"}`}>
                    {analysisProgress >= 100 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : analysisProgress >= 75 ? (
                      <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                    ) : (
                      <FileQuestion className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Recommendations</h4>
                    <p className="text-xs text-muted-foreground">Generating actionable insights and recommendations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {analysisResults && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription>AI-generated insights from your uploaded documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Document Summary</h3>
                    <p className="text-sm text-muted-foreground">{analysisResults.summary}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Key Insights</h3>
                    <ul className="space-y-1">
                      {analysisResults.keyInsights.map((insight: string, index: number) => (
                        <li key={index} className="text-sm flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Waste Composition</h3>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChartRecharts>
                            <Pie
                              data={analysisResults.wasteComposition}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {analysisResults.wasteComposition.map((entry: any, index: number) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={["#3b82f6", "#22c55e", "#eab308", "#ef4444", "#8b5cf6", "#94a3b8"][index % 6]}
                                />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                          </PieChartRecharts>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Cost Analysis</h3>
                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm">Current Cost</span>
                            <span className="font-medium">
                              ฿{analysisResults.costAnalysis.current.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm">Projected Cost</span>
                            <span className="font-medium">
                              ฿{analysisResults.costAnalysis.projected.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Potential Savings</span>
                            <span className="font-medium text-green-500">
                              ฿{analysisResults.costAnalysis.savings.toLocaleString()} (
                              {analysisResults.costAnalysis.savingsPercentage}%)
                            </span>
                          </div>
                        </div>

                        <div className="h-[120px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={analysisResults.costAnalysis.breakdownCurrent.map((item: any, index: number) => ({
                                name: item.category,
                                current: item.amount,
                                projected: analysisResults.costAnalysis.breakdownProjected[index].amount,
                              }))}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="current" name="Current" fill="#ef4444" />
                              <Bar dataKey="projected" name="Projected" fill="#22c55e" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>AI-generated recommendations based on document analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResults.recommendations.map((recommendation: any, index: number) => (
                      <div key={index} className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{recommendation.title}</h3>
                          <div className="flex space-x-2">
                            <Badge variant={recommendation.impact === "high" ? "default" : "outline"}>
                              {recommendation.impact} impact
                            </Badge>
                            <Badge variant="outline">{recommendation.timeframe} term</Badge>
                            <Badge variant="outline">{recommendation.cost} cost</Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Export PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" /> Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                  </div>
                  <Button onClick={resetAnalysis}>Analyze New Documents</Button>
                </CardFooter>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
