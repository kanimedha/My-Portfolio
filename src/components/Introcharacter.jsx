import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Character = ({ message = "Welcome! Let me show you around 😊" }) => {
  const [wave, setWave] = useState(false);

  useEffect(() => {
    // Start waving after page loads
    const startWave = setTimeout(() => setWave(true), 600);

    // Stop waving after 4 seconds
    const stopWave = setTimeout(() => setWave(false), 4600);

    return () => {
      clearTimeout(startWave);
      clearTimeout(stopWave);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative w-72 h-96 md:w-80 md:h-[420px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src="src/assets/character.png"     // ← Change this to your actual image path
          alt="Anjula Nimedha"
          className="w-full h-full object-contain"
          animate={{
            rotate: wave ? [-12, 15, -10, 12, -8, 10, 0] : 0,
          }}
          transition={{
            duration: 1.6,
            repeat: wave ? 2 : 0,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "40% 30%" }}   // Shoulder area for natural wave
        />
      </motion.div>

      {/* Message Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-6 bg-white dark:bg-gray-800 px-6 py-3 rounded-3xl shadow-md text-center max-w-[230px]"
      >
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {message}
        </p>
      </motion.div>
    </div>
  );
};

export default Character;