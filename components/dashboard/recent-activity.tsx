import { Recycle, Trash2, Leaf, Award, Map } from "lucide-react"

interface RecentActivityProps {
  fullView?: boolean
}

const activities = [
  {
    id: 1,
    type: "recycle",
    description: "Recycled 5kg of plastic waste",
    time: "2 hours ago",
    icon: Recycle,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
  },
  {
    id: 2,
    type: "collection",
    description: "Scheduled waste collection",
    time: "Yesterday",
    icon: Trash2,
    iconColor: "text-red-500",
    iconBg: "bg-red-100",
  },
  {
    id: 3,
    type: "carbon",
    description: "Reduced CO2 emissions by 2kg",
    time: "2 days ago",
    icon: Leaf,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
  },
  {
    id: 4,
    type: "reward",
    description: "Earned 15 reward points",
    time: "3 days ago",
    icon: Award,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100",
  },
  {
    id: 5,
    type: "location",
    description: "Added new recycling location",
    time: "5 days ago",
    icon: Map,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
  },
]

export function RecentActivity({ fullView = false }: RecentActivityProps) {
  const displayActivities = fullView ? activities : activities.slice(0, 4)

  return (
    <div className="space-y-4">
      {displayActivities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <div className={`${activity.iconBg} p-2 rounded-full mr-4`}>
            <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.description}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

