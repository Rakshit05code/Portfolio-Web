"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const SmoothScroll = ({ children }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Optimized scroll behavior
    document.documentElement.style.scrollBehavior = "smooth"

    // Reduced animations for better performance
    gsap.set("section", { opacity: 0, y: 30 })

    gsap.to("section", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "section",
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
    })

    // Optimized parallax effects
    gsap.utils.toArray(".parallax").forEach((element) => {
      gsap.to(element, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    })

    // Optimized fade in animations
    gsap.utils.toArray(".fade-in").forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    // Optimized scale animations
    gsap.utils.toArray(".scale-in").forEach((element) => {
      gsap.fromTo(
        element,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="smooth-scroll-container">
      {children}
    </div>
  )
}

export default SmoothScroll
