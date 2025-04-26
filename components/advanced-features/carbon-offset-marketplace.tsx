"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, TreesIcon as Tree, Wind, Sun, Droplet, ShoppingCart, Filter } from "lucide-react"

export function CarbonOffsetMarketplace() {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])

  const offsetProjects = [
    {
      id: "1",
      name: "Thai Forest Restoration",
      location: "Northern Thailand",
      type: "Reforestation",
      price: 12,
      impact: "1 ton CO2",
      description: "Restore native forests in Northern Thailand, supporting biodiversity and local communities.",
      icon: Tree,
      color: "bg-green-500",
    },
    {
      id: "2",
      name: "Solar Energy Farm",
      location: "Central Thailand",
      type: "Renewable Energy",
      price: 15,
      impact: "1 ton CO2",
      description: "Support the development of solar energy farms to replace fossil fuel electricity generation.",
      icon: Sun,
      color: "bg-amber-500",
    },
    {
      id: "3",
      name: "Wind Power Project",
      location: "Southern Thailand",
      type: "Renewable Energy",
      price: 14,
      impact: "1 ton CO2",
      description: "Fund wind turbines along the coast to generate clean electricity for local communities.",
      icon: Wind,
      color: "bg-blue-500",
    },
    {
      id: "4",
      name: "Mangrove Conservation",
      location: "Coastal Thailand",
      type: "Conservation",
      price: 10,
      impact: "1 ton CO2",
      description: "Protect and restore mangrove ecosystems that sequester carbon and protect coastlines.",
      icon: Droplet,
      color: "bg-teal-500",
    },
  ]

  const toggleProject = (id: string) => {
    if (selectedProjects.includes(id)) {
      setSelectedProjects(selectedProjects.filter((projectId) => projectId !== id))
    } else {
      setSelectedProjects([...selectedProjects, id])
    }
  }

  const totalCost = selectedProjects.reduce((sum, id) => {
    const project = offsetProjects.find((p) => p.id === id)
    return sum + (project ? project.price : 0)
  }, 0)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="mr-2 h-5 w-5" />
          Carbon Offset Marketplace
        </CardTitle>
        <CardDescription>Purchase carbon offsets to neutralize your company's emissions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="reforestation">Reforestation</TabsTrigger>
              <TabsTrigger value="renewable">Renewable Energy</TabsTrigger>
              <TabsTrigger value="conservation">Conservation</TabsTrigger>
            </TabsList>
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter</span>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-4 md:grid-cols-2">
              {offsetProjects.map((project) => (
                <Card
                  key={project.id}
                  className={`border-l-4 ${selectedProjects.includes(project.id) ? "border-l-primary" : "border-l-muted"}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className={`${project.color} p-2 rounded-full mr-3`}>
                          <project.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{project.name}</CardTitle>
                          <CardDescription>{project.location}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{project.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <span className="text-lg font-bold">${project.price}</span>
                        <span className="text-sm text-muted-foreground"> / {project.impact}</span>
                      </div>
                      <Button
                        variant={selectedProjects.includes(project.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleProject(project.id)}
                      >
                        {selectedProjects.includes(project.id) ? "Selected" : "Select"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reforestation" className="mt-0">
            <div className="grid gap-4 md:grid-cols-2">
              {offsetProjects
                .filter((p) => p.type === "Reforestation")
                .map((project) => (
                  <Card
                    key={project.id}
                    className={`border-l-4 ${selectedProjects.includes(project.id) ? "border-l-primary" : "border-l-muted"}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className={`${project.color} p-2 rounded-full mr-3`}>
                            <project.icon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{project.name}</CardTitle>
                            <CardDescription>{project.location}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline">{project.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <span className="text-lg font-bold">${project.price}</span>
                          <span className="text-sm text-muted-foreground"> / {project.impact}</span>
                        </div>
                        <Button
                          variant={selectedProjects.includes(project.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleProject(project.id)}
                        >
                          {selectedProjects.includes(project.id) ? "Selected" : "Select"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="renewable" className="mt-0">
            <div className="grid gap-4 md:grid-cols-2">
              {offsetProjects
                .filter((p) => p.type === "Renewable Energy")
                .map((project) => (
                  <Card
                    key={project.id}
                    className={`border-l-4 ${selectedProjects.includes(project.id) ? "border-l-primary" : "border-l-muted"}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className={`${project.color} p-2 rounded-full mr-3`}>
                            <project.icon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{project.name}</CardTitle>
                            <CardDescription>{project.location}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline">{project.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <span className="text-lg font-bold">${project.price}</span>
                          <span className="text-sm text-muted-foreground"> / {project.impact}</span>
                        </div>
                        <Button
                          variant={selectedProjects.includes(project.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleProject(project.id)}
                        >
                          {selectedProjects.includes(project.id) ? "Selected" : "Select"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="conservation" className="mt-0">
            <div className="grid gap-4 md:grid-cols-2">
              {offsetProjects
                .filter((p) => p.type === "Conservation")
                .map((project) => (
                  <Card
                    key={project.id}
                    className={`border-l-4 ${selectedProjects.includes(project.id) ? "border-l-primary" : "border-l-muted"}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className={`${project.color} p-2 rounded-full mr-3`}>
                            <project.icon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{project.name}</CardTitle>
                            <CardDescription>{project.location}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline">{project.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <span className="text-lg font-bold">${project.price}</span>
                          <span className="text-sm text-muted-foreground"> / {project.impact}</span>
                        </div>
                        <Button
                          variant={selectedProjects.includes(project.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleProject(project.id)}
                        >
                          {selectedProjects.includes(project.id) ? "Selected" : "Select"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div>
          <p className="text-sm text-muted-foreground">Selected Projects: {selectedProjects.length}</p>
          <p className="font-bold">Total: ${totalCost.toFixed(2)}</p>
        </div>
        <Button disabled={selectedProjects.length === 0}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Purchase Offsets
        </Button>
      </CardFooter>
    </Card>
  )
}
