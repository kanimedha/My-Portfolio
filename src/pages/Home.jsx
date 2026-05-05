import { motion } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import Character from '../components/Character'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import ProjectPagination from '../components/ProjectPagination'

// ── Real section components ──────────────────────────────────────────────────
import About        from './About'
import Education    from './Education'
import Projects     from './Projects'
import Achivements  from './Achivements'
import Contact      from './Contact'

const titles = [
  'QA Engineer',
  'Aspiring Project Manager',
  'Test Automation Specialist',
  'Agile Practitioner',
]

const navSections = [
  { id: 'home',         label: 'Home'         },
  { id: 'about',        label: 'About'        },
  { id: 'education',    label: 'Education'    },
  { id: 'projects',     label: 'Projects'     },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact',      label: 'Contact'      },
]

// ── Particle background ──────────────────────────────────────────────────────
function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width  = canvas.offsetWidth
    let height = canvas.offsetHeight
    canvas.width  = width
    canvas.height = height

    // Detect dark mode
    const isDark = document.documentElement.classList.contains('dark')

    const PARTICLE_COUNT = 55
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:    Math.random() * width,
      y:    Math.random() * height,
      r:    Math.random() * 1.8 + 0.4,
      vx:   (Math.random() - 0.5) * 0.35,
      vy:   (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    let animId
    const CONNECTION_DIST = 130

    function draw() {
      ctx.clearRect(0, 0, width, height)

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.18
            ctx.beginPath()
            ctx.strokeStyle = isDark
              ? `rgba(99, 179, 237, ${opacity})`
              : `rgba(59, 130, 246, ${opacity})`
            ctx.lineWidth = 0.6
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = isDark
          ? `rgba(147, 197, 253, ${p.alpha})`
          : `rgba(59, 130, 246, ${p.alpha})`
        ctx.fill()

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width)  p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width  = width
      canvas.height = height
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  )
}

// ── Main Home component ──────────────────────────────────────────────────────
function Home({ toggleDark, dark }) {
  const [titleIndex, setTitleIndex]       = useState(0)
  const [displayed, setDisplayed]         = useState('')
  const [typing, setTyping]               = useState(true)
  const [activeSection, setActiveSection] = useState(0)
  const [navVisible, setNavVisible]       = useState(false)

  // ProjectPagination state — managed here so arrow keys can control it
  const [projectIndex, setProjectIndex]   = useState(0)
  const TOTAL_PROJECTS = 6

  const hideTimer = useRef(null)

  // ── Typing effect ──────────────────────────────────────────────────────────
  useEffect(() => {
    const current = titles[titleIndex]
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2000)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
        return () => clearTimeout(t)
      } else {
        setTitleIndex((p) => (p + 1) % titles.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, titleIndex])

  // ── Scroll to section ──────────────────────────────────────────────────────
  const scrollToSection = useCallback((index) => {
    setActiveSection(index)
    setNavVisible(false)
    const el = document.getElementById(navSections[index].id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // ── IntersectionObserver — sync dot with scroll ────────────────────────────
  useEffect(() => {
    const observers = navSections.map((sec, index) => {
      const el = document.getElementById(sec.id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(index) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o && o.disconnect())
  }, [])

  // ── Arrow key navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e) => {
      // If in projects section, Left/Right control project pagination
      if (activeSection === 3) {
        if (e.key === 'ArrowDown') {
          setProjectIndex((p) => (p + 1) % TOTAL_PROJECTS)
          return
        }
        if (e.key === 'ArrowUp') {
          setProjectIndex((p) => (p - 1 + TOTAL_PROJECTS) % TOTAL_PROJECTS)
          return
        }
      }

      if (e.key === 'ArrowRight') {
        const next = Math.min(activeSection + 1, navSections.length - 1)
        scrollToSection(next)
      } else if (e.key === 'ArrowLeft') {
        const next = Math.max(activeSection - 1, 0)
        scrollToSection(next)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [scrollToSection, activeSection])

  // ── Dots hover handlers ────────────────────────────────────────────────────
  const handleDotsEnter = () => { clearTimeout(hideTimer.current); setNavVisible(true) }
  const handleDotsLeave = () => { hideTimer.current = setTimeout(() => setNavVisible(false), 500) }
  const handleNavEnter  = () => clearTimeout(hideTimer.current)
  const handleNavLeave  = () => { hideTimer.current = setTimeout(() => setNavVisible(false), 400) }

  return (
    <div className="relative">

      {/* ── Particle background ─────────────────────────────────────────── */}
      <ParticleBackground />

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <div onMouseEnter={handleNavEnter} onMouseLeave={handleNavLeave}>
        <Navbar
          visible={navVisible}
          activeSection={activeSection}
          onNavClick={scrollToSection}
          toggleDark={toggleDark}
          dark={dark}
        />
      </div>

      {/* ── Dots bar — always visible ────────────────────────────────────── */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
        onMouseEnter={handleDotsEnter}
        onMouseLeave={handleDotsLeave}
      >
        <div className="flex items-center gap-2 bg-slate-900/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/15 shadow-lg cursor-pointer">
          {navSections.map((sec, i) => (
            <motion.button
              key={sec.id}
              onClick={() => scrollToSection(i)}
              title={sec.label}
              animate={{
                width:           activeSection === i ? 16 : 7,
                height:          7,
                backgroundColor: activeSection === i ? '#3b82f6' : '#94a3b8',
                boxShadow:       activeSection === i
                  ? '0 0 10px rgba(59,130,246,0.9)'
                  : 'none',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="rounded-full"
            />
          ))}
        </div>
      </div>

      {/* ── HOME SECTION ────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center px-8 md:px-16 max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center gap-12 w-full">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Character message="Welcome! Let me show you around 😊" waveOnLoad />
            </motion.div>
          </motion.div>

          <div className="flex-1 flex flex-col items-start text-left">

            <motion.p
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2"
            >
              Welcome to my portfolio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-3"
            >
              Hi, I'm Anjula Nimedha 👋
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-4 h-8"
            >
              {displayed}<span className="animate-pulse text-blue-500">|</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 dark:text-gray-400 mb-6 max-w-md leading-relaxed"
            >
              Based in Colombo, Sri Lanka — passionate about software quality
              and growing into project leadership.
            </motion.p>

            <div className="flex gap-2 flex-wrap mb-8">
              {[
                { label: 'Quality Assurance',  color: 'bg-blue-100   dark:bg-blue-900/50   text-blue-800   dark:text-blue-200'   },
                { label: 'Project Management', color: 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200' },
                { label: 'Test Automation',    color: 'bg-teal-100   dark:bg-teal-900/50   text-teal-800   dark:text-teal-200'   },
              ].map((tag, i) => (
                <motion.span
                  key={tag.label}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium ${tag.color}`}
                >
                  {tag.label}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex gap-3 flex-wrap mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection(3)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-semibold transition-colors"
              >
                See my work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection(5)}
                className="px-6 py-3 border border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 rounded-2xl text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              >
                Get in touch
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                href="/cv/CV.pdf" download="Anjula_Nimedha_CV.pdf"
                className="px-6 py-3 border border-blue-400 dark:border-blue-600 text-blue-600 dark:text-blue-400 rounded-2xl text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              >
                Download CV ↓
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-5 items-center"
            >
              {[
                { href: 'https://github.com/kanimedha',                          icon: <FaGithub size={24} />,   label: 'GitHub'   },
                { href: 'https://www.linkedin.com/in/anjula-nimedha-1199a930b/', icon: <FaLinkedin size={24} />, label: 'LinkedIn' },
                { href: 'mailto:anjulanimeda@gmail.com',                         icon: <FaEnvelope size={24} />, label: 'Email'    },
              ].map((s) => (
                <motion.a
                  key={s.label} href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }} whileTap={{ scale: 0.95 }}
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={s.label}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-10 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-600 select-none"
            >
              <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>↓</motion.span>
              <span>Use arrow keys to navigate sections</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ───────────────────────────────────────────────── */}
      <section
        id="about"
        className="relative min-h-screen flex items-center bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-sm"
      >
        <About />
      </section>

      {/* ── EDUCATION SECTION ───────────────────────────────────────────── */}
      <section
        id="education"
        className="relative min-h-screen flex items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
      >
        <Education />
      </section>

      {/* ── PROJECTS SECTION ────────────────────────────────────────────── */}
      <section
        id="projects"
        className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-sm"
      >
        <Projects />
        {/* Pagination dot bar for projects */}
        <ProjectPagination
          currentIndex={projectIndex}
          setCurrentIndex={setProjectIndex}
        />
      </section>

      {/* ── ACHIEVEMENTS SECTION ────────────────────────────────────────── */}
      <section
        id="achievements"
        className="relative min-h-screen flex items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
      >
        <Achivements />
      </section>

      {/* ── CONTACT SECTION ─────────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative min-h-screen flex items-center bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-sm"
      >
        <Contact />
      </section>

    </div>
  )
}

export default Home
