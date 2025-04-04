"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "EcoTrack has completely transformed how our company manages waste. The analytics and reporting features have helped us reduce our environmental impact by 30%.",
    name: "Sarah Johnson",
    title: "Sustainability Director, GreenTech Inc.",
    avatar: "/avatars/sarah.jpg",
    initials: "SJ",
  },
  {
    quote:
      "The recycling location feature is a game-changer. I can easily find the nearest recycling centers for different types of waste, making it so much easier to be environmentally responsible.",
    name: "Michael Chen",
    title: "Environmental Activist",
    avatar: "/avatars/michael.jpg",
    initials: "MC",
  },
  {
    quote:
      "As a small business owner, I appreciate how EcoTrack simplifies waste management. The rewards program has also been a great incentive for our team to participate actively.",
    name: "Emma Rodriguez",
    title: "Owner, Eco Café",
    avatar: "/avatars/emma.jpg",
    initials: "ER",
  },
  {
    quote:
      "The AI assistant is incredibly helpful. It answers all my questions about proper waste disposal and provides valuable tips for reducing my carbon footprint.",
    name: "David Kim",
    title: "Homeowner",
    avatar: "/avatars/david.jpg",
    initials: "DK",
  },
  {
    quote:
      "We've implemented EcoTrack across our entire school district, and the results have been phenomenal. Students are more engaged in recycling, and we've seen a significant reduction in waste.",
    name: "Patricia Nguyen",
    title: "School District Sustainability Coordinator",
    avatar: "/avatars/patricia.jpg",
    initials: "PN",
  },
  {
    quote:
      "The real-time analytics have been invaluable for our municipality's waste management program. We can now make data-driven decisions that benefit our community and the environment.",
    name: "Robert Taylor",
    title: "City Environmental Manager",
    avatar: "/avatars/robert.jpg",
    initials: "RT",
  },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="testimonials" className="py-20" ref={ref}>
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Discover how EcoTrack is helping individuals and organizations make a positive environmental impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary/40 mb-4" />
                  <p className="text-muted-foreground">{testimonial.quote}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

