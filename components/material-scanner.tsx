"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, Upload, Check, X, Loader2, Info } from "lucide-react"
import { useNotification } from "@/components/ui/notification-toast"

export function MaterialScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<null | { recyclable: boolean; material: string; tips: string }>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { addNotification } = useNotification()

  // Materials database for identification
  const materialDatabase = [
    {
      id: 1,
      name: "PET Plastic",
      recyclable: true,
      pattern: "triangle with number 1",
      tips: "Commonly used for water bottles. Rinse before recycling.",
    },
    {
      id: 2,
      name: "HDPE Plastic",
      recyclable: true,
      pattern: "triangle with number 2",
      tips: "Used for milk jugs and detergent bottles. Highly recyclable.",
    },
    {
      id: 3,
      name: "PVC",
      recyclable: false,
      pattern: "triangle with number 3",
      tips: "Difficult to recycle. Check with local facilities.",
    },
    {
      id: 4,
      name: "LDPE Plastic",
      recyclable: true,
      pattern: "triangle with number 4",
      tips: "Used for plastic bags. Many grocery stores collect these.",
    },
    {
      id: 5,
      name: "PP Plastic",
      recyclable: true,
      pattern: "triangle with number 5",
      tips: "Used for yogurt containers and bottle caps.",
    },
    {
      id: 6,
      name: "PS Plastic",
      recyclable: false,
      pattern: "triangle with number 6",
      tips: "Styrofoam is difficult to recycle in most areas.",
    },
    {
      id: 7,
      name: "Aluminum",
      recyclable: true,
      pattern: "shiny metal",
      tips: "Highly recyclable. Rinse before recycling.",
    },
    {
      id: 8,
      name: "Glass",
      recyclable: true,
      pattern: "transparent",
      tips: "Highly recyclable. Remove caps and rinse.",
    },
    {
      id: 9,
      name: "Paper",
      recyclable: true,
      pattern: "fibrous texture",
      tips: "Recycle clean, dry paper. Avoid greasy or food-contaminated paper.",
    },
    {
      id: 10,
      name: "Cardboard",
      recyclable: true,
      pattern: "brown, corrugated",
      tips: "Flatten boxes before recycling.",
    },
  ]

  const startCamera = async () => {
    setIsScanning(true)
    setResult(null)
    setImagePreview(null)

    try {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      addNotification({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        type: "error",
        duration: 5000,
      })
      setIsScanning(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsScanning(false)
  }

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
        const imageDataUrl = canvas.toDataURL("image/jpeg")
        setImagePreview(imageDataUrl)
        analyzeImage(imageDataUrl)
        stopCamera()
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setImagePreview(event.target.result)
          analyzeImage(event.target.result)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = (imageData: string) => {
    setIsAnalyzing(true)

    // In a real app, this would call an AI image recognition API
    // For demo purposes, we'll simulate analysis with a timeout and random result
    setTimeout(() => {
      // Randomly select a material from our database
      const randomMaterial = materialDatabase[Math.floor(Math.random() * materialDatabase.length)]

      setResult({
        recyclable: randomMaterial.recyclable,
        material: randomMaterial.name,
        tips: randomMaterial.tips,
      })

      setIsAnalyzing(false)
    }, 2000)
  }

  const resetScanner = () => {
    setResult(null)
    setImagePreview(null)
    setIsScanning(false)
    setIsAnalyzing(false)
  }

  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <Camera className="mr-2 h-5 w-5" />
          Material Identification Scanner
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Scan or upload an image to identify if an item is recyclable
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="space-y-4">
          {!isScanning && !imagePreview && !result && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={startCamera} className="w-full sm:flex-1">
                <Camera className="mr-2 h-4 w-4" />
                Scan with Camera
              </Button>
              <div className="relative w-full sm:flex-1">
                <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
                <Input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </div>
            </div>
          )}

          {isScanning && (
            <div className="space-y-4">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 border-2 border-dashed border-white/50 pointer-events-none"></div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={stopCamera}>
                  Cancel
                </Button>
                <Button onClick={captureImage}>Capture</Button>
              </div>
            </div>
          )}

          {imagePreview && !result && (
            <div className="space-y-4">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Captured"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
              {isAnalyzing ? (
                <div className="flex justify-center items-center p-4">
                  <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary mr-2" />
                  <p className="text-sm sm:text-base">Analyzing material...</p>
                </div>
              ) : (
                <div className="flex justify-between">
                  <Button variant="outline" onClick={resetScanner}>
                    Cancel
                  </Button>
                  <Button onClick={() => analyzeImage(imagePreview)}>Analyze</Button>
                </div>
              )}
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <img
                  src={imagePreview! || "/placeholder.svg"}
                  alt="Analyzed"
                  className="absolute inset-0 w-full h-full object-contain"
                />
                <div
                  className={`absolute top-2 right-2 ${result.recyclable ? "bg-green-500" : "bg-red-500"} text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium`}
                >
                  {result.recyclable ? "Recyclable" : "Not Recyclable"}
                </div>
              </div>

              <div
                className={`p-3 sm:p-4 rounded-lg ${result.recyclable ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
              >
                <div className="flex items-start">
                  {result.recyclable ? (
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">Identified as: {result.material}</h3>
                    <p className="text-xs sm:text-sm mt-1">{result.tips}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
                <Button variant="outline" onClick={resetScanner} className="w-full sm:w-auto order-2 sm:order-1">
                  Scan Another
                </Button>
                <Button
                  onClick={() => {
                    addNotification({
                      title: "Item Added",
                      description: `${result.material} has been added to your recycling log.`,
                      type: "success",
                      duration: 3000,
                    })
                  }}
                  className="w-full sm:w-auto order-1 sm:order-2"
                >
                  Log This Item
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4 px-4 sm:px-6 text-center">
        <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
          <Info className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
          <span>This scanner uses AI to identify materials. Results may vary.</span>
        </div>
      </CardFooter>
    </Card>
  )
}
