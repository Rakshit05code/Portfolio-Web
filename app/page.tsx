"use client"

import { useEffect, useState } from "react"
import LoadingScreen from "@/components/LoadingScreen"
import SmoothScroll from "@/components/SmoothScroll"
import CustomCursor from "@/components/CustomCursor"
import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import ProjectSection from "@/components/ProjectSection"
import CertificateSection from "@/components/CertificateSection"
import AnalyticsSection from "@/components/AnalyticsSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Auto-complete loading after 4 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    // Disable F12, Ctrl+Shift+I, Ctrl+U
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && e.key === "u")) {
        e.preventDefault()
      }
    }

    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <SmoothScroll>
      <main className="relative">
        <CustomCursor />
        <Header />
        <div className="fade-in">
          <HeroSection />
        </div>
        <div className="fade-in">
          <AboutSection />
        </div>
        <div className="fade-in">
          <ProjectSection />
        </div>
        <div className="fade-in">
          <CertificateSection />
        </div>
        <div className="fade-in">
          <AnalyticsSection />
        </div>
        <div className="fade-in">
          <ContactSection />
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  )
}
