"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  CalendarIcon,
  PlusCircle,
  Megaphone,
  Users,
  BarChart3,
  Mail,
  MessageSquare,
  Bell,
  Smartphone,
  Globe,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts"

// Sample campaign data - in a real app, this would come from an API
const sampleCampaigns = [
  {
    id: 1,
    name: "Earth Day Recycling Drive",
    status: "active",
    type: "event",
    audience: "all",
    startDate: new Date(2023, 3, 22), // April 22, 2023
    endDate: new Date(2023, 3, 22),
    channels: ["email", "push", "sms"],
    metrics: {
      impressions: 1250,
      engagement: 320,
      conversions: 85,
      conversionRate: 6.8,
    },
  },
  {
    id: 2,
    name: "Summer Waste Reduction Challenge",
    status: "scheduled",
    type: "challenge",
    audience: "residential",
    startDate: new Date(2023, 5, 1), // June 1, 2023
    endDate: new Date(2023, 7, 31), // August 31, 2023
    channels: ["email", "push", "in-app"],
    metrics: {
      impressions: 0,
      engagement: 0,
      conversions: 0,
      conversionRate: 0,
    },
  },
  {
    id: 3,
    name: "Business Sustainability Workshop",
    status: "completed",
    type: "workshop",
    audience: "business",
    startDate: new Date(2023, 2, 15), // March 15, 2023
    endDate: new Date(2023, 2, 15),
    channels: ["email", "web"],
    metrics: {
      impressions: 450,
      engagement: 120,
      conversions: 45,
      conversionRate: 10,
    },
  },
  {
    id: 4,
    name: "New Recycling Guidelines",
    status: "draft",
    type: "announcement",
    audience: "all",
    startDate: null,
    endDate: null,
    channels: ["email", "push", "in-app", "web"],
    metrics: {
      impressions: 0,
      engagement: 0,
      conversions: 0,
      conversionRate: 0,
    },
  },
]

export function CampaignManager() {
  const [activeTab, setActiveTab] = useState("campaigns")
  const [campaigns, setCampaigns] = useState(sampleCampaigns)
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null)
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "event",
    audience: "all",
    startDate: new Date(),
    endDate: new Date(),
    channels: ["email"],
    description: "",
    goal: "",
    sendNotifications: true,
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "scheduled":
        return "bg-blue-500"
      case "completed":
        return "bg-gray-500"
      case "draft":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "push":
        return <Bell className="h-4 w-4" />
      case "sms":
        return <MessageSquare className="h-4 w-4" />
      case "in-app":
        return <Smartphone className="h-4 w-4" />
      case "web":
        return <Globe className="h-4 w-4" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-gray-500" />
      case "draft":
        return <AlertCircle className="h-4 w-4 text-amber-500" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const handleCreateCampaign = () => {
    // In a real app, this would send data to an API
    const newId = Math.max(...campaigns.map((c) => c.id)) + 1
    setCampaigns([
      ...campaigns,
      {
        id: newId,
        name: newCampaign.name,
        status: "draft",
        type: newCampaign.type,
        audience: newCampaign.audience,
        startDate: newCampaign.startDate,
        endDate: newCampaign.endDate,
        channels: newCampaign.channels,
        metrics: {
          impressions: 0,
          engagement: 0,
          conversions: 0,
          conversionRate: 0,
        },
      },
    ])

    // Reset form and switch to campaigns tab
    setNewCampaign({
      name: "",
      type: "event",
      audience: "all",
      startDate: new Date(),
      endDate: new Date(),
      channels: ["email"],
      description: "",
      goal: "",
      sendNotifications: true,
    })
    setActiveTab("campaigns")
  }

  const handleDeleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id))
    if (selectedCampaign === id) {
      setSelectedCampaign(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Marketing Campaigns</h2>
          <p className="text-muted-foreground">Create and manage sustainability and recycling campaigns</p>
        </div>
        <Button onClick={() => setActiveTab("create")}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Campaign
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New
          </TabsTrigger>
          <TabsTrigger value="audience" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Audience
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Campaigns</CardTitle>
              <CardDescription>View and manage your sustainability and recycling campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedCampaign === campaign.id ? "border-primary" : ""
                    }`}
                    onClick={() => setSelectedCampaign(campaign.id === selectedCampaign ? null : campaign.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`${getStatusColor(campaign.status)} h-3 w-3 rounded-full`} />
                        <div>
                          <h3 className="font-medium">{campaign.name}</h3>
                          <p className="text-xs text-muted-foreground capitalize">
                            {campaign.type} • {campaign.audience} audience
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {getStatusIcon(campaign.status)}
                          <span className="ml-1">{campaign.status}</span>
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteCampaign(campaign.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {selectedCampaign === campaign.id && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Campaign Details</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Start Date</span>
                                <span>{campaign.startDate ? format(campaign.startDate, "PPP") : "Not set"}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">End Date</span>
                                <span>{campaign.endDate ? format(campaign.endDate, "PPP") : "Not set"}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Channels</span>
                                <div className="flex gap-1">
                                  {campaign.channels.map((channel) => (
                                    <div key={channel} className="bg-muted rounded-full p-1" title={channel}>
                                      {getChannelIcon(channel)}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">Performance Metrics</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Impressions</span>
                                <span>{campaign.metrics.impressions.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Engagement</span>
                                <span>{campaign.metrics.engagement.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Conversions</span>
                                <span>{campaign.metrics.conversions.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Conversion Rate</span>
                                <span>{campaign.metrics.conversionRate}%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4 gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" /> Preview
                          </Button>
                          <Button size="sm">
                            {campaign.status === "draft" || campaign.status === "scheduled"
                              ? "Launch Campaign"
                              : "View Report"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Campaign</CardTitle>
              <CardDescription>Set up a new sustainability or recycling campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    placeholder="e.g., Earth Day Recycling Drive"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-type">Campaign Type</Label>
                    <Select
                      value={newCampaign.type}
                      onValueChange={(value) => setNewCampaign({ ...newCampaign, type: value })}
                    >
                      <SelectTrigger id="campaign-type">
                        <SelectValue placeholder="Select campaign type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="challenge">Challenge</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="announcement">Announcement</SelectItem>
                        <SelectItem value="promotion">Promotion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campaign-audience">Target Audience</Label>
                    <Select
                      value={newCampaign.audience}
                      onValueChange={(value) => setNewCampaign({ ...newCampaign, audience: value })}
                    >
                      <SelectTrigger id="campaign-audience">
                        <SelectValue placeholder="Select target audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="schools">Schools</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newCampaign.startDate ? format(newCampaign.startDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newCampaign.startDate}
                          onSelect={(date) => date && setNewCampaign({ ...newCampaign, startDate: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newCampaign.endDate ? format(newCampaign.endDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newCampaign.endDate}
                          onSelect={(date) => date && setNewCampaign({ ...newCampaign, endDate: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Communication Channels</Label>
                  <div className="flex flex-wrap gap-2">
                    {["email", "push", "sms", "in-app", "web"].map((channel) => (
                      <Badge
                        key={channel}
                        variant={newCampaign.channels.includes(channel) ? "default" : "outline"}
                        className="cursor-pointer capitalize"
                        onClick={() => {
                          if (newCampaign.channels.includes(channel)) {
                            setNewCampaign({
                              ...newCampaign,
                              channels: newCampaign.channels.filter((c) => c !== channel),
                            })
                          } else {
                            setNewCampaign({
                              ...newCampaign,
                              channels: [...newCampaign.channels, channel],
                            })
                          }
                        }}
                      >
                        {getChannelIcon(channel)}
                        <span className="ml-1">{channel}</span>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campaign-description">Campaign Description</Label>
                  <Textarea
                    id="campaign-description"
                    placeholder="Describe your campaign..."
                    rows={4}
                    value={newCampaign.description}
                    onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campaign-goal">Campaign Goal</Label>
                  <Textarea
                    id="campaign-goal"
                    placeholder="What do you want to achieve with this campaign?"
                    rows={2}
                    value={newCampaign.goal}
                    onChange={(e) => setNewCampaign({ ...newCampaign, goal: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="send-notifications"
                    checked={newCampaign.sendNotifications}
                    onCheckedChange={(checked) => setNewCampaign({ ...newCampaign, sendNotifications: checked })}
                  />
                  <Label htmlFor="send-notifications">Send notifications to participants</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("campaigns")}>
                Cancel
              </Button>
              <Button onClick={handleCreateCampaign} disabled={!newCampaign.name}>
                Create Campaign
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audience Segments</CardTitle>
              <CardDescription>Manage and target specific audience segments for your campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Residential Users</h3>
                      <p className="text-sm text-muted-foreground">Individual users and households</p>
                    </div>
                    <Badge>2,450 users</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium">Demographics</h4>
                      <ul className="text-sm text-muted-foreground mt-1">
                        <li>65% Urban</li>
                        <li>35% Suburban</li>
                        <li>Age: 25-45 (primary)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Engagement</h4>
                      <ul className="text-sm text-muted-foreground mt-1">
                        <li>42% High engagement</li>
                        <li>35% Medium engagement</li>
                        <li>23% Low engagement</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Preferred Channels</h4>
                      <ul className="text-sm text-muted-foreground mt-1">
                        <li>Mobile app (primary)</li>
                        <li>Email</li>
                        <li>SMS</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Business Customers</h3>
                      <p className="text-sm text-muted-foreground">Commercial and corporate clients</p>
                    </div>
                    <Badge>780 users</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium">Business Types</h4>
                      <ul className="text-sm text-muted-foreground mt-1">
                        <li>45% Retail</li>
                        <li>30% Office</li>
                        <li>25% Industrial</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Engagement</h4>
                      <ul className="text-sm text-muted-foreground mt-1">
                        <li>55% High engagement</li>
                        <li>30% Medium engagement</li>
                        <li>15% Low engagement</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Preferred Channels</h4>
                      <ul className="text-sm text-muted-foreground mt-1">
                        <li>Email (primary)</li>
                        <li>Web portal</li>
                        <li>Direct contact</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Educational Institutions</h3>
                      <p className="text-sm text-muted-foreground">Schools, colleges, and universities</p>
                    </div>
                    <Badge>320 users</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium">Institution Types</h4>
                      <ul className="text-sm text-muted-foreground mt-1">
                        <li>60% K-12 Schools</li>
                        <li>25% Colleges</li>
                        <li>15% Universities</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Engagement</h4>
                      <ul className="text-sm text-muted-foreground mt-1">
                        <li>65% High engagement</li>
                        <li>25% Medium engagement</li>
                        <li>10% Low engagement</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Preferred Channels</h4>
                      <ul className="text-sm text-muted-foreground mt-1">
                        <li>Email (primary)</li>
                        <li>Web portal</li>
                        <li>Educational materials</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Segment
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Analytics</CardTitle>
              <CardDescription>Performance metrics and insights for your campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Campaigns</h3>
                    <p className="text-3xl font-bold mt-2">{campaigns.length}</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-500">+2</span> from last month
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Active Campaigns</h3>
                    <p className="text-3xl font-bold mt-2">{campaigns.filter((c) => c.status === "active").length}</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-500">+1</span> from last month
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Impressions</h3>
                    <p className="text-3xl font-bold mt-2">
                      {campaigns.reduce((sum, c) => sum + c.metrics.impressions, 0).toLocaleString()}
                    </p>
                    <div className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-500">+15%</span> from last month
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Conversion Rate</h3>
                    <p className="text-3xl font-bold mt-2">8.2%</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-500">+1.5%</span> from last month
                    </div>
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={campaigns
                        .filter((c) => c.status !== "draft")
                        .map((c) => ({
                          name: c.name,
                          impressions: c.metrics.impressions,
                          engagement: c.metrics.engagement,
                          conversions: c.metrics.conversions,
                        }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="impressions" name="Impressions" fill="#3b82f6" />
                      <Bar dataKey="engagement" name="Engagement" fill="#22c55e" />
                      <Bar dataKey="conversions" name="Conversions" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Campaign Performance Insights</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Event-based campaigns show highest engagement</p>
                          <p className="text-sm text-muted-foreground">
                            Campaigns centered around specific events like Earth Day show 35% higher engagement rates.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Multi-channel approach increases conversion</p>
                          <p className="text-sm text-muted-foreground">
                            Campaigns using 3+ communication channels show 28% higher conversion rates.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Educational content drives long-term engagement</p>
                          <p className="text-sm text-muted-foreground">
                            Campaigns with educational components show 40% better retention rates.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
