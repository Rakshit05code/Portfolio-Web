"use client"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"
import { FiDownload, FiArrowDown, FiCode, FiZap, FiCpu, FiGlobe, FiShield } from "react-icons/fi"
import StarField from "./StarField"

// Optimized and faster typing animation
function useAdvancedTyping(texts, speed = 40) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const currentText = useMemo(() => texts[currentIndex], [texts, currentIndex])

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 1500) // Reduced pause time
      return () => clearTimeout(pauseTimeout)
    }

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayed.length < currentText.length) {
            setDisplayed(currentText.slice(0, displayed.length + 1))
          } else {
            setIsPaused(true)
          }
        } else {
          if (displayed.length > 0) {
            setDisplayed(displayed.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? speed / 2 : speed, // Faster typing and deleting
    )

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, isPaused, currentText, speed])

  return { displayed, isDeleting }
}

// Memoized stats component for better performance
const CleanStats = () => {
  const stats = useMemo(
    () => [
      { label: "Projects", value: "30+", icon: FiCode },
      { label: "Clients", value: "15+", icon: FiGlobe },
      { label: "Experience", value: "1Y+", icon: FiCpu },
      { label: "Security Tools", value: "15+", icon: FiShield },
    ],
    [],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mt-12 lg:mt-16"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 1.4 + i * 0.05 }}
          className="text-center group"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:bg-white/10 transition-all duration-300 group-hover:scale-105">
            <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-400 mx-auto mb-2 lg:mb-3" />
            <div className="text-xl lg:text-3xl font-orbitron font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs lg:text-sm text-cyan-300 font-rajdhani tracking-wider uppercase">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

const HeroSection = () => {
  // Enhanced titles with better emoji support
  const titles = useMemo(
    () => [
      { text: "Web Developer", emoji: "" },
      { text: "Cyber Security Enthusiast", emoji: "" },
      { text: "Building Secure Web Apps", emoji: "" },
      { text: "Always Learning New Tech", emoji: "" },
    ],
    [],
  )

  const { displayed } = useAdvancedTyping(
    titles.map((t) => `${t.text} ${t.emoji}`),
    35,
  )

  // Memoized background style for performance
  const backgroundStyle = useMemo(
    () => ({
      background: `
      radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 20% 80%, rgba(167, 139, 250, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(52, 211, 153, 0.08) 0%, transparent 50%),
      linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)
    `,
    }),
    [],
  )

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-8 lg:px-32 py-16 lg:py-20 overflow-hidden"
      style={backgroundStyle}
    >
      {/* Optimized Star Field - Reduced opacity and density for better performance */}
      <div className="absolute inset-0 z-0">
        <StarField density="medium" colors={["#00d4ff", "#a855f7", "#34d399", "#f59e0b"]} opacity={0.4} />
      </div>

      {/* Simplified background image */}
      <div
        className="absolute inset-0 opacity-15 lg:opacity-25 z-1"
        style={{
          backgroundImage: "url('/images/cyberpunk-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Reduced light flares for better performance */}
      <div className="absolute inset-0 pointer-events-none z-2">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 lg:w-72 lg:h-72 bg-cyan-400/15 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 lg:w-64 lg:h-64 bg-purple-400/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Optimized greeting */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 lg:mb-8"
        >
          <div className="text-cyan-400 text-sm lg:text-lg font-rajdhani tracking-[0.2em] lg:tracking-[0.3em] mb-3 lg:mb-4 uppercase">
            Hey 👋 What's Up? Welcome to the Future
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-orbitron font-black text-white mb-4 lg:mb-6 leading-tight">
            I'M RAKSHIT CHAUDHARY 🚀
          </h1>
        </motion.div>

        {/* Enhanced typing animation with better emoji support */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 lg:mb-12"
        >
          <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-rajdhani font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent min-h-[50px] lg:min-h-[60px] flex items-center justify-center">
            <span
              className="inline-block will-change-contents"
              style={{
                fontFamily:
                  '"Rajdhani", "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji Mozilla", sans-serif',
                textRendering: "optimizeLegibility",
                WebkitFontSmoothing: "antialiased",
                fontSize: "inherit",
                lineHeight: "1.2",
              }}
            >
              {displayed}
            </span>
            <motion.span
              className="ml-2 w-0.5 h-6 lg:h-12 bg-cyan-400"
              animate={{
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Optimized description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8 lg:mb-12"
        >
          <p className="text-sm sm:text-base lg:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-rajdhani px-4">
            Where <span className="text-cyan-400 font-semibold">Creativity Meets Code</span> - A passionate{" "}
            <span className="text-blue-400 font-semibold">Web Developer</span> and{" "}
            <span className="text-red-400 font-semibold">Cyber Security Enthusiast</span> crafting secure digital
            experiences with cutting-edge technologies.
          </p>
        </motion.div>

        {/* Optimized buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center mb-12 lg:mb-16"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-6 lg:px-10 py-3 lg:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-rajdhani font-bold rounded-xl lg:rounded-2xl overflow-hidden"
          >
            <div className="relative z-10 flex items-center gap-2 lg:gap-3">
              <FiZap className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="tracking-wide text-sm lg:text-base">Explore Projects</span>
              <FiArrowDown className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-y-1 transition-transform" />
            </div>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-6 lg:px-10 py-3 lg:py-4 border-2 border-cyan-400 text-cyan-400 font-rajdhani font-bold rounded-xl lg:rounded-2xl backdrop-blur-sm hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
          >
            <div className="flex items-center gap-2 lg:gap-3">
              <FiDownload className="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform" />
              <span className="tracking-wide text-sm lg:text-base">Download Resume</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Optimized stats */}
        <CleanStats />

        {/* Thanks message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-8 lg:mt-12 text-center"
        >
          <p className="text-slate-400 font-rajdhani text-sm lg:text-lg">
            💬 <strong>Let's collaborate and build something amazing together!</strong> ✨
          </p>
        </motion.div>

        {/* Optimized scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="flex flex-col items-center text-cyan-400"
          >
            <span className="text-xs lg:text-sm mb-2 font-rajdhani tracking-[0.2em] uppercase">Scroll to Explore</span>
            <div className="w-5 h-10 lg:w-6 lg:h-12 border-2 border-cyan-400 rounded-full flex justify-center relative overflow-hidden">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-1 h-3 lg:h-4 bg-cyan-400 rounded-full mt-1 lg:mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
