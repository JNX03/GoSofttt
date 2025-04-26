"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, X, Bot, Loader2 } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatbotDialogProps {
  onClose: () => void
}

export function ChatbotDialog({ onClose }: ChatbotDialogProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "สวัสดี Gosoft ! ผมชื่อกรีน\n\nวันนี้ผมจะมาช่วยคุณจัดการขยะรวมถึงบริการทรัพยากร มีเรื่องไหนอยากให้ช่วยเหลือไหมครับ!\n\nHello Gosoft! My name is Green. Today, I will help you manage your waste. Including resource services, if there is anything you want me to help with, please let me know!",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return

    // Add user message to chat
    const userMessage = { role: "user" as const, content: message }
    setMessages((prev) => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)

    try {
      const url = "https://chat.jnx03.xyz/api"

      const headers = {
        Authorization: "Bearer Jnx03Authen-21sadfsdl;joi23oinoisjeoi2joijLKsnb3ilBDJVNl3isl2",
        "Content-Type": "application/json",
      }

      const allMessages = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      const payload = {
        model: "Jxxn03z-V1-70B",
        max_tokens: 512,
        messages: allMessages,
        temperature: 0.4,
        top_p: 0.9,
        top_k: 0,
        repetition_penalty: 1.05,
        min_p: 0.05,
      }

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (data.choices && data.choices[0] && data.choices[0].message) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.choices[0].message.content }])
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again later." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <motion.div
      className="fixed bottom-20 right-4 z-50 w-[350px] md:w-[400px] bg-background rounded-lg shadow-xl border border-border overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-1 rounded-full">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-medium">EcoTrack Assistant</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="h-[350px] overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-muted">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex space-x-2"
        >
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type here"
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !message.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </motion.div>
  )
}
