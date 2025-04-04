"use client"

import { useState, useEffect, createContext, useContext } from "react"
import type { ReactNode } from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

type ToastContextType = {
  toast: (props: ToastProps) => void
  dismiss: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastProps | null>(null)
  const [open, setOpen] = useState(false)

  const showToast = (props: ToastProps) => {
    setToast(props)
    setOpen(true)
  }

  const dismissToast = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (open && toast?.duration) {
      const timer = setTimeout(() => {
        setOpen(false)
      }, toast.duration)
      return () => clearTimeout(timer)
    }
  }, [open, toast])

  return (
    <ToastContext.Provider value={{ toast: showToast, dismiss: dismissToast }}>
      {children}
      {open && toast && (
        <div className="fixed bottom-4 right-4 z-50 max-w-md">
          <div
            className={`rounded-lg border p-4 shadow-md ${toast.variant === "destructive" ? "bg-destructive text-destructive-foreground" : "bg-background"}`}
          >
            {toast.title && <div className="font-medium">{toast.title}</div>}
            {toast.description && <div className="mt-1 text-sm">{toast.description}</div>}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

