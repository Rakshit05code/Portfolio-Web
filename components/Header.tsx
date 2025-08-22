"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { FiGithub, FiTwitter, FiLinkedin, FiMenu, FiX, FiMail, FiSun, FiMoon, FiMonitor } from "react-icons/fi"
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase"; 

const navItems = [
  { name: "Home", href: "#home", icon: "🏠" },
  { name: "About", href: "#about", icon: "👨‍💻" },
  { name: "Projects", href: "#projects", icon: "🚀" },
  { name: "Certificates", href: "#certificates", icon: "🏆" },
  { name: "Contact", href: "#contact", icon: "📧" },
]

const ModernLogo = ({ className = "" }) => (
  <motion.div
    className={`flex items-center ${className}`}
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <div className="relative">
      {/* New hexagonal logo design */}
      <div className="h-12 w-12 relative flex items-center justify-center">
        <img src="/images/new-logo.png" alt="Rakshit Logo" className="w-full h-full object-contain" />

        {/* Animated glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-60"
          animate={{
            boxShadow: [
              "0 0 20px rgba(147, 51, 234, 0.4)",
              "0 0 40px rgba(147, 51, 234, 0.8)",
              "0 0 20px rgba(147, 51, 234, 0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>
    </div>

    <div className="ml-4 flex flex-col">
      {/* Modern logo text */}
      <div className="flex items-center">
        <span className="font-orbitron font-bold text-2xl text-purple-400">R</span>
        <span className="font-orbitron font-bold text-2xl text-slate-700 dark:text-slate-300">akshit</span>
        <span className="font-orbitron font-bold text-2xl text-purple-400">.</span>
        <span className="font-orbitron font-bold text-2xl text-blue-500">C</span>
        <span className="font-orbitron font-bold text-2xl text-slate-700 dark:text-slate-300">odes</span>
      </div>
      <span className="font-rajdhani font-medium text-xs text-slate-500 dark:text-slate-400 -mt-1 tracking-wider">
        FULL STACK DEVELOPER
      </span>
    </div>
  </motion.div>
)

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const themes = [
    { name: "light", icon: FiSun, label: "Light" },
    { name: "dark", icon: FiMoon, label: "Dark" },
    { name: "system", icon: FiMonitor, label: "System" },
  ]

  return (
    <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
      {themes.map(({ name, icon: Icon, label }) => (
        <motion.button
          key={name}
          onClick={() => setTheme(name)}
          className={`p-2.5 rounded-lg transition-all duration-300 ${
            theme === name
              ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={label}
        >
          <Icon className="w-4 h-4" />
        </motion.button>
      ))}
    </div>
  )
}

const TabNavigation = ({ activeSection, setActiveSection }) => {
  return (
    <div className="hidden lg:flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-2 border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20">
      {navItems.map((item) => (
        <motion.a
          key={item.name}
          href={item.href}
          className={`relative px-4 xl:px-6 py-3 rounded-xl font-rajdhani font-semibold transition-all duration-300 flex items-center gap-2 text-sm xl:text-base ${
            activeSection === item.name.toLowerCase()
              ? "text-white"
              : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {activeSection === item.name.toLowerCase() && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg shadow-cyan-500/25"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10 text-sm">{item.icon}</span>
          <span className="relative z-10 text-sm font-semibold tracking-wide">{item.name}</span>
        </motion.a>
      ))}
    </div>
  )
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.name.toLowerCase())
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  function toggleMenu() {
    setIsOpen((prev) => !prev)
  }

  function openContactForm() {
    setContactFormOpen(true)
  }

  function closeContactForm() {
    setContactFormOpen(false)
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/10 dark:shadow-slate-900/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            delay: 0.3,
            duration: 1.2,
          }}
        >
          <ModernLogo />
        </motion.div>

        {/* TAB NAVIGATION */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <TabNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
        </motion.div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <ThemeToggle />

          <div className="flex items-center space-x-2 lg:space-x-3">
            <motion.a
              href="https://github.com/Rakshit05code"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 transition-all duration-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-110"
            >
              <FiGithub className="w-4 h-4 lg:w-5 lg:h-5" />
            </motion.a>
            <motion.a
              href="https://x.com/Rakshit_code"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 transition-all duration-300 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-110"
            >
              <FiTwitter className="w-4 h-4 lg:w-5 lg:h-5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/rakshit-chaudhary-aa689531b/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 transition-all duration-300 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-110"
            >
              <FiLinkedin className="w-4 h-4 lg:w-5 lg:h-5" />
            </motion.a>
          </div>

          <motion.button
            onClick={openContactForm}
            className="ml-2 lg:ml-4 px-4 lg:px-6 py-2 lg:py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-rajdhani font-bold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 tracking-wide text-sm lg:text-base"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1.6,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            Hire Me
          </motion.button>
        </div>

        {/* MOBILE MENU ICON */}
        <motion.button
          className="md:hidden flex items-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2"
          onClick={toggleMenu}
          whileTap={{ scale: 0.7 }}
        >
          {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50"
          >
            <nav className="flex flex-col px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-rajdhani font-semibold py-2 transition-colors tracking-wide"
                  onClick={toggleMenu}
                >
                  <span>{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="px-4 pb-6 border-t border-slate-200/50 dark:border-slate-700/50 pt-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/Rakshit05code"
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    <FiGithub className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/rakshit.rc_ary/"
                    className="text-slate-600 dark:text-slate-400 hover:text-sky-500"
                  >
                    <FiTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rakshit-chaudhary-aa689531b/"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600"
                  >
                    <FiLinkedin className="w-5 h-5" />
                  </a>
                </div>
                <ThemeToggle />
              </div>
              <button
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-rajdhani font-bold tracking-wide"
                onClick={() => {
                  toggleMenu()
                  openContactForm()
                }}
              >
                Contact Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

{/* CONTACT FORM MODAL */}
<AnimatePresence>
  {contactFormOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={closeContactForm}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl px-6 lg:px-8 py-8 lg:py-10 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
          onClick={closeContactForm}
        >
          <FiX className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <FiMail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl lg:text-2xl font-orbitron font-bold text-slate-900 dark:text-white mb-2">
            Get In Touch
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-rajdhani">Let's discuss your next project</p>
        </div>

        {/* ✅ FIREBASE CONNECTED FORM */}
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const statusDiv = form.querySelector("#form-status") as HTMLDivElement;
            const name = (form.elements.namedItem("name") as HTMLInputElement).value;
            const email = (form.elements.namedItem("email") as HTMLInputElement).value;
            const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

            try {
              await addDoc(collection(db, "messages"), {
                name,
                email,
                message,
                createdAt: Timestamp.now(),
              });
              statusDiv.textContent = "✅ Message sent successfully!";
              statusDiv.className = "text-green-600 text-center font-medium";
              form.reset();
            } catch (err) {
              console.error("Error saving message:", err);
              statusDiv.textContent = "❌ Failed to send message. Try again.";
              statusDiv.className = "text-red-600 text-center font-medium";
            }
          }}
        >
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-rajdhani"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-rajdhani"
            />
          </div>
          <div>
            <textarea
              rows={4}
              name="message"
              placeholder="Tell me about your project..."
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none font-rajdhani"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-rajdhani font-bold hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25 transition-all duration-300 tracking-wide"
          >
            Send Message
          </button>

          {/* ✅ Status message will show here */}
          <div id="form-status" className="mt-3 text-center text-sm"></div>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


    </header>
  )
}
