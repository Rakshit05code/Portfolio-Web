"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { gsap } from "gsap"
import { FiAward, FiExternalLink, FiCalendar, FiUser, FiZap } from "react-icons/fi"
import Link from "next/link"

const certificates = [
  {
    id: 1,
    title: "Career Essentials in Software Development by Microsoft and LinkedIn",
    issuer: "Microsoft and LinkedIn",
    date: "2024",
    image: "/certificates/Software-ms.png?height=300&width=400&text=Microsoft",
    credentialUrl: "https://www.linkedin.com/learning/certificates/487d68dd189f4b3c83311f38c4cf7f5f142f93b840d21354b6a7e4674e9a5a1e?trk=share_certificate",
    skills: ["Programming", "Software Development", "Problem-Solving", "Debugging/Version Control"],
    featured: false,
    level: "Intermediate",
  },
  {
    id: 2,
    title: "Gen AI Academy Completion Certificate",
issuer: "Google Cloud & H2S",
date: "2025",
image: "/certificates/Hack2skill.png?height=300&width=400&text=GenAI",
credentialUrl: "https://drive.google.com/file/d/11Qcpko5YayL17ZssXpmwIFMj4MQ7E3U2/view?usp=sharing",
skills: ["Generative AI", "Vertex AI", "Gemini APIs", "Multimodal RAG"],
featured: true,
level: "Foundational",

  },
  { id: 3,
    title: "Agnirva Space Internship Program",
issuer: "Agnirva (Recognized by AICTE)",
date: "2025",
image: "/certificates/Agnirva.png?height=300&width=400&text=ISRO",
credentialUrl: "https://drive.google.com/file/d/1iId59EThRR0CTaZMAM2wf1pWPyvEEPI5/view?usp=sharing",
skills: ["Space Technology", "Research & Analysis", "Problem-Solving", "Team Collaboration"],
featured: true,
level: "Internship",

  },
  { id:4,
   title: "Explore Generative AI with the Vertex AI Gemini API",
issuer: "Google Cloud",
date: "2025",
image: "/certificates/Vertex.png?height=300&width=400&text=VertexAI",
credentialUrl: "https://www.cloudskillsboost.google/public_profiles/658aecf1-49bb-4ad2-8455-c95dd13c5c19", 
skills: ["Vertex AI", "Gemini API", "Generative AI", "Machine Learning"],
featured: false,
level: "Intermediate",

  },
  {id: 5,
    title: "Career Essentials in Generative AI",
issuer: "Microsoft & LinkedIn",
date: "2024",
image: "/certificates/GenAI-ms.png?height=300&width=400&text=GenerativeAI",
credentialUrl: "https://www.linkedin.com/learning/certificates/2aae5623aeff359515e42f18ce2b621a5b87f1e0dc9772f7f08652097290e605",
skills: ["Microsoft Copilot", "Generative AI", "Responsible AI"],
featured: true,
level: "Foundational",

  },
  {
    id: 6,
   title: "Data Analytics and Visualization Job Simulation",
issuer: "Accenture (via Forage)",
date: "2025",
image: "/certificates/Accenture.jpeg?height=300&width=400&text=Accenture",
credentialUrl: "https://www.theforage.com/virtual-internships/prototype/2596BtgL5A9njq54k",
skills: ["Data Cleaning & Modeling", "Data Visualization & Storytelling", "Analytical Thinking", "Client Communication"],
featured: false,
level: "Simulation",

  },
]

const CircuitBackground = () => {
  const circuitRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<(HTMLDivElement | null)[]>([])
  const connectionsRef = useRef<(SVGPathElement | SVGLineElement | null)[]>([])

  useEffect(() => {
    const circuit = circuitRef.current
    if (!circuit) return

    // Create circuit nodes with more sophisticated positioning
    const nodePositions = [
      { x: 15, y: 20, type: "processor" },
      { x: 85, y: 25, type: "memory" },
      { x: 25, y: 45, type: "connector" },
      { x: 75, y: 50, type: "processor" },
      { x: 10, y: 70, type: "memory" },
      { x: 90, y: 75, type: "connector" },
      { x: 50, y: 15, type: "processor" },
      { x: 35, y: 85, type: "memory" },
      { x: 65, y: 30, type: "connector" },
      { x: 45, y: 65, type: "processor" },
      { x: 20, y: 90, type: "memory" },
      { x: 80, y: 10, type: "connector" },
    ]

    // Animate circuit nodes with different behaviors based on type
    nodesRef.current.forEach((node, index) => {
      if (node && nodePositions[index]) {
        const pos = nodePositions[index]
        gsap.set(node, {
          left: `${pos.x}%`,
          top: `${pos.y}%`,
        })

        // Different animations based on node type
        if (pos.type === "processor") {
          gsap.to(node, {
            scale: [1, 1.8, 1],
            opacity: [0.4, 1, 0.4],
            duration: 2 + Math.random() * 2,
            repeat: -1,
            ease: "power2.inOut",
            delay: Math.random() * 2,
          })
        } else if (pos.type === "memory") {
          gsap.to(node, {
            rotationZ: 360,
            duration: 8 + Math.random() * 4,
            repeat: -1,
            ease: "none",
          })
          gsap.to(node, {
            opacity: [0.3, 0.8, 0.3],
            duration: 3 + Math.random() * 2,
            repeat: -1,
            ease: "sine.inOut",
          })
        } else {
          gsap.to(node, {
            scale: [0.8, 1.2, 0.8],
            duration: 1.5 + Math.random() * 1,
            repeat: -1,
            ease: "sine.inOut",
            delay: Math.random() * 1,
          })
        }
      }
    })

    // Animate connections with data flow effect
    connectionsRef.current.forEach((connection, index) => {
      if (connection) {
        gsap.fromTo(
          connection,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            duration: 4 + Math.random() * 3,
            ease: "none",
            repeat: -1,
            delay: Math.random() * 2,
          },
        )

        // Add pulsing effect
        gsap.to(connection, {
          opacity: [0.3, 1, 0.3],
          duration: 2 + Math.random() * 2,
          repeat: -1,
          ease: "sine.inOut",
          delay: Math.random() * 3,
        })
      }
    })
  }, [])

  return (
    <div ref={circuitRef} className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-30">
      {/* Circuit board background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 via-blue-50/20 to-purple-50/20 dark:from-green-900/10 dark:via-blue-900/10 dark:to-purple-900/10" />

      {/* Enhanced grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px, 30px 30px, 60px 60px, 60px 60px",
        }}
      />

      {/* Circuit connections */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#ec4899" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="1" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Main circuit pathways */}
        {Array.from({ length: 20 }).map((_, i) => (
          <path
            key={i}
            ref={(el) => (connectionsRef.current[i] = el)}
            d={`M${Math.random() * 100},${Math.random() * 100} 
                Q${Math.random() * 100},${Math.random() * 100} 
                ${Math.random() * 100},${Math.random() * 100}
                T${Math.random() * 100},${Math.random() * 100}`}
            stroke="url(#circuitGradient)"
            strokeWidth={Math.random() * 2 + 1}
            strokeDasharray="8,4"
            fill="none"
            opacity="0.7"
          />
        ))}

        {/* Data flow lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`flow-${i}`}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="url(#dataFlow)"
            strokeWidth="3"
            opacity="0.8"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;100;0"
              dur={`${3 + Math.random() * 4}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </svg>

      {/* Enhanced circuit nodes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (nodesRef.current[i] = el)}
          className={`absolute rounded-full border-2 ${
            i % 3 === 0
              ? "w-4 h-4 border-green-400 bg-green-400/30"
              : i % 3 === 1
                ? "w-3 h-3 border-blue-400 bg-blue-400/30"
                : "w-2 h-2 border-purple-400 bg-purple-400/30"
          }`}
          style={{
            boxShadow: `0 0 ${8 + Math.random() * 12}px ${
              i % 3 === 0
                ? "rgba(34, 197, 94, 0.6)"
                : i % 3 === 1
                  ? "rgba(59, 130, 246, 0.6)"
                  : "rgba(139, 92, 246, 0.6)"
            }`,
          }}
        />
      ))}

      {/* Floating data packets with trails */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`packet-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 4 === 0 ? "#22c55e" : i % 4 === 1 ? "#3b82f6" : i % 4 === 2 ? "#8b5cf6" : "#ec4899",
            boxShadow: `0 0 8px ${
              i % 4 === 0 ? "#22c55e" : i % 4 === 1 ? "#3b82f6" : i % 4 === 2 ? "#8b5cf6" : "#ec4899"
            }`,
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
            duration: 8 + Math.random() * 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

const CertificateCard = ({ certificate, index }: { certificate: (typeof certificates)[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "from-red-500 to-orange-500"
      case "Professional":
        return "from-purple-500 to-pink-500"
      case "Advanced":
        return "from-blue-500 to-cyan-500"
      case "Intermediate":
        return "from-green-500 to-teal-500"
      case "Associate":
        return "from-yellow-500 to-amber-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-blue-500/20 rounded-2xl overflow-hidden hover:border-blue-400/40 dark:hover:border-blue-400/40 transition-all duration-500 transform-gpu ${
        certificate.featured ? "md:col-span-2" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: "1000px" }}
    >
      {/* Certificate Image */}
      <div className="relative overflow-hidden">
        <img
          src={certificate.image || "/placeholder.svg"}
          alt={certificate.title}
          className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

        {/* Level badge */}
        <div
          className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${getLevelColor(certificate.level)} text-white text-xs font-rajdhani font-bold rounded-full flex items-center gap-1`}
        >
          <FiZap className="w-3 h-3" />
          {certificate.level.toUpperCase()}
        </div>

        {/* Featured badge */}
        {certificate.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-rajdhani font-bold rounded-full flex items-center gap-1">
            <FiAward className="w-3 h-3" />
            FEATURED
          </div>
        )}

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/60 flex items-center justify-center"
        >
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"
          >
            <FiExternalLink className="w-6 h-6" />
          </a>
        </motion.div>
      </div>

      {/* Certificate Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-orbitron font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
            {certificate.title.toUpperCase()}
          </h3>
          <FiAward className="w-6 h-6 text-blue-600 flex-shrink-0 ml-2" />
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1 font-rajdhani">
            <FiUser className="w-4 h-4" />
            {certificate.issuer.toUpperCase()}
          </div>
          <div className="flex items-center gap-1 font-rajdhani">
            <FiCalendar className="w-4 h-4" />
            {certificate.date}
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {certificate.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-300 text-sm rounded-full border border-blue-200 dark:border-blue-500/30 font-rajdhani font-medium"
            >
              {skill.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Credential Link */}
        <a
          href={certificate.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-rajdhani font-bold tracking-wide"
        >
          <FiExternalLink className="w-4 h-4" />
          VIEW CREDENTIAL
        </a>
      </div>

      {/* Holographic effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Circuit connection points */}
      <div className="absolute top-2 left-2 w-2 h-2 bg-green-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  )
}

// Coffee support section
const CoffeeSupport = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="mt-20 text-center bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 max-w-2xl mx-auto"
    >
      <h3 className="text-3xl font-orbitron font-bold text-purple-300 mb-4">💝 Fuel My Code & Coffee Addiction!</h3>
      <p className="text-purple-200 mb-6 leading-relaxed text-lg">
        Your support helps me create more secure web applications, security tools, and contribute to open source
        projects!
      </p>

      <motion.a
        href="https://buymeacoffee.com/rakshit_chaudhary"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-rajdhani font-bold rounded-2xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 text-lg"
      >
        <span className="text-2xl">☕</span>
        <span>Buy Me A Coffee</span>
      </motion.a>

      <div className="mt-6">
        <img
          src="https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif"
          alt="Coffee Animation"
          className="w-40 h-40 mx-auto rounded-2xl shadow-lg"
        />
      </div>
    </motion.div>
  )
}

const CertificateSection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [inView, controls])

  return (
    <section
      id="certificates"
      className="relative w-full min-h-screen bg-gray-50 dark:bg-black py-20 px-4 overflow-hidden transition-colors duration-500"
    >
      <CircuitBackground />

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
            <FiAward className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl md:text-6xl font-orbitron font-black bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              CERTIFICATIONS
            </h2>
            <FiZap className="w-8 h-8 text-green-600" />
          </motion.div>

          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-rajdhani font-medium">
            CONTINUOUS LEARNING AND PROFESSIONAL DEVELOPMENT THROUGH INDUSTRY-RECOGNIZED CERTIFICATIONS AND SPECIALIZED
            TRAINING PROGRAMS.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {certificates.map((certificate, index) => (
            <CertificateCard key={certificate.id} certificate={certificate} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Link href="/certificates">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-rajdhani font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 tracking-wide cursor-pointer"
            >
              <FiAward className="w-5 h-5" />
              VIEW ALL MY CERTIFICATES
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <FiZap className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Coffee support section */}
        <CoffeeSupport />
      </div>
    </section>
  )
}

export default CertificateSection
