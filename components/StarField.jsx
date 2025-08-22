"use client"

import { useRef, useEffect, useCallback } from "react"

const StarField = ({ density = "medium", colors = ["#ffffff", "#a5f3fc", "#c084fc", "#34d399"], opacity = 0.3 }) => {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef()
  const starsRef = useRef([])
  const cometsRef = useRef([])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2) // Limit DPR for performance
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.scale(dpr, dpr)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Optimized density settings
    const densitySettings = {
      light: { stars: 50, comets: 1 },
      medium: { stars: 80, comets: 2 },
      heavy: { stars: 120, comets: 3 },
    }

    const settings = densitySettings[density]

    // Initialize stars with better performance
    const initStars = () => {
      starsRef.current = []
      for (let i = 0; i < settings.stars; i++) {
        const baseOpacity = Math.random() * 0.6 + 0.2
        starsRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 1.5 + 0.5,
          opacity: baseOpacity,
          baseOpacity,
          twinkleSpeed: Math.random() * 0.01 + 0.005,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    // Initialize comets with better performance
    const initComets = () => {
      cometsRef.current = []
      for (let i = 0; i < settings.comets; i++) {
        cometsRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.4 + 0.3,
          trail: [],
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    initStars()
    initComets()

    let lastTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime) => {
      if (currentTime - lastTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }
      lastTime = currentTime

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Optimized star rendering
      starsRef.current.forEach((star) => {
        // Simplified twinkling
        star.opacity = star.baseOpacity + Math.sin(currentTime * star.twinkleSpeed) * 0.3

        ctx.save()
        ctx.globalAlpha = Math.max(0.1, Math.min(0.8, star.opacity)) * opacity
        ctx.fillStyle = star.color
        ctx.shadowBlur = star.size
        ctx.shadowColor = star.color

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Minimal drift
        star.x += Math.sin(currentTime * 0.0001 + star.y) * 0.05
        star.y += Math.cos(currentTime * 0.0001 + star.x) * 0.05

        // Wrap around screen
        if (star.x < 0) star.x = window.innerWidth
        if (star.x > window.innerWidth) star.x = 0
        if (star.y < 0) star.y = window.innerHeight
        if (star.y > window.innerHeight) star.y = 0
      })

      // Optimized comet rendering
      cometsRef.current.forEach((comet) => {
        // Simplified trail management
        comet.trail.push({ x: comet.x, y: comet.y, opacity: comet.opacity })
        if (comet.trail.length > 15) {
          comet.trail.shift()
        }

        // Draw simplified trail
        comet.trail.forEach((point, index) => {
          const trailOpacity = (index / comet.trail.length) * point.opacity * 0.4 * opacity
          if (trailOpacity > 0.05) {
            ctx.save()
            ctx.globalAlpha = trailOpacity
            ctx.fillStyle = comet.color
            ctx.shadowBlur = 4
            ctx.shadowColor = comet.color

            const trailSize = comet.size * (index / comet.trail.length) * 0.4
            ctx.beginPath()
            ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
          }
        })

        // Draw comet head
        ctx.save()
        ctx.globalAlpha = comet.opacity * opacity
        ctx.fillStyle = comet.color
        ctx.shadowBlur = comet.size * 2
        ctx.shadowColor = comet.color

        ctx.beginPath()
        ctx.arc(comet.x, comet.y, comet.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Move comet
        comet.x += comet.vx
        comet.y += comet.vy

        // Wrap around screen
        if (comet.x < -30) comet.x = window.innerWidth + 30
        if (comet.x > window.innerWidth + 30) comet.x = -30
        if (comet.y < -30) comet.y = window.innerHeight + 30
        if (comet.y > window.innerHeight + 30) comet.y = -30

        // Minimal direction changes
        comet.vx += (Math.random() - 0.5) * 0.005
        comet.vy += (Math.random() - 0.5) * 0.005

        // Limit speed
        const speed = Math.sqrt(comet.vx * comet.vx + comet.vy * comet.vy)
        if (speed > 2) {
          comet.vx = (comet.vx / speed) * 2
          comet.vy = (comet.vy / speed) * 2
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [density, colors, opacity, resizeCanvas])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: "transparent",
        opacity: opacity,
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  )
}

export default StarField
