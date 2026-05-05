import { motion } from 'framer-motion'

const ProjectPagination = ({ currentIndex, setCurrentIndex }) => {

  const totalItems = 6

  return (
    <div className="flex flex-col items-center mt-10">

      <p className="text-gray-500 text-sm mb-6">
        Use Left / Right Arrow Keys
      </p>

      <div className="flex items-center gap-5 bg-slate-800/70 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full shadow-xl">
        {[...Array(totalItems)].map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.3 }}
            className={`rounded-full ${
              currentIndex === index
                ? 'w-3 h-3 bg-white shadow-[0_0_15px_rgba(255,255,255,1)]'
                : 'w-2 h-2 bg-white/50'
            }`}
          />
        ))}
      </div>

    </div>
  )
}

export default ProjectPagination