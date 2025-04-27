"use client"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    Recycled: 65,
    Waste: 45,
  },
  {
    name: "Feb",
    Recycled: 59,
    Waste: 40,
  },
  {
    name: "Mar",
    Recycled: 80,
    Waste: 35,
  },
  {
    name: "Apr",
    Recycled: 81,
    Waste: 30,
  },
  {
    name: "May",
    Recycled: 56,
    Waste: 25,
  },
  {
    name: "Jun",
    Recycled: 55,
    Waste: 20,
  },
  {
    name: "Jul",
    Recycled: 40,
    Waste: 15,
  },
  {
    name: "Aug",
    Recycled: 70,
    Waste: 25,
  },
  {
    name: "Sep",
    Recycled: 90,
    Waste: 30,
  },
  {
    name: "Oct",
    Recycled: 95,
    Waste: 35,
  },
  {
    name: "Nov",
    Recycled: 85,
    Waste: 25,
  },
  {
    name: "Dec",
    Recycled: 100,
    Waste: 20,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}kg`}
        />
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Recycled" fill="#4ade80" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Waste" fill="#f87171" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
