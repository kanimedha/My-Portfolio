import { motion } from 'framer-motion'
import { useRef } from 'react'
import {
  SiSelenium, SiPostman, SiJira, SiTrello,
  SiPython, SiGit, SiGithub, SiFlutter,
  SiTypescript, SiJavascript, SiTailwindcss, SiFigma,
  SiPhp, SiMysql, SiReact, SiC,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

const skillIcons = [
  { icon: <SiSelenium size={16} color="#43B02A" />, name: 'Selenium' },
  { icon: <SiPostman  size={16} color="#FF6C37" />, name: 'Postman'  },
  { icon: <SiJira     size={16} color="#0052CC" />, name: 'JIRA'     },
  { icon: <SiTrello   size={16} color="#0079BF" />, name: 'Trello'   },
  { icon: <SiGit      size={16} color="#F05032" />, name: 'Git'      },
  { icon: <SiGithub   size={16} color="#181717" />, name: 'GitHub'   },
  { icon: <SiFlutter  size={16} color="#02569B" />, name: 'Flutter'  },
  { icon: <FaJava     size={16} color="#007396" />, name: 'Java'     },
  { icon: <SiPython   size={16} color="#3776AB" />, name: 'Python'   },
]

// Tech stack marquee items — icon + label, matches "Technologies I'm Familiar With" ticker
const techStack = [
  { icon: <SiFlutter     size={18} color="#02569B" />, name: 'Flutter'    },
  { icon: <SiTypescript  size={18} color="#3178C6" />, name: 'TypeScript' },
  { icon: <SiMysql       size={18} color="#4479A1" />, name: 'SQL'        },
  { icon: <SiJavascript  size={18} color="#F7DF1E" />, name: 'JavaScript' },
  { icon: <SiTailwindcss size={18} color="#06B6D4" />, name: 'Tailwind CSS' },
  { icon: <SiFigma       size={18} color="#F24E1E" />, name: 'Figma'      },
  { icon: <SiGit         size={18} color="#F05032" />, name: 'Git'        },
  { icon: <SiPython      size={18} color="#3776AB" />, name: 'Python'     },
  { icon: <SiPhp         size={18} color="#777BB4" />, name: 'PHP'        },
  { icon: <SiC           size={18} color="#A8B9CC" />, name: 'C'          },
  { icon: <SiGithub      size={18} color="#ffffff" />, name: 'GitHub'     },
  { icon: <SiMysql       size={18} color="#4479A1" />, name: 'MySQL'      },
  { icon: <SiReact       size={18} color="#61DAFB" />, name: 'React'      },
]

const steps = [
  { year: '2008-2022', title: 'School', desc: 'O/L & A/L at Palannoruwa Central College — Engineering Technology stream.', tag: 'Education', color: 'teal' },
  { year: '2024', title: '1st year Undergraduate', desc: 'Joined NSBM — BSc in Management Information Systems (Special).', tag: 'Education', color: 'blue' },
  { year: '2025', title: '2nd year Undergraduate', desc: 'Focused on studies, building a strong foundation.', tag: 'Education', color: 'blue' },
  { year: '2026', title: '3rd year Undergraduate', desc: 'Working as an intern while continuing my studies, applying classroom knowledge to real-world projects.', tag: 'Education', color: 'purple' },
  { year: '2027+', title: '4th year Undergraduate', desc: 'Wrapping up my degree and stepping into the industry as a full-time professional', tag: 'Education', color: 'teal', dashed: true },
]

const tagColors = {
  teal:   { bg: 'bg-teal-100 dark:bg-teal-900/40',     text: 'text-teal-700 dark:text-teal-300'     },
  blue:   { bg: 'bg-blue-100 dark:bg-blue-900/40',     text: 'text-blue-700 dark:text-blue-300'     },
  purple: { bg: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-700 dark:text-purple-300' },
}

const softSkills = [
  'Attention to Detail', 'Team Collaboration','Time Management', 'Problem Solving',
  'Leadership', 'Communication', 'Critical Thinking','Continuous Learning','Creativity'
]

function AboutAchievements() {
  const sectionRef = useRef(null)

  return (
    <div ref={sectionRef} className="py-10 sm:py-12 md:py-16 w-full">

      <div className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10"
        >
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Who I am</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">About</h2>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">

          {/* LEFT — About paragraph + Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col gap-5 sm:gap-6 w-full min-w-0"
          >
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
            I am a  Management Information Systems (MIS) undergraduate at NSBM Green University with a passion for software engineering, problem-solving, and continuous learning. Throughout my academic journey, I have built a strong foundation in software development, database systems, networking, data structures, algorithms, cybersecurity, and project management.            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
            I have hands-on experience with Java, Python, React, Flutter, and modern web technologies, enabling me to develop practical and user-focused applications. I enjoy learning new technologies, embracing challenges, and continuously improving my technical and professional skills.            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
            As an aspiring Software Engineer, I value collaboration, innovation, and attention to detail. My goal is to contribute to impactful projects while growing into a skilled professional who delivers reliable and high-quality software solutions.            </p>

            {/* Soft Skills */}
            <div>
              <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-3">Soft Skills</p>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.07, y: -2 }}
                    className="px-2.5 sm:px-3 py-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-[11px] sm:text-xs border border-teal-100 dark:border-teal-800/50 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Journey Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full lg:w-[420px] flex-shrink-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 sm:px-6 py-1 sm:py-2 shadow-sm"
          >
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 sm:mb-4">My Journey</p>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 sm:left-7 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />

              <div className="flex flex-col gap-5">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.12 }}
                    viewport={{ once: true }}
                    className="flex gap-3 sm:gap-4 items-start"
                  >
                    {/* Year circle */}
                    <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-gray-900 border-2 border-blue-200 dark:border-blue-800 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-[9px] sm:text-[10px] font-medium text-blue-600 dark:text-blue-400 text-center leading-tight">{step.year}</span>
                    </div>

                    {/* Content card */}
                    <div className={`flex-1 min-w-0 border rounded-xl p-1.5 sm:p-1 ${step.dashed
                      ? 'border-dashed border-teal-300 dark:border-teal-700 bg-teal-50/50 dark:bg-teal-900/10'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30'
                    }`}>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${tagColors[step.color].bg} ${tagColors[step.color].text}`}>
                          {step.tag}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* ── Technologies I'm Familiar With — full-bleed scrolling ticker ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-1 sm:mt-2 md:mt-3"
      >
        <p className="text-center text-teal-500 dark:text-teal-400 font-semibold text-base sm:text-lg mb-6 sm:mb-8 px-4">
          Technologies I'm Familiar With :
        </p>

        {/* Full-width breakout wrapper (safe on all screen sizes, no horizontal scroll) */}
        <div className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] overflow-hidden">
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 md:w-32 z-10 bg-gradient-to-r from-white dark:from-gray-900 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 md:w-32 z-10 bg-gradient-to-l from-white dark:from-gray-900 to-transparent" />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-6 sm:gap-10 md:gap-16 pr-6 sm:pr-10 md:pr-16 flex-shrink-0"
              animate={{ x: ['0%', '-100%'] }}
              transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
            >
              {[...techStack, ...techStack].map((tech, i) => (
                <div
                  key={`${tech.name}-${i}`}
                  className="flex items-center gap-1.5 sm:gap-2 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors whitespace-nowrap"
                >
                  <span className="text-sm sm:text-base [&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-[18px] sm:[&>svg]:h-[18px]">{tech.icon}</span>
                  <span className="text-xs sm:text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex gap-6 sm:gap-10 md:gap-16 pr-6 sm:pr-10 md:pr-16 flex-shrink-0"
              animate={{ x: ['0%', '-100%'] }}
              transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
              aria-hidden="true"
            >
              {[...techStack, ...techStack].map((tech, i) => (
                <div
                  key={`dup-${tech.name}-${i}`}
                  className="flex items-center gap-1.5 sm:gap-2 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors whitespace-nowrap"
                >
                  <span className="text-sm sm:text-base [&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-[18px] sm:[&>svg]:h-[18px]">{tech.icon}</span>
                  <span className="text-xs sm:text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

    </div>
  )
}

export default AboutAchievements
