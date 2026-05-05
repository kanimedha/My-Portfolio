import { motion } from 'framer-motion'

function Character({ message = "Hi there! Welcome! 👋" }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.img
        src={`${import.meta.env.BASE_URL}character.png`}
        alt="character"
        className="w-64 md:w-80 object-contain"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl rounded-bl-none px-4 py-2 text-sm text-gray-600 dark:text-gray-300 max-w-48 text-center"
      >
        {message}
      </motion.div>
    </div>
  )
}

export default Character