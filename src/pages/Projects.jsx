import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { FaGithub } from 'react-icons/fa'
import { Sparkles, X, Send, Loader2 } from 'lucide-react'

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const projects = [
  {
    title: 'E-commerce Test Suite',
    tag: 'QA',
    desc: 'Automated regression testing with Selenium WebDriver covering 200+ test cases across checkout, auth, and payment flows. Integrated with CI/CD pipeline for nightly runs.',
    tech: ['Selenium', 'Java', 'TestNG', 'Maven', 'Jenkins'],
    github: '#',
    color: 'blue',
  },
  {
    title: 'API Test Framework',
    tag: 'QA',
    desc: 'Built a modular API testing framework from scratch using Postman and Newman with CI integration. Reduced regression time by 60% and enabled schema validation across 50+ endpoints.',
    tech: ['Postman', 'Newman', 'Jenkins', 'Node.js'],
    github: '#',
    color: 'purple',
  },
  {
    title: 'Sprint Planning Tool',
    tag: 'PM',
    desc: 'Led sprint planning and backlog grooming for a 6-person development team. Introduced velocity tracking dashboards that improved delivery predictability by 35%.',
    tech: ['JIRA', 'Confluence', 'Agile', 'Scrum'],
    github: '#',
    color: 'teal',
  },
  {
    title: 'Bug Tracking System',
    tag: 'QA',
    desc: 'Implemented end-to-end bug tracking workflow reducing resolution time by 40%. Built custom dashboards for severity triage and SLA monitoring.',
    tech: ['JIRA', 'Zephyr', 'Slack', 'Python'],
    github: '#',
    color: 'amber',
  },
  {
    title: 'Release Management',
    tag: 'PM',
    desc: 'Coordinated 3 major release cycles with cross-functional teams and stakeholders. Created release runbooks and rollback procedures adopted company-wide.',
    tech: ['Trello', 'Notion', 'Agile', 'Git'],
    github: '#',
    color: 'pink',
  },
  {
    title: 'Performance Testing',
    tag: 'Both',
    desc: 'Load testing for high-traffic web app ensuring 99.9% uptime under peak load. Identified 3 critical bottlenecks that were resolved before production launch.',
    tech: ['JMeter', 'Grafana', 'AWS', 'k6'],
    github: '#',
    color: 'teal',
  },
]

const tagStyle = {
  QA:   'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50',
  PM:   'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/50',
  Both: 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700/50',
}

const cardAccent = {
  blue:   'border-blue-200 dark:border-blue-800/60 hover:border-blue-400 dark:hover:border-blue-600',
  purple: 'border-purple-200 dark:border-purple-800/60 hover:border-purple-400 dark:hover:border-purple-600',
  teal:   'border-teal-200 dark:border-teal-800/60 hover:border-teal-400 dark:hover:border-teal-600',
  amber:  'border-amber-200 dark:border-amber-800/60 hover:border-amber-400 dark:hover:border-amber-600',
  pink:   'border-pink-200 dark:border-pink-800/60 hover:border-pink-400 dark:hover:border-pink-600',
}

const dotColor = {
  blue: 'bg-blue-500', purple: 'bg-purple-500', teal: 'bg-teal-500',
  amber: 'bg-amber-500', pink: 'bg-pink-500',
}

/* ─── AI PANEL ───────────────────────────────────────────────────────────── */
function AIPanel({ project, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hi! I'm here to help you understand the **${project.title}** project. Ask me anything — tech stack, challenges, outcomes, or how it fits Anjula's skills! 💡`,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  const send = async () => {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    const newMessages = [...messages, { role: 'user', text: q }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const history = newMessages.map(m => ({
        role: m.role,
        content: m.text,
      }))

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are a helpful assistant embedded in Anjula Nimedha's portfolio website. 
You answer questions specifically about the project: "${project.title}".
Project details:
- Description: ${project.desc}
- Technologies: ${project.tech.join(', ')}
- Category: ${project.tag} (QA = Quality Assurance, PM = Project Management)
- Owner: Anjula Nimedha, a QA Engineer based in Colombo, Sri Lanka, aspiring to be a Project Manager.

Keep answers concise, friendly, and relevant to this project. If asked about unrelated topics, gently redirect back to the project. Format responses in plain text, no markdown.`,
          messages: history,
        }),
      })

      const data = await res.json()
      const reply = data?.content?.[0]?.text || 'Sorry, something went wrong. Please try again!'
      setMessages(prev => [...prev, { role: 'assistant', text: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Connection error. Please try again!' }])
    } finally {
      setLoading(false)
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 340, damping: 28 }}
      className="mt-4 rounded-2xl border border-blue-200 dark:border-blue-800/60 bg-blue-50/60 dark:bg-blue-950/30 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-blue-200 dark:border-blue-800/50 bg-white/60 dark:bg-gray-900/60">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center">
            <Sparkles size={12} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-800 dark:text-white">Ask AI about this project</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 font-medium">Beta</span>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <X size={15} />
        </button>
      </div>

      {/* Messages */}
      <div className="h-52 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-sm'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-bl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-3 py-2 rounded-xl rounded-bl-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-2">
              <Loader2 size={13} className="animate-spin text-blue-500" />
              <span className="text-xs text-gray-400">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 px-4 py-3 border-t border-blue-200 dark:border-blue-800/50 bg-white/60 dark:bg-gray-900/60">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask about tech stack, challenges, outcomes..."
          className="flex-1 text-sm px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition"
        />
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={send}
          disabled={loading || !input.trim()}
          className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 flex items-center justify-center transition-colors"
        >
          <Send size={14} className="text-white" />
        </motion.button>
      </div>
    </motion.div>
  )
}

/* ─── PROJECT CARD ───────────────────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [aiOpen, setAiOpen] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl border transition-all duration-300 p-6 shadow-sm hover:shadow-md ${cardAccent[project.color]}`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dotColor[project.color]}`} />
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagStyle[project.tag]}`}>
            {project.tag}
          </span>
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <FaGithub size={17} />
        </a>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 leading-snug">
        {project.title}
      </h3>

      {/* Desc */}
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
        {project.desc}
      </p>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.map(t => (
          <span key={t} className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 font-medium border border-gray-200 dark:border-gray-700">
            {t}
          </span>
        ))}
      </div>

      {/* AI button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setAiOpen(v => !v)}
        className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl transition-all ${
          aiOpen
            ? 'bg-blue-600 text-white'
            : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700/50 hover:bg-blue-100 dark:hover:bg-blue-900/50'
        }`}
      >
        <Sparkles size={12} />
        {aiOpen ? 'Close AI Chat' : 'Ask AI about this'}
      </motion.button>

      {/* AI Panel */}
      <AnimatePresence>
        {aiOpen && <AIPanel project={project} onClose={() => setAiOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── MAIN ───────────────────────────────────────────────────────────────── */
export default function Projects() {
  const [filter, setFilter] = useState('All')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true })

  const filters = ['All', 'QA', 'PM', 'Both']
  const filtered = filter === 'All' ? projects : projects.filter(p => p.tag === filter)

  return (
    <div ref={sectionRef} className="min-h-screen px-8 py-16 max-w-5xl mx-auto w-full">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">My Work</p>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3">Featured Projects</h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
          A collection of my recent work in QA automation and project management.
          Click <span className="text-blue-600 dark:text-blue-400 font-medium">Ask AI about this</span> on any project to learn more with AI!
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="flex gap-2 flex-wrap mb-8"
      >
        {filters.map(f => (
          <motion.button
            key={f}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === f
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-200 dark:shadow-blue-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {f}
          </motion.button>
        ))}
        <span className="ml-auto self-center text-xs text-gray-400 dark:text-gray-500">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
        </span>
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

    </div>
  )
}