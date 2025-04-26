"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Map, FileText, Megaphone, Calculator, TrendingUp, Target, DollarSign, Recycle } from "lucide-react"

export function AdvancedFeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Gain deep insights into your waste management with real-time data visualization and comprehensive reporting.",
      color: "bg-blue-500",
    },
    {
      icon: Map,
      title: "Interactive Recycling Map",
      description:
        "Find and compare recycling centers, collection points, and waste management facilities with our interactive map.",
      color: "bg-green-500",
    },
    {
      icon: FileText,
      title: "AI Document Analysis",
      description: "Upload waste management reports and documents for AI-powered analysis and actionable insights.",
      color: "bg-purple-500",
    },
    {
      icon: Megaphone,
      title: "Marketing Campaign Manager",
      description:
        "Create and manage sustainability campaigns to engage your audience and promote recycling initiatives.",
      color: "bg-amber-500",
    },
    {
      icon: Calculator,
      title: "Cost Calculator",
      description: "Calculate and optimize your waste management costs with our comprehensive cost calculator.",
      color: "bg-red-500",
    },
    {
      icon: TrendingUp,
      title: "Competitor Comparison",
      description: "Compare your waste management performance with industry benchmarks and competitors.",
      color: "bg-indigo-500",
    },
    {
      icon: Target,
      title: "Targeted Marketing",
      description: "Reach specific audience segments with tailored sustainability and recycling campaigns.",
      color: "bg-pink-500",
    },
    {
      icon: DollarSign,
      title: "ROI Analysis",
      description: "Calculate the return on investment for your sustainability initiatives and recycling programs.",
      color: "bg-teal-500",
    },
    {
      icon: Recycle,
      title: "Optimization Recommendations",
      description: "Get AI-powered recommendations to optimize your waste management processes and reduce costs.",
      color: "bg-orange-500",
    },
  ]

  return (
    <section id="advanced-features" className="py-20" ref={ref}>
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Advanced Features for Data-Driven Decisions
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
              Our platform provides powerful tools for analytics, cost optimization, and marketing to help you make
              informed decisions and maximize your sustainability impact.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div
                    className={`${feature.color} text-white rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
