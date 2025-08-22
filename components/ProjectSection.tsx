"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { gsap } from "gsap"
import { FiGithub, FiExternalLink, FiCode, FiZap, FiCpu, FiHardDrive } from "react-icons/fi"

const projects = [
  {
    id: 1,
    name: "Amazon E-Commerce Platform",
    description:
     " E-commerce platform built using JavaScript, HTML, and CSS, along with additional languages for enhanced functionality.",
    image: "/images/amazon.png?height=300&width=400&text=Amazon",
    demoUrl: "https://rakshit05code.github.io/Amazon-Project/",
    repoUrl: "https://github.com/Rakshit05code/Amazon-Project",
    tags: ["JavaScript", "HTML", "CSS", "Web Development", "Authentication"],
    featured: true,
    position: { x: 20, y: 20 },
  },
  {
    id: 2,
    name: "Weather Analytics",
    description:
     "AI-powered weather assistant that delivers accurate forecasts, real-time updates, and interactive responses for a smarter weather experience.",
    
    image: "/images/weather.png?height=300&width=400&text=Weather",
    demoUrl: "https://github.com/Rakshit05code/Weather-Web",
    repoUrl: "https://github.com/Rakshit05code/Weather-Web",
    tags: ["Python", "Flask", "ML", "Chart.js"],
    featured: false,
    position: { x: 80, y: 25 },
  },
  {
    id: 3,
    name: "Portfolio Dashboard",
    description:
      "Interactive dashboard for tracking cryptocurrency portfolios with real-time data visualization and alerts.",
    image: "/placeholder.svg?height=300&width=400&text=Dashboard",
    demoUrl: "https://portfolio.example.com",
    repoUrl: "https://github.com/rakshit/portfolio-dashboard",
    tags: ["React", "D3.js", "WebSocket", "TailwindCSS"],
    featured: false,
    position: { x: 15, y: 70 },
  },
  {
    id: 4,
    name: "Spam Detection Bot",
    description:
       "Discord moderation bot using machine learning with Python and discord.py to detect and manage spam in real-time, featuring automated warnings and kicks.",
    image: "/images/bot.png?height=300&width=400&text=AI-Chat",
    demoUrl: "https://rakshit05code.github.io/Spam-Detection-Bot/",
    repoUrl: "https://github.com/Rakshit05code/Spam-Detection-Bot",
    tags: ["Python", "discord.py", "Machine Learning", "Spam Detection", "SQLite", "Automation"],
    featured: false,
    position: { x: 75, y: 75 },
  },
  {
    id: 5,
    name: "Modern Form App",
    description:
      "A beautiful Flutter registration app with PHP backend and MySQL integration. Features modern UI, form validation, and submission storage with view functionality.",
    image: "/images/app.jpg?height=300&width=400&text=TaskApp",
    demoUrl: "https://github.com/Rakshit05code/modern-form-app",
    repoUrl: "https://github.com/Rakshit05code/modern-form-app",
    tags: ["Flutter", "Dart", "PHP", "MySQL", "Backend", "Mobile"],
    featured: false,
    position: { x: 50, y: 45 },
  },

]

const CircuitBoard = () => {
  const circuitRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<(HTMLDivElement | null)[]>([])
  const connectionsRef = useRef<(SVGPathElement | SVGLineElement | null)[]>([])
  const dataPacketsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const circuit = circuitRef.current
    if (!circuit) return

    // Enhanced circuit nodes with different types
    const nodeTypes = [
      { type: "cpu", icon: FiCpu, color: "#3b82f6", size: "large" },
      { type: "memory", icon: FiHardDrive, color: "#06b6d4", size: "medium" },
      { type: "connector", icon: FiZap, color: "#10b981", size: "small" },
    ]

    // Animate circuit nodes
    nodesRef.current.forEach((node, index) => {
      if (node) {
        const nodeType = nodeTypes[index % nodeTypes.length]

        // Set initial position
        gsap.set(node, {
          left: `${projects[index % projects.length]?.position.x || Math.random() * 80 + 10}%`,
          top: `${projects[index % projects.length]?.position.y || Math.random() * 80 + 10}%`,
        })

        // Different animations based on node type
        if (nodeType.type === "cpu") {
          gsap.to(node, {
            scale: [1, 1.3, 1],
            rotation: [0, 360],
            duration: 4 + Math.random() * 2,
            repeat: -1,
            ease: "power2.inOut",
          })
        } else if (nodeType.type === "memory") {
          gsap.to(node, {
            y: "+=20",
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
        } else {
          gsap.to(node, {
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8],
            duration: 1.5 + Math.random() * 1,
            repeat: -1,
            ease: "sine.inOut",
          })
        }
      }
    })

    // Animate connections with advanced effects
    connectionsRef.current.forEach((connection, index) => {
      if (connection) {
        // Main flow animation
        gsap.fromTo(
          connection,
          { strokeDashoffset: 2000 },
          {
            strokeDashoffset: 0,
            duration: 6 + Math.random() * 4,
            ease: "none",
            repeat: -1,
            delay: Math.random() * 3,
          },
        )

        // Pulsing effect
        gsap.to(connection, {
          opacity: [0.3, 1, 0.3],
          strokeWidth: [1, 3, 1],
          duration: 3 + Math.random() * 2,
          repeat: -1,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        })
      }
    })

    // Animate data packets
    dataPacketsRef.current.forEach((packet, index) => {
      if (packet) {
        gsap.set(packet, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        })

        gsap.to(packet, {
          motionPath: {
            path: `M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`,
            autoRotate: true,
          },
          duration: 8 + Math.random() * 6,
          repeat: -1,
          ease: "none",
        })
      }
    })
  }, [])

  return (
    <div ref={circuitRef} className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-40">
      {/* Circuit board background with modern gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-cyan-50/30 to-indigo-50/50 dark:from-blue-900/20 dark:via-cyan-900/10 dark:to-indigo-900/20" />

      {/* Enhanced grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(6, 182, 212, 0.05) 2px, transparent 2px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.05) 2px, transparent 2px)
          `,
          backgroundSize: "30px 30px, 30px 30px, 90px 90px, 90px 90px",
        }}
      />

      {/* Advanced circuit connections */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#8b5cf6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main circuit pathways connecting projects */}
        {projects.map((project, i) => {
          const nextProject = projects[(i + 1) % projects.length]
          return (
            <path
              key={`connection-${i}`}
              ref={(el) => (connectionsRef.current[i] = el)}
              d={`M${project.position.x},${project.position.y} 
                  Q${(project.position.x + nextProject.position.x) / 2 + Math.random() * 20 - 10},${(project.position.y + nextProject.position.y) / 2 + Math.random() * 20 - 10} 
                  ${nextProject.position.x},${nextProject.position.y}`}
              stroke="url(#circuitGradient)"
              strokeWidth="2"
              strokeDasharray="10,5"
              fill="none"
              filter="url(#glow)"
              opacity="0.7"
            />
          )
        })}

        {/* Additional interconnections */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`extra-${i}`}
            ref={(el) => (connectionsRef.current[projects.length + i] = el)}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="url(#dataFlow)"
            strokeWidth="1.5"
            strokeDasharray="5,3"
            opacity="0.6"
            filter="url(#glow)"
          />
        ))}
      </svg>

      {/* Enhanced circuit nodes representing projects */}
      {projects.map((project, i) => (
        <div
          key={`node-${project.id}`}
          ref={(el) => (nodesRef.current[i] = el)}
          className="absolute flex items-center justify-center"
          style={{
            left: `${project.position.x}%`,
            top: `${project.position.y}%`,
          }}
        >
          <div
            className={`${
              project.featured ? "w-8 h-8" : "w-6 h-6"
            } rounded-full border-2 border-blue-400 bg-blue-500/30 backdrop-blur-sm flex items-center justify-center`}
            style={{
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
            }}
          >
            {project.featured ? (
              <FiCpu className="w-4 h-4 text-blue-300" />
            ) : (
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" />
            )}
          </div>

          {/* Connection indicators */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <div
            className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
      ))}

      {/* Floating data packets */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`packet-${i}`}
          ref={(el) => (dataPacketsRef.current[i] = el)}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 4 === 0 ? "#3b82f6" : i % 4 === 1 ? "#06b6d4" : i % 4 === 2 ? "#10b981" : "#8b5cf6",
            boxShadow: `0 0 8px ${i % 4 === 0 ? "#3b82f6" : i % 4 === 1 ? "#06b6d4" : i % 4 === 2 ? "#10b981" : "#8b5cf6"}`,
          }}
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
          }}
          transition={{
            duration: 10 + Math.random() * 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

const ProjectCard = ({ project, index }: { project: (typeof projects)[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-400/50 dark:hover:border-blue-400/50 transition-all duration-500 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 ${
        project.featured ? "md:col-span-2 lg:col-span-2" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.name}
          className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-rajdhani font-bold rounded-full flex items-center gap-1">
            <FiZap className="w-3 h-3" />
            Featured
          </div>
        )}

        {/* Circuit connection indicator */}
        <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
        >
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
          >
            <FiExternalLink className="w-5 h-5" />
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-colors shadow-lg"
          >
            <FiGithub className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.name}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed font-rajdhani">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full border border-blue-200 dark:border-blue-700/50 font-rajdhani font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 text-sm">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-rajdhani font-semibold"
          >
            <FiExternalLink className="w-4 h-4" />
            Live Demo
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-rajdhani font-semibold"
          >
            <FiCode className="w-4 h-4" />
            Source Code
          </a>
        </div>
      </div>

      {/* Circuit connection points */}
      <div className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity animate-pulse" />
      <div
        className="absolute top-2 left-2 w-1.5 h-1.5 bg-green-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />
    </motion.div>
  )
}

const ProjectSection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [inView, controls])

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 py-20 px-4 overflow-hidden transition-colors duration-500"
    >
      <CircuitBoard />

      <div className="relative z-10 max-w-7xl mx-auto">
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
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <FiCpu className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl md:text-6xl font-orbitron font-black bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <FiZap className="w-8 h-8 text-cyan-600" />
          </motion.div>

          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-rajdhani font-medium">
            Explore my latest work showcasing modern web technologies, creative problem-solving, and attention to detail
            in every project. Each project is connected through our digital circuit network.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/Rakshit05code"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-rajdhani font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
          >
            <FiGithub className="w-5 h-5" />
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectSection
