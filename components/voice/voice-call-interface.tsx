"use client"

import { useState, useRef, useEffect } from "react"
import { X, Mic, MicOff, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

// Declare SpeechRecognition interface
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export function VoiceCallInterface() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [visualizationSize, setVisualizationSize] = useState(200)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const micStreamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "th-TH"

        recognitionRef.current.onresult = (event) => {
          const current = event.resultIndex
          const transcript = event.results[current][0].transcript
          setTranscript(transcript)
        }

        recognitionRef.current.onend = () => {
          if (isListening) {
            recognitionRef.current?.start()
          }
        }
      }

      synthRef.current = window.speechSynthesis
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null
        recognitionRef.current.onend = null
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop())
      }

      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Handle window resize for visualization
  useEffect(() => {
    const handleResize = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.4
      setVisualizationSize(size)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Setup audio visualization
  useEffect(() => {
    if (!canvasRef.current) return

    const setupVisualization = async () => {
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        }

        if (!analyserRef.current) {
          analyserRef.current = audioContextRef.current.createAnalyser()
          analyserRef.current.fftSize = 256
        }

        if (isListening && !micStreamRef.current) {
          micStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true })
          const source = audioContextRef.current.createMediaStreamSource(micStreamRef.current)
          source.connect(analyserRef.current)
        }

        const drawVisualization = () => {
          if (!canvasRef.current || !analyserRef.current) return

          const canvas = canvasRef.current
          const ctx = canvas.getContext("2d")
          if (!ctx) return

          const width = canvas.width
          const height = canvas.height
          const centerX = width / 2
          const centerY = height / 2
          const radius = Math.min(width, height) / 2 - 10

          // Clear canvas
          ctx.clearRect(0, 0, width, height)

          if (isListening || isSpeaking) {
            const bufferLength = analyserRef.current.frequencyBinCount
            const dataArray = new Uint8Array(bufferLength)

            if (isListening) {
              analyserRef.current.getByteFrequencyData(dataArray)
            } else {
              // Simulate visualization for speaking
              for (let i = 0; i < bufferLength; i++) {
                dataArray[i] = Math.random() * 100 + 50
              }
            }

            // Create gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, height)
            gradient.addColorStop(0, "#ffffff")
            gradient.addColorStop(1, "#3b82f6")

            // Draw circular visualization
            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
            ctx.fillStyle = gradient
            ctx.fill()

            // Draw wave effect
            ctx.lineWidth = 3
            ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"

            for (let i = 0; i < 360; i += 10) {
              const angle = (i * Math.PI) / 180
              const binIndex = Math.floor((i / 360) * bufferLength)
              const value = dataArray[binIndex] / 255

              const x1 = centerX + (radius - 10) * Math.cos(angle)
              const y1 = centerY + (radius - 10) * Math.sin(angle)

              const waveRadius = radius + value * 30
              const x2 = centerX + waveRadius * Math.cos(angle)
              const y2 = centerY + waveRadius * Math.sin(angle)

              ctx.beginPath()
              ctx.moveTo(x1, y1)
              ctx.lineTo(x2, y2)
              ctx.stroke()
            }
          } else {
            // Draw static circle when idle
            const gradient = ctx.createLinearGradient(0, 0, 0, height)
            gradient.addColorStop(0, "#ffffff")
            gradient.addColorStop(1, "#3b82f6")

            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
            ctx.fillStyle = gradient
            ctx.fill()
          }
        }

        const animate = () => {
          drawVisualization()
          animationFrameRef.current = requestAnimationFrame(animate)
        }

        animate()
      } catch (error) {
        console.error("Error setting up audio visualization:", error)
      }
    }

    setupVisualization()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isListening, isSpeaking, canvasRef.current])

  // Handle toggling the microphone
  const toggleListening = async () => {
    if (isListening) {
      setIsListening(false)
      recognitionRef.current?.stop()

      if (transcript.trim()) {
        const newMessages = [...messages, { role: "user", content: transcript }]
        setMessages(newMessages)
        setTranscript("")

        // Process the message and get a response
        try {
          // Simulate API call with a timeout
          setIsSpeaking(true)

          // In a real app, you would call your API here
          setTimeout(() => {
            const botResponse = generateResponse(transcript)
            setResponse(botResponse)
            setMessages([...newMessages, { role: "assistant", content: botResponse }])

            // Speak the response
            if (synthRef.current) {
              utteranceRef.current = new SpeechSynthesisUtterance(botResponse)
              utteranceRef.current.lang = "th-TH"
              utteranceRef.current.onend = () => setIsSpeaking(false)
              synthRef.current.speak(utteranceRef.current)
            }
          }, 1000)
        } catch (error) {
          console.error("Error processing message:", error)
          setIsSpeaking(false)
        }
      }

      // Stop microphone stream
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop())
        micStreamRef.current = null
      }
    } else {
      try {
        // Stop any ongoing speech
        if (synthRef.current) {
          synthRef.current.cancel()
          setIsSpeaking(false)
        }

        setIsListening(true)
        recognitionRef.current?.start()
      } catch (error) {
        console.error("Error starting speech recognition:", error)
      }
    }
  }

  // Stop speaking
  const stopSpeaking = () => {
    if (synthRef.current && isSpeaking) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  // Close the call interface
  const handleClose = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }

    if (synthRef.current) {
      synthRef.current.cancel()
    }

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop())
    }

    // Navigate back to dashboard
    window.location.href = "/dashboard"
  }

  // Simple response generator (replace with actual API call)
  const generateResponse = (input: string) => {
    const responses = [
      "ขอบคุณสำหรับข้อความของคุณ ฉันสามารถช่วยอะไรคุณได้อีกไหม?",
      "ฉันเข้าใจแล้ว มีอะไรอีกไหมที่คุณอยากให้ฉันช่วย?",
      "ขอบคุณที่แชร์ข้อมูลนี้ ฉันจะช่วยคุณจัดการกับเรื่องนี้",
      "ฉันกำลังประมวลผลข้อมูลของคุณ โปรดรอสักครู่",
      "ฉันพบข้อมูลที่คุณต้องการแล้ว ต้องการให้ฉันอธิบายเพิ่มเติมไหม?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-black text-white">
      <div className="absolute right-4 top-4">
        <button
          onClick={handleClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <canvas ref={canvasRef} width={visualizationSize} height={visualizationSize} className="mb-8" />

        {transcript && isListening && (
          <div className="mb-8 max-w-md text-center text-lg text-gray-300">{transcript}</div>
        )}

        <div className="flex gap-4">
          <button
            onClick={toggleListening}
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full transition-all",
              isListening ? "bg-red-600 text-white hover:bg-red-700" : "bg-blue-600 text-white hover:bg-blue-700",
            )}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
          </button>

          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-700 text-white transition-all hover:bg-gray-600"
              aria-label="Stop speaking"
            >
              <VolumeX className="h-8 w-8" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
