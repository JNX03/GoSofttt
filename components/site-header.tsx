"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <Logo />

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/#features"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/#features" ? "text-foreground" : "text-foreground/60",
            )}
          >
            Features
          </Link>
          <Link
            href="/#testimonials"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/#testimonials" ? "text-foreground" : "text-foreground/60",
            )}
          >
            Testimonials
          </Link>
          <Link
            href="/#pricing"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/#pricing" ? "text-foreground" : "text-foreground/60",
            )}
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/#features" className="text-foreground/60 hover:text-foreground transition-colors">
                  Features
                </Link>
                <Link href="/#testimonials" className="text-foreground/60 hover:text-foreground transition-colors">
                  Testimonials
                </Link>
                <Link href="/#pricing" className="text-foreground/60 hover:text-foreground transition-colors">
                  Pricing
                </Link>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Log in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="w-full">
                    Sign up
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
