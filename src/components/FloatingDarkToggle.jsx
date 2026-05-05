import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

function FloatingDarkToggle({ dark, toggleDark }) {
  return (
    <motion.button
      onClick={toggleDark}
      initial={{ opacity: 0, scale: 0.7, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 300, damping: 22 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Toggle dark mode"
      className="fixed top-5 right-5 z-[200] w-11 h-11 rounded-2xl flex items-center justify-center shadow-xl border transition-all duration-300"
      style={{
        background: dark
          ? 'rgba(30, 41, 59, 0.92)'
          : 'rgba(255, 255, 255, 0.92)',
        borderColor: dark
          ? 'rgba(99, 179, 237, 0.25)'
          : 'rgba(59, 130, 246, 0.18)',
        backdropFilter: 'blur(12px)',
        boxShadow: dark
          ? '0 4px 24px rgba(59,130,246,0.18), 0 1px 4px rgba(0,0,0,0.4)'
          : '0 4px 24px rgba(59,130,246,0.10), 0 1px 4px rgba(0,0,0,0.08)',
      }}
    >
      <AnimatePresence mode="wait">
        {dark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <Sun size={17} className="text-amber-400" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <Moon size={17} className="text-blue-600" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default FloatingDarkToggle
