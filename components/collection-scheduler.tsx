"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import {
  CalendarIcon,
  Clock,
  Trash2,
  MapPin,
  Plus,
  CalendarPlus2Icon as CalendarIcon2,
  Bell,
  CheckCircle,
} from "lucide-react"
import { useNotification } from "@/components/ui/notification-toast"

export function CollectionScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [showNewPickupForm, setShowNewPickupForm] = useState(false)
  const [activeTab, setActiveTab] = useState("upcoming")
  const { addNotification } = useNotification()

  const [newPickup, setNewPickup] = useState({
    date: new Date(),
    time: "09:00",
    type: "mixed",
    address: "",
    notes: "",
  })

  // Sample pickup data - in a real app, this would be stored in a database
  const [pickups, setPickups] = useState([
    {
      id: "1",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      time: "09:00",
      type: "mixed",
      address: "22 Recycle Center, Chiang Mai",
      notes: "Place bins at the front gate",
      status: "scheduled",
    },
    {
      id: "2",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      time: "14:30",
      type: "recyclable",
      address: "22 Recycle Center, Chiang Mai",
      notes: "",
      status: "scheduled",
    },
    {
      id: "3",
      date: new Date(new Date().setDate(new Date().getDate() - 3)),
      time: "10:00",
      type: "organic",
      address: "22 Recycle Center, Chiang Mai",
      notes: "",
      status: "completed",
    },
  ])

  const handleSchedulePickup = () => {
    if (!newPickup.date || !newPickup.time || !newPickup.address) {
      addNotification({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        type: "error",
        duration: 3000,
      })
      return
    }

    const id = Math.random().toString(36).substring(2, 9)
    const scheduledPickup = {
      id,
      ...newPickup,
      status: "scheduled",
    }

    setPickups([...pickups, scheduledPickup])
    setNewPickup({
      date: new Date(),
      time: "09:00",
      type: "mixed",
      address: "",
      notes: "",
    })
    setShowNewPickupForm(false)

    addNotification({
      title: "Pickup Scheduled",
      description: `Your pickup has been scheduled for ${format(newPickup.date, "PPP")} at ${newPickup.time}.`,
      type: "success",
      duration: 3000,
    })

    // Set a reminder notification
    const pickupDate = new Date(newPickup.date)
    const [hours, minutes] = newPickup.time.split(":").map(Number)
    pickupDate.setHours(hours, minutes)

    // If the pickup is within the next 24 hours, show a reminder
    const now = new Date()
    const timeDiff = pickupDate.getTime() - now.getTime()
    const hoursDiff = timeDiff / (1000 * 60 * 60)

    if (hoursDiff <= 24 && hoursDiff > 0) {
      setTimeout(() => {
        addNotification({
          title: "Pickup Reminder",
          description: `You have a waste pickup scheduled for tomorrow at ${newPickup.time}.`,
          type: "info",
          duration: 10000,
        })
      }, 5000) // Show after 5 seconds for demo purposes
    }
  }

  const cancelPickup = (id: string) => {
    setPickups(pickups.filter((pickup) => pickup.id !== id))
    addNotification({
      title: "Pickup Cancelled",
      description: "Your scheduled pickup has been cancelled.",
      type: "info",
      duration: 3000,
    })
  }

  const markAsCompleted = (id: string) => {
    setPickups(
      pickups.map((pickup) => {
        if (pickup.id === id) {
          return { ...pickup, status: "completed" }
        }
        return pickup
      }),
    )

    addNotification({
      title: "Pickup Completed",
      description: "Your pickup has been marked as completed.",
      type: "success",
      duration: 3000,
    })
  }

  const getWasteTypeColor = (type: string) => {
    switch (type) {
      case "mixed":
        return "bg-gray-500"
      case "recyclable":
        return "bg-green-500"
      case "organic":
        return "bg-amber-500"
      case "hazardous":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  const filteredPickups = pickups.filter((pickup) => {
    if (activeTab === "upcoming") return pickup.status === "scheduled" && pickup.date >= new Date()
    if (activeTab === "completed") return pickup.status === "completed"
    return true
  })

  // Get pickups for the selected date
  const pickupsOnSelectedDate = pickups.filter((pickup) => {
    if (!selectedDate) return false
    const pickupDate = new Date(pickup.date)
    return (
      pickupDate.getDate() === selectedDate.getDate() &&
      pickupDate.getMonth() === selectedDate.getMonth() &&
      pickupDate.getFullYear() === selectedDate.getFullYear()
    )
  })

  // Get dates with pickups for the calendar
  const datesWithPickups = pickups.map((pickup) => new Date(pickup.date))

  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
          <div>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <CalendarIcon2 className="mr-2 h-5 w-5" />
              Waste Collection Scheduler
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Schedule and manage your waste collection pickups
            </CardDescription>
          </div>
          <Button size="sm" onClick={() => setShowNewPickupForm(!showNewPickupForm)} className="w-full sm:w-auto">
            {showNewPickupForm ? (
              "Cancel"
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Schedule Pickup
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        {showNewPickupForm && (
          <Card className="mb-6 border-dashed">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Schedule New Pickup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Pickup Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newPickup.date ? format(newPickup.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newPickup.date}
                          onSelect={(date) => date && setNewPickup({ ...newPickup, date })}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="time">Pickup Time</Label>
                    <Select
                      value={newPickup.time}
                      onValueChange={(value) => setNewPickup({ ...newPickup, time: value })}
                    >
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="type">Waste Type</Label>
                  <Select value={newPickup.type} onValueChange={(value) => setNewPickup({ ...newPickup, type: value })}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select waste type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mixed">Mixed Waste</SelectItem>
                      <SelectItem value="recyclable">Recyclable Materials</SelectItem>
                      <SelectItem value="organic">Organic Waste</SelectItem>
                      <SelectItem value="hazardous">Hazardous Waste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">Pickup Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter pickup address"
                    value={newPickup.address}
                    onChange={(e) => setNewPickup({ ...newPickup, address: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Any special instructions"
                    value={newPickup.notes}
                    onChange={(e) => setNewPickup({ ...newPickup, notes: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSchedulePickup}>
                Schedule Pickup
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-5">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Pickup Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={{
                    pickup: datesWithPickups,
                  }}
                  modifiersStyles={{
                    pickup: {
                      fontWeight: "bold",
                      backgroundColor: "rgba(34, 197, 94, 0.1)",
                      borderRadius: "100%",
                    },
                  }}
                />

                <div className="mt-4">
                  <h3 className="text-xs sm:text-sm font-medium mb-2">
                    {selectedDate ? <>Pickups on {format(selectedDate, "MMMM d, yyyy")}</> : <>Select a date</>}
                  </h3>

                  {pickupsOnSelectedDate.length > 0 ? (
                    <div className="space-y-2">
                      {pickupsOnSelectedDate.map((pickup) => (
                        <div key={pickup.id} className="flex items-center p-2 rounded-md bg-muted/50">
                          <div className={`w-3 h-3 rounded-full ${getWasteTypeColor(pickup.type)} mr-2`}></div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs sm:text-sm font-medium truncate">
                              {pickup.time} - {pickup.type.charAt(0).toUpperCase() + pickup.type.slice(1)} Waste
                            </div>
                            <div className="text-[10px] sm:text-xs text-muted-foreground truncate">
                              {pickup.address}
                            </div>
                          </div>
                          <Badge
                            variant={pickup.status === "completed" ? "outline" : "default"}
                            className="ml-2 text-[10px]"
                          >
                            {pickup.status === "completed" ? "Completed" : "Scheduled"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : selectedDate ? (
                    <div className="text-center py-4 text-xs sm:text-sm text-muted-foreground">
                      No pickups scheduled for this date.
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4 w-full grid grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="all">All Pickups</TabsTrigger>
              </TabsList>

              <div className="space-y-4">
                {filteredPickups.length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarIcon2 className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <h3 className="text-base sm:text-lg font-medium">No {activeTab} pickups</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {activeTab === "upcoming"
                        ? "Schedule a new pickup to get started."
                        : "Complete some pickups to see them here."}
                    </p>
                    {activeTab !== "upcoming" && (
                      <Button variant="outline" className="mt-4" onClick={() => setActiveTab("upcoming")}>
                        View Upcoming Pickups
                      </Button>
                    )}
                  </div>
                ) : (
                  filteredPickups.map((pickup) => (
                    <Card
                      key={pickup.id}
                      className={`border-l-4 ${pickup.status === "completed" ? "border-l-green-500" : "border-l-primary"}`}
                    >
                      <CardHeader className="pb-2 px-4 sm:px-6">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${getWasteTypeColor(pickup.type)} mr-2`}></div>
                            <CardTitle className="text-sm sm:text-base">
                              {pickup.type.charAt(0).toUpperCase() + pickup.type.slice(1)} Waste Pickup
                            </CardTitle>
                          </div>
                          <Badge
                            variant={pickup.status === "completed" ? "outline" : "default"}
                            className="text-[10px] sm:text-xs"
                          >
                            {pickup.status === "completed" ? "Completed" : "Scheduled"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="px-4 sm:px-6">
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                            <div className="flex items-center">
                              <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-2" />
                              <span className="text-xs sm:text-sm">{format(new Date(pickup.date), "PPP")}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-2" />
                              <span className="text-xs sm:text-sm">{pickup.time}</span>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-2 mt-0.5" />
                            <span className="text-xs sm:text-sm">{pickup.address}</span>
                          </div>

                          {pickup.notes && (
                            <div className="bg-muted/50 p-2 rounded-md text-xs sm:text-sm">
                              <span className="font-medium">Notes:</span> {pickup.notes}
                            </div>
                          )}

                          {pickup.status === "scheduled" && (
                            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                              <Button variant="outline" size="sm" onClick={() => cancelPickup(pickup.id)}>
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                Cancel
                              </Button>
                              <Button size="sm" onClick={() => markAsCompleted(pickup.id)}>
                                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                Mark as Completed
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </Tabs>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 border-t pt-4 px-4 sm:px-6">
        <div className="text-xs sm:text-sm text-muted-foreground">
          {pickups.filter((p) => p.status === "scheduled" && new Date(p.date) >= new Date()).length} upcoming pickups
        </div>
        <Button
          size="sm"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => {
            addNotification({
              title: "Reminder Set",
              description: "You'll receive notifications before your scheduled pickups.",
              type: "success",
              duration: 3000,
            })
          }}
        >
          <Bell className="mr-2 h-4 w-4" />
          Set Reminders
        </Button>
      </CardFooter>
    </Card>
  )
}
