import { motion } from 'framer-motion'

const steps = [
  { year: '2020', title: 'Manual Testing', desc: 'Started QA journey with functional and regression testing.', tag: 'QA', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { year: '2021', title: 'Test Automation', desc: 'Built automation frameworks using Selenium and Postman.', tag: 'QA', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { year: '2022', title: 'QA Lead', desc: 'Led QA team, managed test plans and release cycles.', tag: 'QA', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { year: '2023', title: 'PM Exposure', desc: 'Started sprint planning, stakeholder communication and risk management.', tag: 'PM', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
  { year: '2024+', title: 'Project Manager', desc: 'Actively transitioning into full PM role — the goal!', tag: 'Goal', color: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200', dashed: true },
]

function Achivements() {
  return (
    <div className="min-h-screen px-8 py-16 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-medium text-blue-600 uppercase tracking-widest mb-1">Journey</p>
        <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-12">My Achivements</h2>
      </motion.div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />

        <div className="flex flex-col gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex gap-6 items-start"
            >
              <div className="relative z-10 w-16 h-16 rounded-full bg-white dark:bg-gray-900 border-2 border-blue-200 dark:border-blue-800 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 text-center leading-tight">{step.year}</span>
              </div>

              <div className={`flex-1 bg-white dark:bg-gray-800 border rounded-xl p-5 ${step.dashed ? 'border-dashed border-teal-300 dark:border-teal-700' : 'border-gray-200 dark:border-gray-700'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">{step.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${step.color}`}>{step.tag}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Achivements