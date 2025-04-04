"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartConfiguration, type ChartData } from "chart.js/auto"

export default function ChartComponent() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const data: ChartData = {
      labels: [
        "Food and Green",
        "Glass",
        "Metal",
        "Plastics",
        "Woods",
        "Paper and Cardboard",
        "Rubber and Leather",
        "Other",
      ],
      datasets: [
        {
          data: [30, 15, 10, 20, 5, 12, 5, 3],
          backgroundColor: [
            "#e74c3c", // Red
            "#d35400", // Orange
            "#8e44ad", // Purple
            "#3498db", // Blue
            "#27ae60", // Green
            "#f1c40f", // Yellow
            "#95a5a6", // Gray
            "#7f8c8d", // Dark Gray
          ],
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    }

    const config: ChartConfiguration = {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        cutout: "50%",
      },
    }

    chartInstance.current = new Chart(ctx, config)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} height="300"></canvas>
}

