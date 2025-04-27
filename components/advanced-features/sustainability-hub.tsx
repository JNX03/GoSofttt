"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  BarChart2,
  FileText,
  Globe,
  Users,
  Truck,
  Award,
  Lightbulb,
  Building,
  Recycle,
  Droplet,
  CheckCircle,
  ArrowRight,
  Calendar,
  PieChart,
  Layers,
  Cpu,
} from "lucide-react"

export function SustainabilityHub() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)

  const features = [
    {
      id: "carbon-marketplace",
      title: "Carbon Offset Marketplace",
      description: "Purchase verified carbon offsets to neutralize your company's emissions",
      icon: Globe,
      color: "bg-blue-500",
      status: "Available",
      new: true,
    },
    {
      id: "ai-waste-prediction",
      title: "AI Waste Prediction",
      description: "Use machine learning to forecast waste generation and optimize collection",
      icon: Cpu,
      color: "bg-purple-500",
      status: "Available",
      new: true,
    },
    {
      id: "blockchain-tracking",
      title: "Blockchain Waste Tracking",
      description: "Transparent and immutable tracking of waste from generation to disposal",
      icon: Layers,
      color: "bg-indigo-500",
      status: "Available",
      new: true,
    },
    {
      id: "circular-economy",
      title: "Circular Economy Platform",
      description: "Connect with other businesses to reuse and recycle materials",
      icon: Recycle,
      color: "bg-green-500",
      status: "Available",
      new: true,
    },
    {
      id: "esg-reporting",
      title: "ESG Reporting Automation",
      description: "Automatically generate compliant ESG reports for stakeholders",
      icon: FileText,
      color: "bg-amber-500",
      status: "Available",
      new: true,
    },
    {
      id: "water-management",
      title: "Smart Water Management",
      description: "Monitor and optimize water usage with IoT sensors and analytics",
      icon: Droplet,
      color: "bg-cyan-500",
      status: "Available",
      new: true,
    },
    {
      id: "supply-chain",
      title: "Sustainable Supply Chain",
      description: "Assess and improve the sustainability of your entire supply chain",
      icon: Truck,
      color: "bg-orange-500",
      status: "Available",
      new: true,
    },
    {
      id: "employee-engagement",
      title: "Employee Sustainability Program",
      description: "Engage employees in sustainability initiatives with gamification",
      icon: Users,
      color: "bg-pink-500",
      status: "Available",
      new: true,
    },
    {
      id: "certification-tracker",
      title: "Certification Tracker",
      description: "Track progress towards sustainability certifications and standards",
      icon: Award,
      color: "bg-yellow-500",
      status: "Available",
      new: true,
    },
    {
      id: "innovation-hub",
      title: "Sustainability Innovation Hub",
      description: "Connect with startups and researchers for cutting-edge solutions",
      icon: Lightbulb,
      color: "bg-red-500",
      status: "Available",
      new: true,
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Leaf className="mr-2 h-5 w-5" />
          Sustainability Hub
        </CardTitle>
        <CardDescription>Explore our comprehensive suite of sustainability tools and features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className={`cursor-pointer transition-all hover:shadow-md ${activeFeature === feature.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => setActiveFeature(feature.id === activeFeature ? null : feature.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className={`${feature.color} p-2 rounded-full`}>
                    <feature.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex items-center">
                    {feature.new && <Badge className="mr-2 bg-green-500">New</Badge>}
                    <Badge variant="outline">{feature.status}</Badge>
                  </div>
                </div>
                <CardTitle className="text-base mt-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" className="ml-auto">
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {activeFeature && (
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{features.find((f) => f.id === activeFeature)?.title}</CardTitle>
                <CardDescription>{features.find((f) => f.id === activeFeature)?.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="bg-muted p-4 rounded-lg flex flex-col items-center text-center">
                        <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                        <h3 className="font-medium">Easy Integration</h3>
                        <p className="text-sm text-muted-foreground">
                          Seamlessly integrates with your existing systems and workflows.
                        </p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg flex flex-col items-center text-center">
                        <BarChart2 className="h-8 w-8 text-blue-500 mb-2" />
                        <h3 className="font-medium">Data-Driven Insights</h3>
                        <p className="text-sm text-muted-foreground">
                          Powerful analytics to measure and improve your sustainability performance.
                        </p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg flex flex-col items-center text-center">
                        <Globe className="h-8 w-8 text-primary mb-2" />
                        <h3 className="font-medium">Global Impact</h3>
                        <p className="text-sm text-muted-foreground">
                          Make a real difference with verified and transparent sustainability actions.
                        </p>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2">How It Works</h3>
                      <div className="grid gap-4 md:grid-cols-4">
                        <div className="flex flex-col items-center text-center">
                          <div className="bg-primary/10 rounded-full p-3 mb-2">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <p className="text-sm">1. Set up your account and connect your data sources</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="bg-primary/10 rounded-full p-3 mb-2">
                            <PieChart className="h-5 w-5 text-primary" />
                          </div>
                          <p className="text-sm">2. Analyze your current sustainability performance</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="bg-primary/10 rounded-full p-3 mb-2">
                            <Lightbulb className="h-5 w-5 text-primary" />
                          </div>
                          <p className="text-sm">3. Get AI-powered recommendations for improvement</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="bg-primary/10 rounded-full p-3 mb-2">
                            <CheckCircle className="h-5 w-5 text-primary" />
                          </div>
                          <p className="text-sm">4. Implement changes and track your progress</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="mt-4">
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <div>
                            <h3 className="font-medium">Real-time Monitoring</h3>
                            <p className="text-sm text-muted-foreground">
                              Track your sustainability metrics in real-time with customizable dashboards.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <div>
                            <h3 className="font-medium">AI-Powered Recommendations</h3>
                            <p className="text-sm text-muted-foreground">
                              Get intelligent suggestions to improve your sustainability performance.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <div>
                            <h3 className="font-medium">Automated Reporting</h3>
                            <p className="text-sm text-muted-foreground">
                              Generate comprehensive reports for stakeholders and regulatory compliance.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <div>
                            <h3 className="font-medium">Integration Ecosystem</h3>
                            <p className="text-sm text-muted-foreground">
                              Connect with other sustainability tools and platforms for a unified approach.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="case-studies" className="mt-4">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center">
                            <Building className="h-5 w-5 mr-2 text-primary" />
                            <CardTitle className="text-base">Thai Green Manufacturing Co.</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Reduced carbon emissions by 35% and waste by 42% within 12 months of implementation.
                            Achieved ISO 14001 certification and improved brand reputation.
                          </p>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="ghost" size="sm" className="ml-auto">
                            Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center">
                            <Building className="h-5 w-5 mr-2 text-primary" />
                            <CardTitle className="text-base">Bangkok Office Solutions</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Implemented a circular economy program that saved $120,000 annually in waste management
                            costs. Employee engagement in sustainability increased by 78%.
                          </p>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="ghost" size="sm" className="ml-auto">
                            Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="pricing" className="mt-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card>
                        <CardHeader>
                          <CardTitle>Starter</CardTitle>
                          <CardDescription>For small businesses</CardDescription>
                          <div className="mt-2">
                            <span className="text-3xl font-bold">$99</span>
                            <span className="text-muted-foreground">/month</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span>Basic sustainability metrics</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span>Monthly reporting</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span>Email support</span>
                            </li>
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Get Started</Button>
                        </CardFooter>
                      </Card>

                      <Card className="border-primary">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>Professional</CardTitle>
                              <CardDescription>For medium businesses</CardDescription>
                              <div className="mt-2">
                                <span className="text-3xl font-bold">$299</span>
                                <span className="text-muted-foreground">/month</span>
                              </div>
                            </div>
                            <Badge>Popular</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span>Advanced sustainability metrics</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span>Weekly reporting</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span>Priority support</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span>AI recommendations</span>
                            </li>
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Get Started</Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Enterprise</CardTitle>
                          <CardDescription>For large organizations</CardDescription>
                          <div className="mt-2">
                            <span className="text-3xl font-bold">Custom</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span>Comprehensive sustainability suite</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span>Real-time reporting</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span>Dedicated account manager</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span>Custom integrations</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span>Advanced analytics</span>
                            </li>
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Contact Sales</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between border-t">
                <Button variant="outline" onClick={() => setActiveFeature(null)}>
                  Back to All Features
                </Button>
                <Button>
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
