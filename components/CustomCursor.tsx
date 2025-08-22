"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorBorderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if device supports hover (not mobile)
    const hasHover = window.matchMedia("(hover: hover)").matches
    if (!hasHover) return

    const cursor = cursorRef.current
    const cursorBorder = cursorBorderRef.current

    if (!cursor || !cursorBorder) return

    // Hide default cursor
    document.body.style.cursor = "none"

    gsap.set([cursor, cursorBorder], {
      xPercent: -50,
      yPercent: -50,
      scale: 1,
    })

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" })
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" })
    const xToBorder = gsap.quickTo(cursorBorder, "x", { duration: 0.4, ease: "power3.out" })
    const yToBorder = gsap.quickTo(cursorBorder, "y", { duration: 0.4, ease: "power3.out" })

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      xToBorder(e.clientX)
      yToBorder(e.clientY)
    }

    const handleMouseDown = () => {
      gsap.to([cursor, cursorBorder], {
        scale: 0.7,
        duration: 0.2,
      })
    }

    const handleMouseUp = () => {
      gsap.to([cursor, cursorBorder], {
        scale: 1,
        duration: 0.2,
      })
    }

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 0.5,
        duration: 0.3,
      })
      gsap.to(cursorBorder, {
        scale: 2,
        duration: 0.3,
      })
    }

    const handleMouseLeave = () => {
      gsap.to([cursor, cursorBorder], {
        scale: 1,
        duration: 0.3,
      })
    }

    // Event listeners
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea')
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.body.style.cursor = "auto"
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-screen hidden lg:block"
        style={{ willChange: "transform" }}
      />
      <div
        ref={cursorBorderRef}
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-400/50 rounded-full pointer-events-none z-[9999] mix-blend-screen hidden lg:block"
        style={{ willChange: "transform" }}
      />
    </>
  )
}

export default CustomCursor
