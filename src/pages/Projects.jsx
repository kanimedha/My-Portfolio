import PropTypes from 'prop-types'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { FaGithub } from 'react-icons/fa'


const projects = [
  {
    title: 'Flower Shop Management System',
    tag: 'Group',
    desc: 'A web-based flower shop management system built as a group project. Handles inventory, orders, and customer management with a clean UI.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    github: 'https://github.com/kanimedha/flowershop',
    color: 'pink',
  },
  {
    title: 'Employee Payroll System',
    tag: 'Personal',
    desc: 'A C language based employee payroll system that calculates salaries, deductions, and generates payslips for employees.',
    tech: ['C'],
    github: 'https://github.com/kanimedha/Employee-Payroll-System',
    color: 'blue',
  },
 
  {
    title: 'Car Rental Flutter Mobile App',
    tag: 'Personal',
    desc: 'My first Flutter mobile application — exploring cross-platform mobile development with Dart and Flutter framework.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/kanimedha/flutter_application_1',
    color: 'purple',
  },
  {
    title: 'Rescue Mobile Application',
    tag: 'Group',
    desc: 'This Rescue Mobile Application connecting users to emergency services like police, fire, and ambulance for fast help during critical situations.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/kanimedha/rescue_flutter_app',
    color: 'pink',
  },
  {
    title: 'My Portfolio Website',
    tag: 'Personal',
    desc: 'This portfolio website built with React, Tailwind CSS, and Framer Motion. Deployed on GitHub Pages and Vercel.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    github: 'https://github.com/kanimedha/My-Portfolio',
    color: 'blue',
  },
]

const tagStyle = {
  Personal: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50',
  Group:    'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/50',
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

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl border transition-all duration-300 p-6 shadow-sm hover:shadow-md ${cardAccent[project.color]}`}
    >
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

      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 leading-snug">
        {project.title}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
        {project.desc}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.map(t => (
          <span key={t} className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 font-medium border border-gray-200 dark:border-gray-700">
            {t}
          </span>
        ))}
      </div>

      <motion.a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all w-fit"
      >
        <FaGithub size={12} />
        View GitHub Repository
      </motion.a>
    </motion.div>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string).isRequired,
    github: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true })

  const filters = ['All', 'Personal', 'Group']
  const filtered = filter === 'All' ? projects : projects.filter(p => p.tag === filter)

  return (
    <div ref={sectionRef} className="min-h-screen px-8 py-16 max-w-5xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">My Work</p>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3">Featured Projects</h2>
        <p >
          A collection of my projects from university and personal learning.</p>
          <p>Click <span className="text-blue-600 dark:text-blue-400 font-medium">GitHub Repository</span> to explore the code and learn more about each project.
        </p>
      </motion.div>

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
          {filtered.length} project{filtered.length === 1 ? '' : 's'}
        </span>
      </motion.div>

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
