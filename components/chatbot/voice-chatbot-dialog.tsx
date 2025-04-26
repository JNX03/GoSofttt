"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, X, Bot, Loader2, Mic, Volume2, VolumeX } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface VoiceChatbotDialogProps {
  onClose: () => void
}

export function VoiceChatbotDialog({ onClose }: VoiceChatbotDialogProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "สวัสดี Gosoft ! ผมชื่อกรีน\n\nวันนี้ผมจะมาช่วยคุณจัดการขยะรวมถึงบริการทรัพยากร มีเรื่องไหนอยากให้ช่วยเหลือไหมครับ!\n\nHello Gosoft! My name is Green. Today, I will help you manage your waste. Including resource services, if there is anything you want me to help with, please let me know!",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis
    }

    // Initialize speech recognition
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      // @ts-ignore - webkitSpeechRecognition is not in the types
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "th-TH" // Set language to Thai

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setMessage(transcript)
        // Auto-send the message after voice recognition
        setTimeout(() => {
          sendMessage(transcript)
        }, 500)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
      }
    }

    return () => {
      // Clean up
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (error) {
        console.error("Failed to start speech recognition:", error)
      }
    } else {
      alert("Speech recognition is not supported in your browser.")
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speakText = (text: string) => {
    if (synthRef.current) {
      // Cancel any ongoing speech
      synthRef.current.cancel()

      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "th-TH" // Set language to Thai
      utterance.rate = 1.0
      utterance.pitch = 1.0

      // Set event handlers
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event)
        setIsSpeaking(false)
      }

      // Speak the text
      synthRef.current.speak(utterance)
    } else {
      alert("Speech synthesis is not supported in your browser.")
    }
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const sendMessage = async (text?: string) => {
    const messageToSend = text || message
    if (!messageToSend.trim() || isLoading) return

    // Add user message to chat
    const userMessage = { role: "user" as const, content: messageToSend }
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
        const assistantMessage = { role: "assistant", content: data.choices[0].message.content }
        setMessages((prev) => [...prev, assistantMessage])

        // Automatically speak the response
        speakText(assistantMessage.content)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage = "Sorry, I'm having trouble connecting right now. Please try again later."
      setMessages((prev) => [...prev, { role: "assistant", content: errorMessage }])

      // Speak the error message
      speakText(errorMessage)
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
          <h3 className="font-medium">EcoTrack Voice Assistant</h3>
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
              {msg.role === "assistant" && (
                <div className="mt-2 flex justify-end">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => (isSpeaking ? stopSpeaking() : speakText(msg.content))}
                        >
                          {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isSpeaking ? "Stop speaking" : "Speak message"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
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
        {isListening && (
          <div className="flex justify-center">
            <div className="rounded-lg p-3 bg-red-100">
              <div className="flex items-center space-x-2">
                <Mic className="h-4 w-4 text-red-500 animate-pulse" />
                <p className="text-sm">Listening...</p>
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
            placeholder="Type here or click mic to speak"
            className="flex-1"
            disabled={isLoading || isListening}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  variant={isListening ? "destructive" : "outline"}
                  onClick={isListening ? stopListening : startListening}
                  disabled={isLoading}
                >
                  <Mic className={`h-4 w-4 ${isListening ? "animate-pulse" : ""}`} />
                  <span className="sr-only">{isListening ? "Stop listening" : "Start listening"}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isListening ? "Stop listening" : "Speak in Thai"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button type="submit" size="icon" disabled={isLoading || isListening || !message.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </motion.div>
  )
}
