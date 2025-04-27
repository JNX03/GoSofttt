"use client"
import { VoiceCallInterface } from "@/components/voice/voice-call-interface"
import { AuthCheck } from "@/components/auth/auth-check"

export default function VoiceCallPage() {
  return (
    <AuthCheck>
      <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center bg-black">
        <VoiceCallInterface />
      </div>
    </AuthCheck>
  )
}
