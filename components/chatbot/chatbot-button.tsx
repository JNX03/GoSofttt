"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, X } from "lucide-react"
import { ChatbotDialog } from "@/components/chatbot/chatbot-dialog"
import { motion, AnimatePresence } from "framer-motion"

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPulse, setShowPulse] = useState(false)
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)

  useEffect(() => {
    const pulseTimer = setTimeout(() => {
      setShowPulse(true)
    }, 3000)

    const welcomeTimer = setTimeout(() => {
      setShowWelcomeMessage(true)
    }, 5000)

    return () => {
      clearTimeout(pulseTimer)
      clearTimeout(welcomeTimer)
    }
  }, [])

  return (
    <>
      <AnimatePresence>{isOpen && <ChatbotDialog onClose={() => setIsOpen(false)} />}</AnimatePresence>

      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="relative">
          {showPulse && !isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary"
              initial={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 1.5 }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                repeatType: "loop",
              }}
            />
          )}
          <Button
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg relative"
            onClick={() => {
              setIsOpen(true)
              setShowPulse(false)
              setShowWelcomeMessage(false)
            }}
          >
            <MessageSquare className="h-6 w-6" />
            <span className="sr-only">Open chatbot</span>
          </Button>
          {showPulse && !isOpen && (
            <motion.div
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              1
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {showWelcomeMessage && !isOpen && (
            <motion.div
              className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 w-64 border border-gray-200"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6"
                onClick={() => setShowWelcomeMessage(false)}
              >
                <X className="h-3 w-3" />
              </Button>
              <p className="text-sm">👋 สวัสดี! ต้องการความช่วยเหลือเกี่ยวกับการจัดการขยะหรือความยั่งยืนไหม? ผมพร้อมช่วยคุณ!</p>
              <div className="absolute -bottom-2 right-5 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

