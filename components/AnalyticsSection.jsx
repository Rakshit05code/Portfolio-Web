"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { FiTrendingUp, FiTarget, FiMusic, FiCode } from "react-icons/fi"
import StarField from "./StarField"

// Weekly Development Breakdown Data
const weeklyData = [
  { category: "Web Development", hours: "22 hrs 30 mins", percentage: 75.2, color: "#00D9FF" },
  { category: "Cyber Security", hours: "5 hrs 15 mins", percentage: 17.5, color: "#A855F7" },
  { category: "DevOps/Cloud", hours: "1 hr 45 mins", percentage: 5.8, color: "#34D399" },
  { category: "Hardware/IoT", hours: "30 mins", percentage: 1.5, color: "#F59E0B" },
]

// GitHub Most Used Languages Data
const githubLanguages = [
  {
    name: "JavaScript",
    percentage: 35.8,
    color: "#F7DF1E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    projects: 28,
  },
  {
    name: "Python",
    percentage: 24.3,
    color: "#3776AB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    projects: 18,
  },
  {
    name: "TypeScript",
    percentage: 18.7,
    color: "#3178C6",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    projects: 15,
  },
  {
    name: "HTML",
    percentage: 12.4,
    color: "#E34F26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    projects: 32,
  },
  {
    name: "CSS",
    percentage: 8.8,
    color: "#1572B6",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    projects: 25,
  },
]

// 2025 Development Roadmap
const roadmapGoals = [
  { icon: "✅", text: "Master React.js & Next.js Development", status: "completed" },
  { icon: "🔄", text: "Advanced Web Security & Penetration Testing", status: "in-progress" },
  { icon: "📚", text: "Build 20+ Secure Web Applications", status: "in-progress" },
  { icon: "🎯", text: "Learn Advanced Cyber Security Tools", status: "planned" },
  { icon: "📝", text: "Contribute to 15+ Open Source Security Projects", status: "planned" },
  { icon: "🌟", text: "Achieve Security Certifications (CEH, OSCP)", status: "planned" },
  { icon: "🔐", text: "Develop Web Security Automation Tools", status: "planned" },
  { icon: "🏗️", text: "Master Full Stack Security Architecture", status: "planned" },
  { icon: "🎮", text: "Create Interactive Security Learning Platform", status: "planned" },
  { icon: "📊", text: "Build Real-time Security Monitoring Dashboards", status: "planned" },
]

// Progress Bar Component
const ProgressBar = ({ percentage, color, label, hours }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage)
    }, 500)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-rajdhani font-semibold text-sm lg:text-base">{label}</span>
        <span className="text-gray-300 text-xs lg:text-sm font-rajdhani">{hours}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 lg:h-3 overflow-hidden">
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${animatedPercentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </motion.div>
      </div>
      <div className="text-right mt-1">
        <span className="text-xs lg:text-sm font-rajdhani" style={{ color }}>
          {percentage}%
        </span>
      </div>
    </div>
  )
}

// GitHub Languages Component
const GitHubLanguages = () => {
  const [animatedPercentages, setAnimatedPercentages] = useState({})

  useEffect(() => {
    const timer = setTimeout(() => {
      const animated = {}
      githubLanguages.forEach((lang) => {
        animated[lang.name] = lang.percentage
      })
      setAnimatedPercentages(animated)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 lg:p-6">
      <h3 className="text-xl lg:text-2xl font-orbitron font-bold text-white mb-6 flex items-center gap-2">
        <FiCode className="text-yellow-400" />
        <span className="text-2xl">📊</span> Most Used Languages (GitHub)
      </h3>
      <div className="space-y-4">
        {githubLanguages.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-3 min-w-[140px]">
              <img
                src={lang.icon || "/placeholder.svg"}
                alt={lang.name}
                className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
                style={{
                  filter: lang.name === "TypeScript" ? "none" : undefined,
                }}
              />
              <span className="text-white font-rajdhani font-semibold text-sm lg:text-base">{lang.name}</span>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400 font-rajdhani">{lang.projects} projects</span>
                <span className="text-xs lg:text-sm font-rajdhani font-bold" style={{ color: lang.color }}>
                  {lang.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full rounded-full relative overflow-hidden"
                  style={{ backgroundColor: lang.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${animatedPercentages[lang.name] || 0}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* GitHub Stats Summary */}
      <div className="mt-6 pt-4 border-t border-gray-600">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-700/50 rounded-lg p-3">
            <div className="text-lg lg:text-xl font-orbitron font-bold text-yellow-400">118</div>
            <div className="text-xs text-gray-300 font-rajdhani uppercase tracking-wider">Total Repos</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3">
            <div className="text-lg lg:text-xl font-orbitron font-bold text-green-400">50K+</div>
            <div className="text-xs text-gray-300 font-rajdhani uppercase tracking-wider">Lines of Code</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Currently Vibing To Component
const CurrentlyVibing = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-4 lg:p-6 text-center"
    >
      <h3 className="text-xl lg:text-2xl font-orbitron font-bold text-purple-300 mb-4 flex items-center justify-center gap-2">
        <FiMusic className="text-purple-400" />
        <span className="text-2xl">🎵</span> Currently Vibing To
      </h3>
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden mb-4 shadow-lg">
          <img
            src="https://th.bing.com/th/id/OIP.JcV0gTvspuxMjXJfD4tUQwHaHa?w=158&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
            alt="Sapphire"
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="text-base lg:text-lg font-rajdhani font-bold text-white mb-2">Sapphire</h4>
        <p className="text-purple-200 text-xs lg:text-sm mb-4">Current favorite track while coding</p>
        <motion.a
          href="https://open.spotify.com/track/4Q0qVhFQa7j6jRKzo3HDmP"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 lg:px-6 py-2 bg-green-600 text-white rounded-full font-rajdhani font-semibold hover:bg-green-700 transition-colors text-sm lg:text-base"
        >
          Listen on Spotify
        </motion.a>
      </div>
    </motion.div>
  )
}

const AnalyticsSection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [inView, controls])

  return (
    <section className="relative w-full min-h-screen bg-gray-900 py-20 px-4 overflow-hidden">
      {/* Enhanced Star Field Animation */}
      <div className="absolute inset-0 z-0">
        <StarField density="medium" colors={["#00D9FF", "#A855F7", "#34D399", "#F59E0B", "#EC4899"]} opacity={0.6} />
      </div>

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-1">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-green-500/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-orange-500/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-orbitron font-black bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent mb-6">
            <span className="text-4xl lg:text-7xl">📊</span> ANALYTICS DASHBOARD
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-rajdhani">
            Real-time insights into my development journey and current focus areas.
          </p>
        </motion.div>

        {/* Weekly Development Breakdown and GitHub Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12"
        >
          <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 lg:p-6">
            <h3 className="text-xl lg:text-2xl font-orbitron font-bold text-white mb-6 flex items-center gap-2">
              <FiTrendingUp className="text-blue-400" />
              <span className="text-2xl">📊</span> Weekly Development Breakdown
            </h3>
            {weeklyData.map((item, index) => (
              <ProgressBar
                key={index}
                percentage={item.percentage}
                color={item.color}
                label={item.category}
                hours={item.hours}
              />
            ))}
          </div>

          {/* GitHub Most Used Languages */}
          <GitHubLanguages />
        </motion.div>

        {/* Current Focus & Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12"
        >
          <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 lg:p-6">
            <h3 className="text-xl lg:text-2xl font-orbitron font-bold text-white mb-6 flex items-center gap-2">
              <FiTarget className="text-green-400" />
              <span className="text-2xl">🎯</span> 2025 Development Roadmap
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {roadmapGoals.map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    goal.status === "completed"
                      ? "bg-green-900/30 border-green-500/30"
                      : goal.status === "in-progress"
                        ? "bg-blue-900/30 border-blue-500/30"
                        : "bg-gray-700/30 border-gray-600/30"
                  }`}
                >
                  <span className="text-base lg:text-lg">{goal.icon}</span>
                  <span className="text-xs lg:text-sm text-gray-200 font-rajdhani flex-1">{goal.text}</span>
                  <div
                    className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full ${
                      goal.status === "completed"
                        ? "bg-green-400"
                        : goal.status === "in-progress"
                          ? "bg-blue-400 animate-pulse"
                          : "bg-gray-500"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Currently Vibing */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <CurrentlyVibing />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AnalyticsSection
