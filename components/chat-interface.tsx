"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, Loader2 } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function ChatInterface() {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm">
        <div className="max-h-[300px] overflow-y-auto mb-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex items-start">
              {msg.role === "assistant" && (
                <div className="mr-4 bg-green-100 p-3 rounded-full">
                  <Bot className="h-8 w-8 text-green-600" />
                </div>
              )}
              <div
                className={`rounded-2xl p-4 max-w-[80%] ${
                  msg.role === "assistant" ? "bg-gray-100" : "bg-blue-100 ml-auto"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start">
              <div className="mr-4 bg-green-100 p-3 rounded-full">
                <Bot className="h-8 w-8 text-green-600" />
              </div>
              <div className="bg-gray-100 rounded-2xl p-4 flex items-center">
                <Loader2 className="h-5 w-5 text-gray-500 animate-spin mr-2" />
                <p>Thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="relative mt-6">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
            }}
          >
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type here"
              className="pr-12 py-6 rounded-full bg-gray-100 border-0"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1 h-10 w-10 rounded-full bg-purple-500 hover:bg-purple-600"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
