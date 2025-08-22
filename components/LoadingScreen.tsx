"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiCode, FiCpu, FiZap } from "react-icons/fi"

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing...")
  const [isComplete, setIsComplete] = useState(false)

  const loadingSteps = [
    { text: "Initializing...", duration: 800 },
    { text: "Loading Components...", duration: 600 },
    { text: "Compiling Shaders...", duration: 700 },
    { text: "Optimizing Performance...", duration: 500 },
    { text: "Ready to Launch!", duration: 400 },
  ]

  useEffect(() => {
    let currentStep = 0
    let currentProgress = 0

    const updateProgress = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep]
        setLoadingText(step.text)

        const stepProgress = 100 / loadingSteps.length
        const targetProgress = (currentStep + 1) * stepProgress

        const progressInterval = setInterval(() => {
          currentProgress += 2
          setProgress(Math.min(currentProgress, targetProgress))

          if (currentProgress >= targetProgress) {
            clearInterval(progressInterval)
            currentStep++

            if (currentStep < loadingSteps.length) {
              setTimeout(updateProgress, 200)
            } else {
              // Complete loading after a short delay
              setTimeout(() => {
                setIsComplete(true)
              }, 800)
            }
          }
        }, 30)
      }
    }

    updateProgress()
  }, [])

  if (isComplete) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 relative overflow-hidden border border-blue-400/20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <FiCode className="w-10 h-10 text-white" />
              </motion.div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
            </div>
          </motion.div>

          {/* Loading text */}
          <motion.h2
            key={loadingText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-2xl font-orbitron font-bold text-white mb-8"
          >
            {loadingText}
          </motion.h2>

          {/* Progress bar */}
          <div className="w-80 mx-auto mb-4">
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between text-sm text-slate-400 mt-2">
              <span>0%</span>
              <span className="font-mono">{Math.round(progress)}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Tech icons */}
          <div className="flex justify-center gap-4 mt-8">
            {[FiCode, FiCpu, FiZap].map((Icon, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                }}
                className="p-3 bg-slate-800/50 rounded-lg border border-slate-600"
              >
                <Icon className="w-6 h-6 text-blue-400" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LoadingScreen
