import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

function FloatingDarkToggle({ dark, toggleDark }) {
  return (
    <motion.button
      onClick={toggleDark}
      initial={{ opacity: 1, scale: 0.7, x: 20 }}
      animate={{ opacity: 3, scale: 1, x: 0 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 22 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Toggle dark mode"
className="fixed top-5 right-5 z-[200] w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl border transition-all duration-300 bg-white dark:bg-slate-800"      
style={{
  borderColor: dark
    ? 'rgba(99, 179, 237, 0.8)'
    : 'rgba(59, 130, 246, 0.6)',
  boxShadow: dark
    ? '0 6px 32px rgba(59,130,246,0.6), 0 1px 4px rgba(0,0,0,0.8)'
    : '0 6px 32px rgba(59,130,246,0.4), 0 1px 4px rgba(0,0,0,0.2)',
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
            <Sun size={22} className="text-amber-400" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <Moon size={22} className="text-blue-600" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default FloatingDarkToggle