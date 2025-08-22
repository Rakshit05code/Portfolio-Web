"use client"

import { motion } from "framer-motion"
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiCode } from "react-icons/fi"
import StarField from "./StarField"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-t border-slate-800 dark:border-slate-800">
      {/* Enhanced Star Field Animation */}
      <div className="absolute inset-0 z-0">
        <StarField density="medium" colors={["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EC4899"]} opacity={0.5} />
      </div>

      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden z-1">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-orbitron font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                Rakshit.Codes
              </h3>
              <p className="text-slate-400 dark:text-slate-400 font-rajdhani leading-relaxed mb-6">
                Building secure digital experiences with cutting-edge technologies. Where creativity meets code.
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <motion.a
                  href="https://github.com/Rakshit05code"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 bg-slate-800 dark:bg-slate-800 rounded-xl text-slate-400 dark:text-slate-400 hover:text-white hover:bg-slate-700 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  <FiGithub className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/rakshit-chaudhary-aa689531b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 bg-slate-800 dark:bg-slate-800 rounded-xl text-slate-400 dark:text-slate-400 hover:text-blue-400 hover:bg-slate-700 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  <FiLinkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                   href="https://mail.google.com/mail/?view=cm&fs=1&to=rakshitchaudhary323@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 bg-slate-800 dark:bg-slate-800 rounded-xl text-slate-400 dark:text-slate-400 hover:text-cyan-400 hover:bg-slate-700 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  <FiMail className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-orbitron font-bold text-slate-900 dark:text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "About", "Projects", "Certificates", "Contact"].map((item, index) => (
                  <li key={item}>
                    <motion.a
                      href={`#${item.toLowerCase()}`}
                      whileHover={{ x: 5 }}
                      className="text-slate-600 dark:text-slate-400 hover:text-cyan-400 transition-colors font-rajdhani"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-orbitron font-bold text-slate-900 dark:text-white mb-6">Let's Connect</h4>
              <div className="space-y-3">
                <p className="text-slate-600 dark:text-slate-400 font-rajdhani">
                  <span className="text-cyan-400">Email:</span> rakshitchaudhary323@gmail.com
                </p>
                <p className="text-slate-600 dark:text-slate-400 font-rajdhani">
                  <span className="text-cyan-400">Location:</span> India
                </p>
                <p className="text-slate-600 dark:text-slate-400 font-rajdhani">
                  <span className="text-cyan-400">Status:</span> Available for opportunities
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-slate-800 dark:border-slate-800 pt-8 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 font-rajdhani">
              <FiCode className="w-4 h-4" />
              <span>© {currentYear} Rakshit Chaudhary. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 font-rajdhani">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                <FiHeart className="w-4 h-4 text-red-400" />
              </motion.div>
              <span>& ☕ by Rakshit</span>
            </div>
          </div>

          {/* Enhanced Thanks Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl border border-purple-500/30 dark:border-purple-500/30"
          >
            <h3 className="text-2xl font-orbitron font-bold text-purple-300 dark:text-purple-300 mb-3">
              🎊 Thanks for visiting my profile!
            </h3>
            <div className="space-y-2 text-purple-200 dark:text-purple-200 font-rajdhani">
              <p>Thanks for stopping by! 👋</p>
              <p>Let's build something secure together! 🚀</p>
              <p className="font-bold text-cyan-400 dark:text-cyan-400">"Secure code, secure future!" 🔐💻</p>
            </div>
            <div className="mt-4 text-sm text-purple-300 dark:text-purple-300">
              <p>
                ⭐️ From{" "}
                <a
                  href="https://github.com/Rakshit05code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 dark:text-cyan-400 hover:text-cyan-300 dark:hover:text-cyan-300 transition-colors"
                >
                  Rakshit05code
                </a>{" "}
                - <strong>RAKSHIT CHAUDHARY</strong> with 💜 & ☕
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
