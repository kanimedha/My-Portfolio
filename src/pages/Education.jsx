import { motion } from 'framer-motion';
import graduateVideo from '../assets/education character.mp4';
import universityLogo from '../assets/university.png';
import schoolLogo from '../assets/school.png';
import universityBg from '../assets/university_background.jpg';
import schoolBg from '../assets/school_background.jpg';

const educationData = [
  {
    institution: "National School of Business Management (NSBM)",
    degree: "BSc in Management Information System (Special)",
    location: "Pitipana, Homagama, Sri Lanka",
    period: "2026 - Present",
    description: "Third-year undergraduate specializing in Information Technology & Management.",
    logo: universityLogo,
    bgImage: universityBg
  },
  {
    institution: "Wp/Ho Palannoruwa Central College",
    degree: "Advanced Level (A/L) & Ordinary Level (O/L)",
    location: "Horana, Sri Lanka",
    period: "2008 - 2022",
    description: "Successfully completed G.C.E. Ordinary Level (O/L) and Advanced Level (A/L) examinations with a focus on Engineering Technology Stream.",
    logo: schoolLogo,
    bgImage: schoolBg
  }
];

const Education = () => {
  return (
    <section className="py-12 px-4 max-w-5xl mx-auto">
      <div className="flex flex-row items-stretch gap-0">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex flex-col justify-end flex-shrink-0"
          style={{ width: '320px' }}
        >
          <video
            src={graduateVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full object-contain object-bottom"
            style={{ maxHeight: '580px' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col gap-5 pl-6"
        >
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 underline decoration-blue-500 decoration-4 underline-offset-8">
              My Educational Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-3">
              An overview of my academic milestones and accomplishments that reflect my dedication to continuous learning.
            </p>
          </div>

          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative overflow-hidden group rounded-2xl border border-gray-700 bg-gray-900 flex flex-row items-center gap-4 p-5 shadow-xl"
            >
              <div
                className="absolute inset-0 z-0 opacity-60 group-hover:opacity-45 transition-opacity duration-500"
                style={{
                  backgroundImage: `url(${edu.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />

              <div className="z-10 bg-white p-3 rounded-xl shadow-lg w-20 h-20 min-w-[80px] flex items-center justify-center border border-gray-100">
                <img src={edu.logo} alt={edu.institution} className="w-14 h-14 object-contain" />
              </div>

              <div className="z-10 flex-1">
                <h3 className="text-base font-semibold text-white mb-1">
                  {edu.degree}
                </h3>
                <p className="text-blue-400 font-medium text-sm mb-1">
                  {edu.institution}
                </p>
                <div className="flex flex-wrap gap-x-3 text-xs text-gray-400 mb-2 italic">
                  <span>{edu.location}</span>
                  <span>·</span>
                  <span>{edu.period}</span>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Education;
