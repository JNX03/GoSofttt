"use client"
import dynamic from "next/dynamic"

// Client-side only component for the chart
const ChartComponent = dynamic(() => import("./chart-component"), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-100 rounded-lg animate-pulse"></div>,
})

export function PieChart() {
  return (
    <div className="w-full">
      <ChartComponent />
      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-red-500 mr-2"></span>
          <span>Food and Green</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-orange-600 mr-2"></span>
          <span>Glass</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-purple-600 mr-2"></span>
          <span>Metal</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-blue-500 mr-2"></span>
          <span>Plastics</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-green-600 mr-2"></span>
          <span>Woods</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-yellow-400 mr-2"></span>
          <span>Paper and Cardboard</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-gray-400 mr-2"></span>
          <span>Rubber and Leather</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-gray-500 mr-2"></span>
          <span>Other</span>
        </div>
      </div>
    </div>
  )
}

