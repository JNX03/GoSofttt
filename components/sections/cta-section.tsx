"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20" ref={ref}>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-lg bg-primary p-8 md:p-12"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-foreground/20 opacity-90" />
          <div className="relative z-10 text-center space-y-6 md:w-3/4 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-foreground">
              Ready to Make a Difference?
            </h2>
            <p className="text-primary-foreground/90 md:text-xl">
              Join thousands of individuals and organizations who are using EcoTrack to reduce their environmental
              impact and create a more sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
                >
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
