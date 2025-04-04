import type { ReactNode } from "react"

interface NotificationCardProps {
  icon: ReactNode
  bgColor: string
  iconBgColor: string
  title: string
  subtitle: string
}

export function NotificationCard({ icon, bgColor, iconBgColor, title, subtitle }: NotificationCardProps) {
  return (
    <div className={`${bgColor} rounded-3xl p-6`}>
      <div className="flex items-start">
        <div className={`${iconBgColor} rounded-full p-3 mr-4`}>{icon}</div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-gray-700">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}

