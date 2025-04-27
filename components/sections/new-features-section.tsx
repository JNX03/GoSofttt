"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Building, FileSearch, BarChart2, Zap, Users, Truck, Smartphone, Globe, Award, Lightbulb } from "lucide-react"

export function NewFeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: Building,
      title: "Company Sustainability Analysis",
      description:
        "Search for any company and get an AI-powered analysis of their sustainability practices and waste management performance.",
      color: "bg-blue-500",
    },
    {
      icon: FileSearch,
      title: "Regulatory Compliance Checker",
      description:
        "Automatically check your waste management practices against local and international regulations to ensure compliance.",
      color: "bg-green-500",
    },
    {
      icon: BarChart2,
      title: "Predictive Waste Analytics",
      description:
        "Use AI to predict future waste generation patterns and optimize your collection and recycling strategies.",
      color: "bg-purple-500",
    },
    {
      icon: Zap,
      title: "Energy Consumption Tracker",
      description:
        "Monitor and analyze your energy usage alongside waste management to get a complete sustainability picture.",
      color: "bg-amber-500",
    },
    {
      icon: Users,
      title: "Stakeholder Engagement Portal",
      description:
        "Engage with employees, customers, and partners through a dedicated portal to promote sustainability initiatives.",
      color: "bg-red-500",
    },
    {
      icon: Truck,
      title: "Smart Collection Routing",
      description:
        "Optimize waste collection routes using AI and real-time traffic data to reduce fuel consumption and emissions.",
      color: "bg-indigo-500",
    },
    {
      icon: Smartphone,
      title: "Mobile Waste Scanning",
      description:
        "Use your smartphone camera to scan waste items and get instant recycling instructions and nearest disposal locations.",
      color: "bg-pink-500",
    },
    {
      icon: Globe,
      title: "ESG Reporting Automation",
      description:
        "Automatically generate Environmental, Social, and Governance (ESG) reports for stakeholders and regulatory bodies.",
      color: "bg-teal-500",
    },
    {
      icon: Award,
      title: "Sustainability Certification Tracker",
      description:
        "Track progress towards sustainability certifications and standards like ISO 14001, LEED, and B Corp.",
      color: "bg-orange-500",
    },
    {
      icon: Lightbulb,
      title: "Innovation Marketplace",
      description:
        "Connect with sustainability startups and innovators to discover and implement cutting-edge waste management solutions.",
      color: "bg-cyan-500",
    },
  ]

  return (
    <section id="new-features" className="py-20 bg-muted/30" ref={ref}>
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Introducing 10 Powerful New Features
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
              Discover our latest innovations designed to revolutionize your sustainability and waste management efforts
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
