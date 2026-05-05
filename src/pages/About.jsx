import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const qaSkills = [
  { name: 'Manual Testing',   level: 90 },
  { name: 'Test Automation',  level: 75 },
  { name: 'API Testing',      level: 80 },
  { name: 'Selenium',         level: 70 },
  { name: 'Postman',          level: 85 },
  { name: 'JIRA',             level: 90 },
]

const pmSkills = [
  { name: 'Agile & Scrum',   level: 80 },
  { name: 'Sprint Planning', level: 75 },
  { name: 'Risk Management', level: 70 },
  { name: 'Confluence',      level: 75 },
  { name: 'Trello',          level: 85 },
]

// ── Circular progress ring ──────────────────────────────────────────────────
function CircleSkill({ name, level, color, delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !animated) {
      const t = setTimeout(() => setAnimated(true), delay * 1000)
      return () => clearTimeout(t)
    }
  }, [isInView, animated, delay])

  const size = 80
  const strokeWidth = 6
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animated ? level / 100 : 0) * circumference

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-100 dark:text-gray-700"
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: animated ? 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' : 'none',
              filter: `drop-shadow(0 0 4px ${color}60)`
            }}
          />
        </svg>
        {/* Percent label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: animated ? 1 : 0 }}
            transition={{ delay: 0.4 }}
            className="text-xs font-semibold text-gray-700 dark:text-gray-300"
          >
            {level}%
          </motion.span>
        </div>
      </div>
      <span className="text-[11px] text-center text-gray-600 dark:text-gray-400 leading-tight max-w-[72px]">{name}</span>
    </div>
  )
}

function About() {
  const softSkills = [
    'Attention to Detail',
    'Team Collaboration',
    'Problem Solving',
    'Leadership',
    'Communication',
    'Critical Thinking',
  ]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true })

  return (
    <div ref={sectionRef} className="min-h-screen px-8 py-16 max-w-5xl mx-auto w-full">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">About me</p>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Who I am</h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
          I'm a QA Engineer passionate about software quality and aspiring to grow into a Project Manager role.
          Based in Colombo, Sri Lanka — I love bridging the gap between technical teams and business goals.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

        {/* QA Skills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
            <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">QA Skills</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {qaSkills.map((skill, i) => (
              <CircleSkill
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color="#3b82f6"
                delay={0.2 + i * 0.12}
              />
            ))}
          </div>
        </motion.div>

        {/* PM Skills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
            <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">PM Skills</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {pmSkills.map((skill, i) => (
              <CircleSkill
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color="#8b5cf6"
                delay={0.3 + i * 0.12}
              />
            ))}
          </div>
        </motion.div>

      </div>

      {/* Soft Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
          <h3 className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Soft Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {softSkills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.08 }}
              whileHover={{ scale: 1.07, y: -2 }}
              className="px-4 py-2 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm cursor-default border border-teal-100 dark:border-teal-800/50 transition-colors"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

    </div>
  )
}

export default About
