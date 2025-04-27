"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Recycle, Trash2, Star, Search, Navigation, Info } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("./interactive-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
      <p>Loading map...</p>
    </div>
  ),
})

// Sample location data - in a real app, this would come from an API
const recyclingLocations = [
  {
    id: 1,
    name: "Chiang Mai Recycling Center",
    type: "recycling",
    address: "123 Huay Kaew Rd, Chiang Mai",
    coordinates: [18.7883, 98.9853],
    rating: 4.5,
    materials: ["plastic", "paper", "glass", "metal"],
    hours: "Mon-Fri: 8AM-5PM, Sat: 9AM-2PM",
    phone: "+66 53 123 4567",
    distance: 1.2,
  },
  {
    id: 2,
    name: "Green Point Collection",
    type: "collection",
    address: "456 Nimman Rd, Chiang Mai",
    coordinates: [18.7953, 98.9723],
    rating: 4.2,
    materials: ["plastic", "paper", "electronics"],
    hours: "Mon-Sat: 9AM-6PM",
    phone: "+66 53 234 5678",
    distance: 2.5,
  },
  {
    id: 3,
    name: "EcoSmart Waste Management",
    type: "waste",
    address: "789 Chang Klan Rd, Chiang Mai",
    coordinates: [18.7813, 98.9953],
    rating: 4.8,
    materials: ["general", "hazardous", "organic"],
    hours: "Mon-Sun: 7AM-7PM",
    phone: "+66 53 345 6789",
    distance: 3.1,
  },
  {
    id: 4,
    name: "Sustainable Solutions Hub",
    type: "recycling",
    address: "101 Tha Phae Rd, Chiang Mai",
    coordinates: [18.7873, 98.9933],
    rating: 4.0,
    materials: ["plastic", "paper", "metal", "electronics", "batteries"],
    hours: "Mon-Fri: 8:30AM-5:30PM",
    phone: "+66 53 456 7890",
    distance: 1.8,
  },
  {
    id: 5,
    name: "Community Compost Center",
    type: "organic",
    address: "202 Suthep Rd, Chiang Mai",
    coordinates: [18.7923, 98.9653],
    rating: 4.7,
    materials: ["organic", "garden waste"],
    hours: "Mon-Sat: 8AM-4PM",
    phone: "+66 53 567 8901",
    distance: 2.2,
  },
]

export function EnhancedMapView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
  const [filterType, setFilterType] = useState<string[]>(["recycling", "collection", "waste", "organic"])
  const [maxDistance, setMaxDistance] = useState(10)
  const [showRatings, setShowRatings] = useState(true)

  // Filter locations based on search query, type, and distance
  const filteredLocations = recyclingLocations.filter((location) => {
    const matchesSearch =
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType.includes(location.type)
    const matchesDistance = location.distance <= maxDistance

    return matchesSearch && matchesType && matchesDistance
  })

  // Get the selected location details
  const locationDetails = selectedLocation ? recyclingLocations.find((loc) => loc.id === selectedLocation) : null

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Recycling Map</h2>
          <p className="text-muted-foreground">
            Find recycling centers, collection points, and waste management facilities near you
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Search & Filter</CardTitle>
              <CardDescription>Find the perfect location for your needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search locations..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Location Types</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setFilterType(["recycling", "collection", "waste", "organic"])}
                  >
                    Reset
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={filterType.includes("recycling") ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() =>
                      setFilterType((prev) =>
                        prev.includes("recycling") ? prev.filter((t) => t !== "recycling") : [...prev, "recycling"],
                      )
                    }
                  >
                    <Recycle className="mr-1 h-3 w-3" /> Recycling Centers
                  </Badge>
                  <Badge
                    variant={filterType.includes("collection") ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() =>
                      setFilterType((prev) =>
                        prev.includes("collection") ? prev.filter((t) => t !== "collection") : [...prev, "collection"],
                      )
                    }
                  >
                    <Trash2 className="mr-1 h-3 w-3" /> Collection Points
                  </Badge>
                  <Badge
                    variant={filterType.includes("waste") ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() =>
                      setFilterType((prev) =>
                        prev.includes("waste") ? prev.filter((t) => t !== "waste") : [...prev, "waste"],
                      )
                    }
                  >
                    <Trash2 className="mr-1 h-3 w-3" /> Waste Management
                  </Badge>
                  <Badge
                    variant={filterType.includes("organic") ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() =>
                      setFilterType((prev) =>
                        prev.includes("organic") ? prev.filter((t) => t !== "organic") : [...prev, "organic"],
                      )
                    }
                  >
                    <Recycle className="mr-1 h-3 w-3" /> Organic Waste
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Maximum Distance: {maxDistance} km</Label>
                </div>
                <Slider
                  value={[maxDistance]}
                  min={1}
                  max={20}
                  step={1}
                  onValueChange={(value) => setMaxDistance(value[0])}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="show-ratings" checked={showRatings} onCheckedChange={setShowRatings} />
                <Label htmlFor="show-ratings">Show Ratings</Label>
              </div>

              <Button className="w-full">
                <Navigation className="mr-2 h-4 w-4" /> Use My Location
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Locations ({filteredLocations.length})</CardTitle>
              <CardDescription>Click on a location for details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((location) => (
                    <div
                      key={location.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedLocation === location.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                      onClick={() => setSelectedLocation(location.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{location.name}</h4>
                          <p className="text-xs opacity-90">{location.address}</p>
                        </div>
                        {showRatings && (
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-xs">{location.rating}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs">
                          {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
                        </Badge>
                        <span className="text-xs">{location.distance} km</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No locations found matching your criteria
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <div className="h-[500px]">
              <MapWithNoSSR
                locations={filteredLocations}
                selectedLocation={selectedLocation}
                onLocationSelect={setSelectedLocation}
              />
            </div>
          </Card>

          {locationDetails && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{locationDetails.name}</CardTitle>
                    <CardDescription>{locationDetails.address}</CardDescription>
                  </div>
                  {showRatings && (
                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{locationDetails.rating}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="materials">Materials</TabsTrigger>
                    <TabsTrigger value="directions">Directions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Hours</h4>
                        <p className="text-sm">{locationDetails.hours}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                        <p className="text-sm">{locationDetails.phone}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
                        <p className="text-sm capitalize">{locationDetails.type}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Distance</h4>
                        <p className="text-sm">{locationDetails.distance} km</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <Navigation className="mr-2 h-4 w-4" /> Get Directions
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Info className="mr-2 h-4 w-4" /> More Info
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="materials" className="pt-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Accepted Materials</h4>
                      <div className="flex flex-wrap gap-2">
                        {locationDetails.materials.map((material) => (
                          <Badge key={material} variant="outline" className="capitalize">
                            {material}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        Please ensure all materials are clean and sorted before drop-off. Contact the facility for
                        specific requirements for each material type.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="directions" className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium">From Your Location</h4>
                        <p className="text-sm text-muted-foreground">
                          Approximately {locationDetails.distance} km away. Estimated travel time:{" "}
                          {Math.round(locationDetails.distance * 3)} minutes by car.
                        </p>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <h4 className="text-sm font-medium">Directions</h4>
                        <ol className="text-sm space-y-2 mt-2 pl-5 list-decimal">
                          <li>Head north on Huay Kaew Road for 0.5 km</li>
                          <li>Turn right onto Nimman Road</li>
                          <li>Continue for 0.7 km</li>
                          <li>The destination will be on your left</li>
                        </ol>
                      </div>
                      <Button className="w-full">
                        <Navigation className="mr-2 h-4 w-4" /> Open in Maps App
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
