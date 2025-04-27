"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Recycle, Leaf, BarChart3 } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/10 to-transparent opacity-50" />
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  WasteTD
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  EcoTrack helps you monitor your waste management, reduce your carbon footprint, and make a positive
                  impact on the environment.
                </p>
              </motion.div>
            </div>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/register">
                <Button size="lg" className="w-full min-[400px]:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/#features">
                <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                  Learn More
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center space-x-4 text-sm"
            >
              <div className="flex items-center space-x-1">
                <Recycle className="h-4 w-4 text-primary" />
                <span>Waste Management</span>
              </div>
              <div className="flex items-center space-x-1">
                <Leaf className="h-4 w-4 text-primary" />
                <span>Carbon Tracking</span>
              </div>
              <div className="flex items-center space-x-1">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span>Analytics</span>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px] aspect-square rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-border rounded-xl">
                <div className="absolute inset-0 bg-[url('/dashboard-preview.png')] bg-cover bg-center opacity-90 mix-blend-overlay" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="h-4 w-24 bg-muted rounded" />
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <div className="bg-muted rounded p-2">
                      <div className="h-2 w-12 bg-primary/50 rounded mb-2" />
                      <div className="h-8 w-full bg-primary/20 rounded" />
                    </div>
                    <div className="bg-muted rounded p-2">
                      <div className="h-2 w-12 bg-primary/50 rounded mb-2" />
                      <div className="h-8 w-full bg-primary/20 rounded" />
                    </div>
                    <div className="col-span-2 bg-muted rounded p-2">
                      <div className="h-2 w-12 bg-primary/50 rounded mb-2" />
                      <div className="h-20 w-full bg-primary/20 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
