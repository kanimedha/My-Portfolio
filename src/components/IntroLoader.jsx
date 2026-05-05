import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const words = ['Quality.', 'Precision.', 'Leadership.']

function IntroLoader({ onComplete }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState('words') // 'words' | 'name' | 'exit'
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(progressInterval); return 100 }
        return p + 1.4
      })
    }, 28)

    // Cycle through words
    const wordTimers = words.map((_, i) =>
      setTimeout(() => setWordIndex(i), i * 700)
    )

    // Show name after words
    const nameTimer = setTimeout(() => setPhase('name'), words.length * 700 + 200)

    // Exit
    const exitTimer = setTimeout(() => {
      setPhase('exit')
      setTimeout(onComplete, 600)
    }, words.length * 700 + 1400)

    return () => {
      clearInterval(progressInterval)
      wordTimers.forEach(clearTimeout)
      clearTimeout(nameTimer)
      clearTimeout(exitTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#020617' }}
        >
          {/* Radial glow bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.13) 0%, transparent 70%)'
            }}
          />

          {/* Grid lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />

          {/* Corner brackets */}
          {[
            'top-8 left-8 border-t-2 border-l-2',
            'top-8 right-8 border-t-2 border-r-2',
            'bottom-8 left-8 border-b-2 border-l-2',
            'bottom-8 right-8 border-b-2 border-r-2',
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className={`absolute w-8 h-8 border-blue-500/40 ${cls}`}
            />
          ))}

          {/* Center content */}
          <div className="flex flex-col items-center gap-6 relative z-10">

            {/* Monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 280, damping: 20 }}
              className="w-16 h-16 rounded-2xl border border-blue-500/40 flex items-center justify-center mb-2"
              style={{ background: 'rgba(59,130,246,0.08)', backdropFilter: 'blur(8px)' }}
            >
              <span className="text-blue-400 font-bold text-xl tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>AN</span>
            </motion.div>

            {/* Animated words */}
            <div className="h-14 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {phase === 'words' && (
                  <motion.p
                    key={wordIndex}
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="text-3xl font-light text-white tracking-wide"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {words[wordIndex]}
                  </motion.p>
                )}
                {phase === 'name' && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="text-center"
                  >
                    <p className="text-2xl font-semibold text-white tracking-widest uppercase" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.2em' }}>
                      Anjula Nimedha
                    </p>
                    <p className="text-xs text-blue-400 tracking-[0.3em] uppercase mt-1">Portfolio</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-px bg-white/10 rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #3b82f6, #60a5fa)'
                }}
                transition={{ duration: 0.05 }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.3 }}
              className="text-[10px] text-white/40 tracking-[0.25em] uppercase"
            >
              Loading portfolio
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default IntroLoader
