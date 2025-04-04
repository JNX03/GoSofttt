"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/toast"
import { isAuthenticated } from "@/lib/auth"

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to access the dashboard.",
      })
      router.push("/login")
    }
  }, [router, toast])

  // If not authenticated, don't render children
  if (!isAuthenticated() && typeof window !== "undefined") {
    return null
  }

  return <>{children}</>
}

