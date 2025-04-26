"use client"
import dynamic from "next/dynamic"

// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("./map-component"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] rounded-3xl overflow-hidden mb-6 bg-gray-100 flex items-center justify-center">
      <p>Loading map...</p>
    </div>
  ),
})

export function MapView() {
  return <MapWithNoSSR />
}
