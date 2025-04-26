"use client"

import { useState, useEffect, createContext, useContext } from "react"
import type { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export type NotificationType = "default" | "success" | "warning" | "error" | "info"

export type NotificationProps = {
  id: string
  title: string
  description?: string
  type?: NotificationType
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

type NotificationContextType = {
  notifications: NotificationProps[]
  addNotification: (notification: Omit<NotificationProps, "id">) => void
  dismissNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationProps[]>([])

  const addNotification = (notification: Omit<NotificationProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setNotifications((prev) => [...prev, { id, ...notification }])
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, dismissNotification }}>
      {children}
      <NotificationToast />
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

function NotificationToast() {
  const { notifications, dismissNotification } = useNotification()

  return (
    <div className="fixed top-16 right-4 z-50 w-full max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onDismiss={() => dismissNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

function NotificationItem({
  notification,
  onDismiss,
}: {
  notification: NotificationProps
  onDismiss: () => void
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss()
    }, notification.duration || 5000)

    return () => clearTimeout(timer)
  }, [notification, onDismiss])

  const getTypeStyles = (type: NotificationType = "default") => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800"
      case "warning":
        return "bg-amber-50 border-amber-200 text-amber-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800"
      default:
        return "bg-white border-gray-200"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`mb-3 rounded-lg border shadow-lg ${getTypeStyles(notification.type)}`}
    >
      <div className="flex items-start p-4">
        <div className="flex-1">
          <h3 className="font-medium">{notification.title}</h3>
          {notification.description && <p className="mt-1 text-sm opacity-90">{notification.description}</p>}
          {notification.action && (
            <Button
              variant="link"
              className="mt-2 h-auto p-0 text-sm font-medium"
              onClick={notification.action.onClick}
            >
              {notification.action.label}
            </Button>
          )}
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={onDismiss}>
          <X className="h-3 w-3" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </motion.div>
  )
}
