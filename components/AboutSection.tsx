"use client"

import { useState } from "react"

import { useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { gsap } from "gsap"
import StarField from "./StarField"

const aboutText = `I'm a passionate full-stack developer and cybersecurity enthusiast with 3+ years of experience creating 
secure digital experiences. I specialize in React, Node.js, Python, and modern web technologies, with a keen focus on 
building secure applications and contributing to open source projects.`

// Enhanced about info from GitHub profile (removed "reach me")
const aboutInfo = [
  { icon: "🔭", label: "Currently Working On", value: "Secure Web Applications & Penetration Testing Tools" },
  { icon: "🌱", label: "Currently Learning", value: "Advanced React.js, Next.js & Ethical Hacking" },
  { icon: "👯", label: "Looking to Collaborate", value: "Open Source Security Projects & Web Development" },
  { icon: "💬", label: "Ask Me About", value: "Web Development, React.js, Cyber Security, Penetration Testing" },
  { icon: "⚡", label: "Fun Fact", value: "I can build secure web apps and find vulnerabilities at the same time! 🕵️‍♂️" },
  { icon: "🎯", label: "Goal", value: "Become a Full Stack Security Engineer" },
]

// Fixed Tailwind CSS icon and optimized tech skills
const skills = [
  {
    name: "C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    color: "#A8B9CC",
    level: 85,
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    color: "#00599C",
    level: 88,
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3776AB",
    level: 92,
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
    level: 90,
  },
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#E34F26",
    level: 95,
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#1572B6",
    level: 90,
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    level: 95,
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#000000",
    level: 92,
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
    level: 88,
  },
  {
    name: ".NET",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
    color: "#512BD4",
    level: 80,
  },
  {
    name: "Tailwind",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    color: "#06B6D4",
    level: 93,
  },
  {
    name: "Bootstrap",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    color: "#7952B3",
    level: 85,
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    color: "#F24E1E",
    level: 82,
  },
  {
    name: "GCP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    color: "#4285F4",
    level: 78,
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    color: "#FFCA28",
    level: 85,
  },
  {
    name: "Linux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    color: "#FCC624",
    level: 88,
  },
  {
    name: "Ubuntu",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg",
    color: "#E95420",
    level: 85,
  },
  {
    name: "Arduino",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
    color: "#00979D",
    level: 75,
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
    level: 90,
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    color: "#181717",
    level: 92,
  },
]

// Simplified background with fewer particles
const AnimatedBackground = () => {
  const particlesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Reduced particles for better performance
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5,
        })

        gsap.to(particle, {
          x: `+=${Math.random() * 100 - 50}`,
          y: `+=${Math.random() * 100 - 50}`,
          duration: 8 + Math.random() * 6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        })
      }
    })
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/50 to-black" />

      {/* Reduced particles count */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          ref={(el) => (particlesRef.current[i] = el)}
          className="absolute w-2 h-2 rounded-full opacity-60"
          style={{
            background: `radial-gradient(circle, ${
              i % 3 === 0 ? "#8B5CF6" : i % 3 === 1 ? "#A855F7" : "#C084FC"
            }, transparent)`,
          }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  )
}

// Enhanced skills network that works on both mobile and desktop
const SkillsNetwork = () => {
  const networkRef = useRef<HTMLDivElement>(null)
  const skillRefs = useRef<(HTMLDivElement | null)[]>([])
  const svgRef = useRef<SVGSVGElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // Changed to 1024px for better laptop support
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const network = networkRef.current
    const svg = svgRef.current
    if (!network || !svg || isMobile) return

    const centerX = 400
    const centerY = 400
    const radius = 180

    // Position skills in concentric circles for desktop
    skillRefs.current.forEach((skill, index) => {
      if (skill) {
        const layer = Math.floor(index / 8) // 8 skills per layer
        const indexInLayer = index % 8
        const layerRadius = radius + layer * 100
        const angle = (indexInLayer / 8) * Math.PI * 2

        const x = centerX + Math.cos(angle) * layerRadius
        const y = centerY + Math.sin(angle) * layerRadius

        gsap.set(skill, { x, y })

        // Create orbital motion
        gsap.to(skill, {
          rotation: 360,
          duration: 30 + index * 2,
          ease: "none",
          repeat: -1,
        })

        // Orbital movement around center
        gsap.to(skill, {
          motionPath: {
            path: `M${x},${y} A${layerRadius},${layerRadius} 0 1,1 ${centerX + Math.cos(angle + Math.PI) * layerRadius},${centerY + Math.sin(angle + Math.PI) * layerRadius} A${layerRadius},${layerRadius} 0 1,1 ${x},${y}`,
            autoRotate: false,
          },
          duration: 25 + layer * 5,
          ease: "none",
          repeat: -1,
        })

        // Floating animation
        gsap.to(skill, {
          y: `+=${10 + index * 1}`,
          duration: 3 + index * 0.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        })
      }
    })

    // Function to update connections
    const updateConnections = () => {
      if (!svg) return

      // Clear existing lines
      svg.innerHTML = `
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
          </linearGradient>
        </defs>
      `

      // Create connections between related skills
      const connections = [
        [0, 1], // C to C++
        [2, 3], // Python to JavaScript
        [4, 5], // HTML to CSS
        [6, 7], // React to Next.js
        [7, 8], // Next.js to Node.js
        [10, 11], // Tailwind to Bootstrap
        [13, 14], // GCP to Firebase
        [15, 16], // Linux to Ubuntu
        [18, 19], // Git to GitHub
      ]

      connections.forEach(([i, j]) => {
        const skill1 = skillRefs.current[i]
        const skill2 = skillRefs.current[j]

        if (skill1 && skill2) {
          const rect1 = skill1.getBoundingClientRect()
          const rect2 = skill2.getBoundingClientRect()
          const svgRect = svg.getBoundingClientRect()

          const x1 = rect1.left + rect1.width / 2 - svgRect.left
          const y1 = rect1.top + rect1.height / 2 - svgRect.top
          const x2 = rect2.left + rect2.width / 2 - svgRect.left
          const y2 = rect2.top + rect2.height / 2 - svgRect.top

          const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
          line.setAttribute("x1", x1.toString())
          line.setAttribute("y1", y1.toString())
          line.setAttribute("x2", x2.toString())
          line.setAttribute("y2", y2.toString())
          line.setAttribute("stroke", "rgba(255,255,255,0.7)")
          line.setAttribute("stroke-width", "2")
          line.setAttribute("stroke-dasharray", "6,4")
          line.classList.add("connection-line")

          svg.appendChild(line)

          // Animate the line
          gsap.fromTo(
            line,
            { strokeDashoffset: 100 },
            {
              strokeDashoffset: 0,
              duration: 4,
              ease: "none",
              repeat: -1,
            },
          )
        }
      })
    }

    // Update connections periodically
    const updateInterval = setInterval(updateConnections, 100)
    setTimeout(updateConnections, 500)

    return () => {
      clearInterval(updateInterval)
    }
  }, [isMobile])

  if (isMobile) {
    // Mobile and tablet grid layout
    return (
      <div className="w-full max-w-lg mx-auto">
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 p-4">
          {skills.slice(0, 16).map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex flex-col items-center group"
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-300/30 transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${skill.color}20`,
                  boxShadow: `0 0 15px ${skill.color}40`,
                }}
              >
                <img
                  src={skill.icon || "/placeholder.svg"}
                  alt={skill.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  style={{
                    filter: skill.name === "Next.js" || skill.name === "GitHub" ? "invert(1) brightness(2)" : undefined,
                  }}
                />
              </div>
              <span className="text-xs text-purple-200 mt-2 text-center font-rajdhani">{skill.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Show remaining skills in a second grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 p-4 pt-0">
          {skills.slice(16).map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: (index + 16) * 0.05 }}
              className="flex flex-col items-center group"
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-300/30 transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${skill.color}20`,
                  boxShadow: `0 0 15px ${skill.color}40`,
                }}
              >
                <img
                  src={skill.icon || "/placeholder.svg"}
                  alt={skill.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  style={{
                    filter: skill.name === "Next.js" || skill.name === "GitHub" ? "invert(1) brightness(2)" : undefined,
                  }}
                />
              </div>
              <span className="text-xs text-purple-200 mt-2 text-center font-rajdhani">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  // Desktop version - full orbital animation like version 12
  return (
    <div className="relative w-full max-w-[1000px] h-[800px] flex items-center justify-center mx-auto">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ overflow: "visible" }}
      />

      <div ref={networkRef} className="relative w-full h-full">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            ref={(el) => (skillRefs.current[index] = el)}
            className="absolute flex flex-col items-center justify-center group cursor-pointer z-10 -translate-x-12 -translate-y-12"
            style={{ willChange: "transform" }}
          >
            <div
              className="w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-300/30 transition-all duration-300 group-hover:scale-110 group-hover:border-purple-300/60 relative"
              style={{
                backgroundColor: `${skill.color}20`,
                boxShadow: `0 0 20px ${skill.color}40, 0 0 40px rgba(147, 51, 234, 0.2)`,
              }}
            >
              <img
                src={skill.icon || "/placeholder.svg"}
                alt={skill.name}
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain relative z-10"
                style={{
                  filter: skill.name === "Next.js" || skill.name === "GitHub" ? "invert(1) brightness(2)" : undefined,
                }}
              />

              <div
                className="absolute inset-0 rounded-full border-2 opacity-50 animate-ping"
                style={{ borderColor: skill.color }}
              />
            </div>

            <span className="text-xs text-purple-200 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 px-3 py-1 rounded backdrop-blur-sm whitespace-nowrap border border-purple-500/30">
              {skill.name} - {skill.level}%
            </span>

            <div
              className="absolute inset-0 rounded-full blur-xl opacity-30 -z-10"
              style={{ backgroundColor: skill.color }}
            />
          </div>
        ))}

        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full opacity-80 animate-pulse shadow-lg"
          style={{
            background: "linear-gradient(to right, #a855f7, #8b5cf6, #7c3aed)",
            boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)",
          }}
        />
      </div>
    </div>
  )
}

const AboutSection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [inView, controls])

  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-black flex flex-col justify-center items-center px-4 py-16 lg:py-20 overflow-hidden"
    >
      {/* Star Field Animation */}
      <div className="absolute inset-0 z-0">
        <StarField density="medium" colors={["#8B5CF6", "#A855F7", "#C084FC", "#DDD6FE"]} opacity={0.4} />
      </div>

      <AnimatedBackground />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl text-center z-10 mb-8 lg:mb-12"
      >
        <h2
          className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 lg:mb-6 bg-clip-text text-transparent"
          style={{
            background: "linear-gradient(to right, #d8b4fe, #c084fc, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          About Me
        </h2>
        <p className="text-sm md:text-base lg:text-xl text-purple-100 mb-6 lg:mb-8 px-4 leading-relaxed max-w-4xl mx-auto">
          {aboutText}
        </p>

        {/* Enhanced About Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 mb-8 lg:mb-12 max-w-6xl mx-auto">
          {aboutInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/30 rounded-xl lg:rounded-2xl p-3 lg:p-6 hover:bg-purple-900/30 transition-all duration-300"
            >
              <div className="text-xl lg:text-3xl mb-2 lg:mb-3">{info.icon}</div>
              <h3 className="text-purple-300 font-rajdhani font-bold text-xs lg:text-sm uppercase tracking-wider mb-1 lg:mb-2">
                {info.label}
              </h3>
              <p className="text-purple-100 text-xs lg:text-sm leading-relaxed">{info.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 flex items-center justify-center mb-8 lg:mb-12 w-full"
      >
        <SkillsNetwork />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="text-center z-10"
      >
        <div className="text-purple-200 text-base lg:text-xl font-medium opacity-90 mb-2">My Complete Tech Arsenal</div>
        <div className="text-purple-300 text-sm">Hover over skills to see proficiency levels</div>
      </motion.div>
    </section>
  )
}

export default AboutSection
