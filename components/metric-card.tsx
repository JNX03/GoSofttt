import type { ReactNode } from "react"

interface MetricCardProps {
  title: string
  value: string
  unit: string
  bgColor: string
  icon?: ReactNode
}

export function MetricCard({ title, value, unit, bgColor, icon }: MetricCardProps) {
  return (
    <div className={`${bgColor} rounded-3xl p-6 text-white flex flex-col items-center justify-center text-center`}>
      {icon}
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <div className="text-6xl font-bold">{value}</div>
      <div className="text-lg">{unit}</div>
    </div>
  )
}
