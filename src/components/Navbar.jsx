
import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// visible       — bool: dots hover ekaka control karanawa
// activeSection — current section index (dots glow update karanawa)
// onNavClick    — section index ekak pass karanawa (Home.jsx scroll logic call karanawa)
// toggleDark    — dark mode toggle
// dark          — dark mode state
function Navbar({ visible, activeSection = -1, onNavClick, toggleDark, dark }) {

  const sections = [
    { id: 'home',         label: 'Home',         index: 0 },
    { id: 'about',        label: 'About',         index: 1 },
    { id: 'education',    label: 'Education',     index: 2 },
    { id: 'projects',     label: 'Projects',      index: 3 },
    { id: 'contact',      label: 'Contact',       index: 5 },
  ]

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{    opacity: 0, y: 20, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-1 bg-slate-900/88 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/10 shadow-2xl">

            {/* Brand */}
            <span className="text-white/80 font-semibold text-sm mr-2 px-1 whitespace-nowrap">
              Anjula Nimedha
            </span>
            <div className="w-px h-4 bg-white/20 mx-2" />

            {/* Nav links */}
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => onNavClick && onNavClick(sec.index)}
                className={`
                  relative px-4 py-1.5 rounded-xl text-sm font-medium transition-colors duration-150 whitespace-nowrap
                  ${activeSection === sec.index ? 'text-white' : 'text-slate-400 hover:text-white'}
                `}
              >
                {activeSection === sec.index && (
                  <motion.span
                    layoutId="navActivePill"
                    className="absolute inset-0 bg-blue-600/30 rounded-xl border border-blue-500/40"
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{sec.label}</span>
              </button>
            ))}

            <div className="w-px h-4 bg-white/20 mx-2" />

            {/* Dark mode toggle — original button keep */}
            <button
              onClick={toggleDark}
              className="p-1.5 rounded-xl border border-white/15 text-slate-400 hover:text-white hover:border-white/30 transition-colors"
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default Navbar