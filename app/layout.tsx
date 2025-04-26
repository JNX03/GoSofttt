import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/ui/toast"
import { NotificationProvider } from "@/components/ui/notification-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Waste to ValueXGosoft - TD สั่งลุย",
  description: "Track, manage, and reduce your environmental impact with our waste management platform.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <NotificationProvider>
            <ToastProvider>{children}</ToastProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
