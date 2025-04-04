"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

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

export default function MapComponent() {
  useEffect(() => {
    // Fix for Leaflet icon paths in browser environment
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/marker-icon-2x.png",
      iconUrl: "/marker-icon.png",
      shadowUrl: "/marker-shadow.png",
    })
  }, [])

  // SVG paths for icons
  const recyclePath =
    '<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"></path><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"></path><path d="m14 16-3 3 3 3"></path><path d="M8.293 13.596 7.196 9.5 3.1 10.598"></path><path d="m9.344 5.811 1.093-4.125 4.125 1.093"></path><path d="m14.99 13.656-3.486 3.432"></path><path d="m18.866 9.567-4.015-6.955-4.15 2.397"></path>'
  const wastePath =
    '<path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line>'
  const locationPath =
    '<path d="M12 22s-8-4.5-8-11.8a8 8 0 0 1 16 0c0 7.3-8 11.8-8 11.8z"></path><circle cx="12" cy="10" r="3"></circle>'

  // Create icons
  const RecyclingIcon = createIcon("green", recyclePath)
  const WasteIcon = createIcon("red", wastePath)
  const GreenPointIcon = createIcon("blue", locationPath)

  return (
    <div className="h-[300px] rounded-3xl overflow-hidden mb-6">
      <MapContainer
        center={[18.7883, 98.9853]} // Chiang Mai coordinates
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[18.7883, 98.9853]} icon={RecyclingIcon}>
          <Popup>Recycling Center</Popup>
        </Marker>
        <Marker position={[18.7953, 98.9723]} icon={WasteIcon}>
          <Popup>Waste Collection Point</Popup>
        </Marker>
        <Marker position={[18.7813, 98.9953]} icon={GreenPointIcon}>
          <Popup>Green Point</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

