"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FiArrowLeft,
  FiAward,
  FiExternalLink,
  FiCalendar,
  FiUser,
  FiZap,
  FiClock,
  FiPlus,
  FiTarget,
} from "react-icons/fi"
import Link from "next/link"
import StarField from "@/components/StarField"

// All certificates data
const allCertificates = [
  {
    id: 1,
    title: "Space Science and Technology Awareness Training (START)",
    issuer: "Indian Space Research Organisation (ISRO)",
    date: "2025",
    image: "/certificates/ISRO.png",
    credentialUrl: "https://certificate.iirs.gov.in",
    skills: ["Space Science", "Technology Awareness", "Online Training", "19.5 hours", "88% attendance"],
    featured: true,
    level: "Training/Workshop",
    description: "Attended and completed online training by ISRO in Space Science and Technology Awareness (START) at Thapar Institute of Engineering and Technology.",
    
  },
  {
    id: 2,
    title: "Neo4j Certified Professional",
    issuer: "Neo4j GraphAcademy",
    date: "July 6, 2025",
    image: "/certificates/Neo4j.png",
    credentialUrl: "",
    skills: ["Graph Database", "Neo4j"],
    featured: true,
    level: "Professional Certification",
    description: "Accredited certification completed to validate credentials as a Neo4j Certified Professional."
  },
  {
    id: 3,
    title: "Digital Intermediate Job Simulation",
    issuer: "Ford x Forage",
    date: "January 4, 2025",
    image: "/certificates/Ford.jpeg",
    credentialUrl: "",
    skills: ["Analog Sensors", "Coding for Microcontrollers"],
    featured: true,
    level: "Intermediate",
    description: "Completed practical tasks in analog sensors and microcontroller coding in Ford Digital Job Simulation."
  },
  {
    id: 4,
    title: "AI-ML Bootcamp – Optical Character Recognition (OCR) Workshop",
    issuer: "GDSC TIET",
    date: "April 16–20, 2025",
    image: "/certificates/GDSC.png",
    credentialUrl: "",
    skills: ["OCR Systems", "AI/ML Fundamentals"],
    featured: false,
    level: "Workshop",
    description: "Participated in a 5-day workshop focused on building Optical Character Recognition systems using AI/ML."
  },
  {
    id: 5,
    title: "Enhancing Social Intelligence: Interpersonal Skills",
    issuer: "Thapar Institute Counselling Cell x DeTalks",
    date: "August 24, 2024",
    image: "/certificates/Interpersonal.jpeg",
    credentialUrl: "b1043497-1402-4993-a224-62c7fb944a02",
    skills: ["Social Intelligence", "Interpersonal Skills"],
    featured: false,
    level: "Skill Certification",
    description: "Certified for successfully completing a program on enhancing social intelligence and interpersonal skills."
  },
  {
    id: 6,
    title: "Google Workspace: Bring AI to Work Workshop",
    issuer: "Google",
    date: "June 6, 2025",
    image: "/certificates/Bring-AI.png",
    credentialUrl: "",
    skills: ["Google Workspace", "AI Integration"],
    featured: false,
    level: "Workshop",
    description: "Successfully completed the Google 'Bring AI to Work' Workshop covering AI integration in Workspace tools."
  },
  {
    id: 7,
    title: "Build Real World AI Applications with Gemini and Imagen",
    issuer: "Google Cloud",
    date: "May 7, 2025",
    image: "/certificates/Real-world.png",
    credentialUrl: "",
    skills: ["Gemini", "Imagen", "Machine Learning", "AI Applications"],
    featured: false,
    level: "Skill Badge · Introductory",
    description: "Earned skill badge for building real-world AI applications using Gemini and Imagen on Google Cloud."
  },
  {
    id: 8,
    title: "Develop GenAI Apps with Gemini and Streamlit",
    issuer: "Google Cloud",
    date: "May 12, 2025",
    image: "/certificates/GenAI-Streamlit.png",
    credentialUrl: "",
    skills: ["Gemini", "Streamlit", "GenAI", "App Development"],
    featured: false,
    level: "Skill Badge · Intermediate",
    description: "Skill badge for developing GenAI applications using Gemini and Streamlit on Google Cloud."
  },
  {
    id: 9,
    title: "Explore Generative AI with Vertex AI Gemini API",
    issuer: "Google Cloud",
    date: "May 30, 2025",
    image: "/certificates/Vertex.png",
    credentialUrl: "",
    skills: ["Generative AI", "Vertex AI Gemini API"],
    featured: false,
    level: "Skill Badge · Intermediate",
    description: "Earned skill badge for Generative AI exploration using Vertex AI Gemini API."
  },
  {
    id: 10,
    title: "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG",
    issuer: "Google Cloud",
    date: "May 30, 2025",
    image: "/certificates/Rag.png",
    credentialUrl: "",
    skills: ["Multimodal AI", "Rich Document Inspection"],
    featured: false,
    level: "Skill Badge · Intermediate",
    description: "Earned skill badge for inspecting rich documents using Gemini Multimodality and Multimodal RAG."
  },
];


// Certificates in progress
const certificatesInProgress = [
  {
    id: 101,
    title: "CISSP - Certified Information Systems Security Professional",
    issuer: "ISC²",
    expectedDate: "Q2 2025",
    image: "/certificates/CISSP.png",
    progress: 75,
    skills: ["Information Security", "Risk Management", "Security Architecture", "Governance"],
    level: "Expert",
    description: "Advanced certification in information security management and architecture.",
    badgeUrl: "https://www.credly.com/org/isc2/badge/certified-information-systems-security-professional-cissp",
    
   
  },
  {
    id: 102,
    title: "OSCP - Offensive Security Certified Professional",
    issuer: "Offensive Security",
    expectedDate: "Q3 2025",
    image: "/certificates/OSCP.png",
    progress: 60,
    skills: ["Penetration Testing", "Exploit Development", "Post-Exploitation", "Reporting"],
    level: "Expert",
    description: "Hands-on certification in advanced penetration testing and exploitation techniques.",
    badgeUrl: "https://www.credly.com/badges/4f8bdcba-27b6-4e71-bbac-8ca2320e6df4"
  },
  {
    id: 103,
    title: "Azure Solutions Architect Expert",
    issuer: "Microsoft",
    expectedDate: "Q1 2025",
    image: "/certificates/Azure.png",
    progress: 85,
    skills: ["Azure", "Cloud Architecture", "DevOps", "Security"],
    level: "Expert",
    description: "Expert-level certification in Microsoft Azure cloud solutions architecture.",
    badgeUrl: "https://www.credly.com/badges/cce1b6b8-2546-43cd-91f7-78232199f5f0"
  },
  {
    id: 104,
    title: "Terraform Associate",
    issuer: "HashiCorp",
    expectedDate: "Q2 2025",
    image: "/certificates/Terraform.png",
    progress: 40,
    skills: ["Infrastructure as Code", "Terraform", "Cloud Automation", "DevOps"],
    level: "Associate",
    description: "Certification in infrastructure automation using Terraform.",
    badgeUrl: "https://www.credly.com/badges/2992cba3-e84f-4740-bcdc-3cbdd79bce5b"
  },
];

// More certificates planned
const moreCertificatesPlanned = [
  {
    id: 201,
    title: "CISM - Certified Information Security Manager",
    issuer: "ISACA",
    expectedDate: "Q4 2025",
    skills: ["Information Security Management", "Risk Management", "Governance", "Incident Response"],
    level: "Expert",
    description: "Management-level certification focusing on information security strategy and governance.",
    
  
  },
  {
    id: 202,
    title: "GCIH - GIAC Certified Incident Handler",
    issuer: "SANS/GIAC",
    expectedDate: "Q1 2026",
    skills: ["Incident Response", "Digital Forensics", "Malware Analysis", "Network Security"],
    level: "Expert",
    description: "Hands-on certification in incident response and digital forensics.",
  },
  {
    id: 203,
    title: "CKS - Certified Kubernetes Security Specialist",
    issuer: "Cloud Native Computing Foundation",
    expectedDate: "Q2 2026",
    skills: ["Kubernetes Security", "Container Security", "DevSecOps", "Cloud Native Security"],
    level: "Expert",
    description: "Specialized certification in Kubernetes and container security.",
  },
  {
    id: 204,
    title: "RHCE - Red Hat Certified Engineer",
    issuer: "Red Hat",
    expectedDate: "Q3 2026",
    skills: ["Linux Administration", "System Configuration", "Automation", "Networking"],
    level: "Professional",
    description: "Advanced Linux system administration and automation certification.",
  },
  {
    id: 205,
    title: "CCSP - Certified Cloud Security Professional",
    issuer: "ISC²",
    expectedDate: "Q4 2026",
    skills: ["Cloud Security", "Data Protection", "Compliance", "Risk Management"],
    level: "Expert",
    description: "Advanced certification in cloud security architecture and management.",
  },
  {
    id: 206,
    title: "GSEC - GIAC Security Essentials",
    issuer: "SANS/GIAC",
    expectedDate: "Q1 2027",
    skills: ["Security Fundamentals", "Network Security", "Incident Handling", "Cryptography"],
    level: "Professional",
    description: "Comprehensive certification covering essential security skills and knowledge.",
  },
]

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

const CertificateCard = ({
  certificate,
  index,
  isInProgress = false,
}: { certificate: any; index: number; isInProgress?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white/10 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/20 dark:border-blue-500/20 rounded-xl lg:rounded-2xl overflow-hidden hover:border-blue-400/40 dark:hover:border-blue-400/40 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Certificate Image */}
      <div className="relative overflow-hidden">
        <img
          src={certificate.image || "/placeholder.svg"}
          alt={certificate.title}
          className="w-full h-32 sm:h-40 lg:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

        {/* Level badge */}
        <div
          className={`absolute top-2 left-2 px-2 py-1 bg-gradient-to-r ${getLevelColor(certificate.level)} text-white text-xs font-rajdhani font-bold rounded-full flex items-center gap-1`}
        >
          <FiZap className="w-2 h-2 sm:w-3 sm:h-3" />
          <span className="hidden sm:inline">{certificate.level.toUpperCase()}</span>
          <span className="sm:hidden">{certificate.level.charAt(0)}</span>
        </div>

        {/* Progress badge for in-progress certificates */}
        {isInProgress && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-rajdhani font-bold rounded-full flex items-center gap-1">
            <FiClock className="w-2 h-2 sm:w-3 sm:h-3" />
            <span>{certificate.progress}%</span>
          </div>
        )}

        {/* Featured badge */}
        {certificate.featured && !isInProgress && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-rajdhani font-bold rounded-full flex items-center gap-1">
            <FiAward className="w-2 h-2 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline">FEATURED</span>
            <span className="sm:hidden">★</span>
          </div>
        )}

        {/* Hover overlay */}
        {!isInProgress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
          >
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 lg:p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"
            >
              <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </a>
          </motion.div>
        )}
      </div>

      {/* Certificate Content */}
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="flex items-start justify-between mb-2 lg:mb-3">
          <h3 className="text-sm sm:text-base lg:text-lg font-orbitron font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
            {certificate.title.toUpperCase()}
          </h3>
          <FiAward className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400 flex-shrink-0 ml-2" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2 lg:mb-3 text-xs sm:text-sm text-gray-400">
          <div className="flex items-center gap-1 font-rajdhani">
            <FiUser className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate">{certificate.issuer.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-1 font-rajdhani">
            <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
            {isInProgress ? certificate.expectedDate : certificate.date}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-xs sm:text-sm mb-3 lg:mb-4 leading-relaxed line-clamp-2 lg:line-clamp-none">
          {certificate.description}
        </p>

        {/* Progress bar for in-progress certificates */}
        {isInProgress && (
          <div className="mb-3 lg:mb-4">
            <div className="flex justify-between items-center mb-1 lg:mb-2">
              <span className="text-xs text-gray-400 font-rajdhani">PROGRESS</span>
              <span className="text-xs text-blue-400 font-rajdhani font-bold">{certificate.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5 lg:h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 lg:h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${certificate.progress}%` }}
                transition={{ duration: 1.5, delay: index * 0.1 }}
              />
            </div>
          </div>
        )}

        {/* Skills */}
        <div className="flex flex-wrap gap-1 lg:gap-2 mb-3 lg:mb-4">
          {certificate.skills.slice(0, 3).map((skill: string, idx: number) => (
            <span
              key={idx}
              className="px-2 py-0.5 lg:px-2 lg:py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30 font-rajdhani font-medium"
            >
              {skill.toUpperCase()}
            </span>
          ))}
          {certificate.skills.length > 3 && (
            <span className="px-2 py-0.5 lg:px-2 lg:py-1 bg-gray-600/20 text-gray-300 text-xs rounded-full border border-gray-500/30 font-rajdhani font-medium">
              +{certificate.skills.length - 3}
            </span>
          )}
        </div>

        {/* Credential Link */}
        {!isInProgress && (
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 lg:gap-2 text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm font-rajdhani font-bold tracking-wide"
          >
            <FiExternalLink className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="hidden sm:inline">VIEW CREDENTIAL</span>
            <span className="sm:hidden">VIEW</span>
          </a>
        )}
      </div>
    </motion.div>
  )
}

// Planned Certificate Card (simpler design)
const PlannedCertificateCard = ({ certificate, index }: { certificate: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/30 rounded-xl p-3 sm:p-4 lg:p-6 hover:border-gray-500/50 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-2 lg:mb-3">
        <h4 className="text-sm sm:text-base lg:text-lg font-orbitron font-bold text-gray-200 leading-tight">
          {certificate.title}
        </h4>
        <div
          className={`px-2 py-1 bg-gradient-to-r ${getLevelColor(certificate.level)} text-white text-xs font-rajdhani font-bold rounded-full flex items-center gap-1`}
        >
          <FiTarget className="w-2 h-2 sm:w-3 sm:h-3" />
          <span className="hidden sm:inline">{certificate.level}</span>
          <span className="sm:hidden">{certificate.level.charAt(0)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2 lg:mb-3 text-xs sm:text-sm text-gray-400">
        <div className="flex items-center gap-1 font-rajdhani">
          <FiUser className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="truncate">{certificate.issuer}</span>
        </div>
        <div className="flex items-center gap-1 font-rajdhani">
          <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
          {certificate.expectedDate}
        </div>
      </div>

      <p className="text-gray-300 text-xs sm:text-sm mb-3 lg:mb-4 leading-relaxed line-clamp-2">
        {certificate.description}
      </p>

      <div className="flex flex-wrap gap-1 lg:gap-2">
        {certificate.skills.slice(0, 2).map((skill: string, idx: number) => (
          <span
            key={idx}
            className="px-2 py-0.5 lg:px-2 lg:py-1 bg-gray-600/20 text-gray-300 text-xs rounded-full border border-gray-500/30 font-rajdhani font-medium"
          >
            {skill}
          </span>
        ))}
        {certificate.skills.length > 2 && (
          <span className="px-2 py-0.5 lg:px-2 lg:py-1 bg-gray-600/20 text-gray-300 text-xs rounded-full border border-gray-500/30 font-rajdhani font-medium">
            +{certificate.skills.length - 2}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <StarField />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-20">
        {/* Header with back button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 lg:mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl text-gray-300 hover:text-white hover:border-blue-500/50 transition-all duration-300 w-fit"
          >
            <FiArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="font-rajdhani font-semibold text-sm lg:text-base">Back to Portfolio</span>
          </Link>

          <div className="text-left sm:text-right">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-orbitron font-black bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              ALL CERTIFICATES
            </h1>
            <p className="text-gray-400 font-rajdhani mt-1 lg:mt-2 text-sm lg:text-base">
              Professional Development Journey
            </p>
          </div>
        </motion.div>

        {/* Completed Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-blue-400 mb-6 lg:mb-8 flex items-center gap-2 lg:gap-3">
            <FiAward className="w-6 h-6 lg:w-8 lg:h-8" />
            COMPLETED CERTIFICATIONS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {allCertificates.map((certificate, index) => (
              <CertificateCard key={certificate.id} certificate={certificate} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Certificates in Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-orange-400 mb-6 lg:mb-8 flex items-center gap-2 lg:gap-3">
            <FiClock className="w-6 h-6 lg:w-8 lg:h-8" />
            CERTIFICATIONS IN PROGRESS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {certificatesInProgress.map((certificate, index) => (
              <CertificateCard key={certificate.id} certificate={certificate} index={index} isInProgress={true} />
            ))}
          </div>
        </motion.div>

        {/* More Certificates in Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-green-400 mb-6 lg:mb-8 flex items-center gap-2 lg:gap-3">
            <FiPlus className="w-6 h-6 lg:w-8 lg:h-8" />
            MORE CERTIFICATES IN PROGRESS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {moreCertificatesPlanned.map((certificate, index) => (
              <PlannedCertificateCard key={certificate.id} certificate={certificate} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        >
          <div className="text-center bg-blue-900/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-3 sm:p-4 lg:p-6">
            <div className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-blue-400 mb-1 lg:mb-2">
              {allCertificates.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-400 font-rajdhani uppercase tracking-wider">Completed</div>
          </div>
          <div className="text-center bg-orange-900/20 backdrop-blur-sm border border-orange-500/30 rounded-xl p-3 sm:p-4 lg:p-6">
            <div className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-orange-400 mb-1 lg:mb-2">
              {certificatesInProgress.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-400 font-rajdhani uppercase tracking-wider">In Progress</div>
          </div>
          <div className="text-center bg-green-900/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-3 sm:p-4 lg:p-6">
            <div className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-green-400 mb-1 lg:mb-2">
              {moreCertificatesPlanned.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-400 font-rajdhani uppercase tracking-wider">Planned</div>
          </div>
          <div className="text-center bg-purple-900/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-3 sm:p-4 lg:p-6">
            <div className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-purple-400 mb-1 lg:mb-2">
              {allCertificates.filter((cert) => cert.level === "Expert").length +
                certificatesInProgress.filter((cert) => cert.level === "Expert").length +
                moreCertificatesPlanned.filter((cert) => cert.level === "Expert").length}
            </div>
            <div className="text-xs sm:text-sm text-gray-400 font-rajdhani uppercase tracking-wider">Expert Level</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
