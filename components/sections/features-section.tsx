"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Recycle, BarChart3, Leaf, MapPin, Bell, MessageSquare, Award } from "lucide-react"

const features = [
  {
    icon: Recycle,
    title: "Waste Management",
    description:
      "Track and manage your waste with our intuitive dashboard. Sort by type and monitor your recycling progress.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Get detailed insights into your environmental impact with real-time data visualization and reporting.",
  },
  {
    icon: Leaf,
    title: "Carbon Footprint Tracking",
    description: "Monitor your CO2 emissions reduction and see the positive impact you're making on the environment.",
  },
  {
    icon: MapPin,
    title: "Recycling Locations",
    description: "Find nearby recycling centers and waste collection points with our interactive map.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Receive timely alerts about waste collection schedules and recycling opportunities in your area.",
  },
  {
    icon: MessageSquare,
    title: "AI Assistant",
    description: "Get help from our AI assistant to answer your questions about waste management and sustainability.",
  },
  {
    icon: Award,
    title: "Rewards Program",
    description: "Earn points for your recycling efforts and redeem them for eco-friendly products and services.",
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="features" className="py-20 bg-muted/50" ref={ref}>
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful Features for a Greener Future
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Our platform provides all the tools you need to manage your environmental impact effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
