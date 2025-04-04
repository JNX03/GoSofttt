import { Badge } from "@/components/ui/badge"
import { Phone, Recycle, Trash2, Award } from "lucide-react"

interface Task {
  id: number
  type: string
  location: string
  status: "complete" | "delivery" | "waiting"
  reward?: number
}

export function TaskList() {
  const tasks: Task[] = [
    {
      id: 1,
      type: "Plastic waste",
      location: "22 Recycle Recycling Center Chiang Mai",
      status: "complete",
      reward: 20,
    },
    {
      id: 2,
      type: "Plastic waste",
      location: "22 Recycle Recycling Center Chiang Mai",
      status: "complete",
      reward: 20,
    },
    {
      id: 3,
      type: "Plastic waste",
      location: "22 Recycle Recycling Center Chiang Mai",
      status: "delivery",
    },
    {
      id: 4,
      type: "Metal waste",
      location: "22 Recycle Recycling Center Chiang Mai",
      status: "waiting",
    },
  ]

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center bg-white rounded-xl p-3">
          <div className="mr-3 bg-gray-100 p-2 rounded-full">
            {task.type.includes("Plastic") ? (
              <Recycle className="h-5 w-5 text-green-500" />
            ) : (
              <Trash2 className="h-5 w-5 text-blue-500" />
            )}
          </div>
          <div className="flex-grow">
            <p className="font-medium">{task.type}</p>
            <p className="text-xs text-gray-500">{task.location}</p>
          </div>
          <div className="flex items-center">
            {task.status === "complete" && (
              <>
                <Badge className="bg-green-500 mr-2">Complete</Badge>
                {task.reward && (
                  <div className="flex items-center bg-amber-100 rounded-full px-2 py-1">
                    <Award className="h-4 w-4 text-amber-500 mr-1" />
                    <span className="text-amber-800 text-xs font-bold">{task.reward}$RGN</span>
                  </div>
                )}
              </>
            )}
            {task.status === "delivery" && (
              <>
                <Badge className="bg-amber-500 mr-2">Delivery</Badge>
                <div className="bg-blue-100 rounded-full p-2">
                  <Phone className="h-4 w-4 text-blue-500" />
                </div>
                <span className="ml-1 text-blue-500 font-medium">CALL</span>
              </>
            )}
            {task.status === "waiting" && (
              <>
                <Badge className="bg-red-500 mr-2">Waiting</Badge>
                <div className="bg-blue-100 rounded-full p-2">
                  <Phone className="h-4 w-4 text-blue-500" />
                </div>
                <span className="ml-1 text-blue-500 font-medium">CALL</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

