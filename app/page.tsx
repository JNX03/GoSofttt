import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { CTASection } from "@/components/sections/cta-section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import { AdvancedFeaturesSection } from "@/components/sections/advanced-features-section"
import { NewFeaturesSection } from "@/components/sections/new-features-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <AdvancedFeaturesSection />
        <NewFeaturesSection />
        <PricingSection />
        <CTASection />
      </main>
      <SiteFooter />
      <ChatbotButton />
    </div>
  )
}
