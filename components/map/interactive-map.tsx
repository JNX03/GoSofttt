"use client"

import { useEffect, useState, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Button } from "@/components/ui/button"
import { Navigation, AlertTriangle } from "lucide-react"
import { useNotification } from "@/components/ui/notification-toast"

// Fix for Leaflet icon paths in browser environment
const fixLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/marker-icon-2x.png",
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
  })
}

// Custom icons for different map markers
const createIcon = (color: string, svgPath: string) => {
  return L.divIcon({
    html: `<div class="bg-${color}-500 p-2 rounded-full flex items-center justify-center" style="width: 30px; height: 30px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        ${svgPath}
      </svg>
    </div>`,
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })
}

// SVG paths for icons
const recyclePath =
  '<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"></path><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"></path><path d="m14 16-3 3 3 3"></path><path d="M8.293 13.596 7.196 9.5 3.1 10.598"></path><path d="m9.344 5.811 1.093-4.125 4.125 1.093"></path><path d="m14.99 13.656-3.486 3.432"></path><path d="m18.866 9.567-4.015-6.955-4.15 2.397"></path>'
const wastePath =
  '<path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line>'
const locationPath =
  '<path d="M12 22s-8-4.5-8-11.8a8 8 0 0 1 16 0c0 7.3-8 11.8-8 11.8z"></path><circle cx="12" cy="10" r="3"></circle>'
const organicPath = '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>'

// Create icons
const RecyclingIcon = createIcon("green", recyclePath)
const WasteIcon = createIcon("red", wastePath)
const CollectionIcon = createIcon("blue", locationPath)
const OrganicIcon = createIcon("amber", organicPath)

// Component to handle map center changes when selected location changes
function MapController({
  selectedLocation,
  locations,
}: {
  selectedLocation: number | null
  locations: any[]
}) {
  const map = useMap()

  useEffect(() => {
    if (selectedLocation) {
      const location = locations.find((loc) => loc.id === selectedLocation)
      if (location) {
        map.setView(location.coordinates, 15, { animate: true })
      }
    }
  }, [selectedLocation, locations, map])

  return null
}

interface InteractiveMapProps {
  locations: any[]
  selectedLocation: number | null
  onLocationSelect: (id: number) => void
}

// Create a global variable to track if the notification has been shown
let locationNotificationShown = false

export default function InteractiveMap({ locations, selectedLocation, onLocationSelect }: InteractiveMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [mapReady, setMapReady] = useState(false)
  const [showLocationMessage, setShowLocationMessage] = useState(false)
  const { addNotification } = useNotification()
  const mapRef = useRef<L.Map | null>(null)
  const notificationShownRef = useRef(false)

  // Handle map initialization
  const handleMapCreated = (map: L.Map) => {
    mapRef.current = map
    setMapReady(true)
  }

  useEffect(() => {
    fixLeafletIcons()

    // Only try to get location if we're in a browser environment
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.log("Geolocation error:", error.message)
          setLocationError(error.message)
          setShowLocationMessage(true)

          // Show a notification only once per session
          if (!locationNotificationShown && !notificationShownRef.current) {
            locationNotificationShown = true
            notificationShownRef.current = true

            addNotification({
              title: "Using default location",
              description: "We're showing a default map location since we couldn't access your position.",
              type: "info",
              duration: 5000,
            })
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      )
    } else if (typeof window !== "undefined") {
      setLocationError("Geolocation is not supported by this browser.")
      setShowLocationMessage(true)
    }

    // Cleanup function
    return () => {
      // Reset the notification flag when component unmounts
      notificationShownRef.current = false
    }
  }, [addNotification])

  const getIconForType = (type: string) => {
    switch (type) {
      case "recycling":
        return RecyclingIcon
      case "waste":
        return WasteIcon
      case "collection":
        return CollectionIcon
      case "organic":
        return OrganicIcon
      default:
        return CollectionIcon
    }
  }

  // If we're in a server environment, return a placeholder
  if (typeof window === "undefined") {
    return <div className="h-full w-full bg-gray-100 flex items-center justify-center">Loading map...</div>
  }

  return (
    <>
      {showLocationMessage && locationError && (
        <div className="absolute top-2 right-2 z-[1000] bg-amber-50 border border-amber-200 rounded-md p-2 text-xs flex items-center max-w-[200px]">
          <AlertTriangle className="h-3 w-3 text-amber-500 mr-1 flex-shrink-0" />
          <span className="text-amber-800">Using default location</span>
        </div>
      )}
      <MapContainer
        center={[18.7883, 98.9853]} // Chiang Mai coordinates as default
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        whenCreated={handleMapCreated}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={L.divIcon({
              html: `<div class="bg-blue-500 border-2 border-white rounded-full" style="width: 16px; height: 16px;"></div>`,
              className: "",
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            })}
          >
            <Popup>
              <div className="text-center">
                <p className="font-medium">Your Location</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Location markers */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.coordinates}
            icon={getIconForType(location.type)}
            eventHandlers={{
              click: () => {
                onLocationSelect(location.id)
              },
            }}
          >
            <Popup>
              <div className="text-center p-1">
                <h3 className="font-medium">{location.name}</h3>
                <p className="text-xs text-gray-600">{location.address}</p>
                <p className="text-xs mt-1">{location.distance} km away</p>
                <Button
                  size="sm"
                  className="mt-2 w-full text-xs h-7"
                  onClick={(e) => {
                    e.stopPropagation()
                    onLocationSelect(location.id)
                  }}
                >
                  <Navigation className="mr-1 h-3 w-3" /> Details
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}

        {mapReady && <MapController selectedLocation={selectedLocation} locations={locations} />}
      </MapContainer>
    </>
  )
}
