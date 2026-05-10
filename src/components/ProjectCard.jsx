import { motion } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiCpu,
} from "react-icons/fi";

function ProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -8,
      }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 relative overflow-hidden group border border-white/10 hover:border-cyan-400/40"
    >

      {/* CYBER GLOW */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 pointer-events-none"></div>

      {/* SCAN LINE */}
      <div className="absolute top-0 left-[-100%] w-full h-[2px] bg-cyan-400/40 group-hover:left-full transition-all duration-1000"></div>

      {/* STATUS */}
      <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-md">
        {project.status}
      </div>

      {/* ICON */}
      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mb-6 text-cyan-400 text-2xl">
        <FiCpu />
      </div>

      {/* TITLE */}
      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-300 transition">
        {project.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-gray-400 text-sm mb-5 leading-relaxed min-h-[80px]">
        {project.description}
      </p>

      {/* TECH STACK */}
      <div className="flex flex-wrap gap-2 mb-6">

        {project.tech.map((t, i) => (
          <motion.span
            key={i}
            whileHover={{ scale: 1.08 }}
            className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 hover:border-cyan-400 transition"
          >
            {t}
          </motion.span>
        ))}

      </div>

      {/* BUTTONS */}
      <div className="flex flex-wrap gap-3">

        {/* VIEW PROJECT */}
        <motion.a
          whileTap={{ scale: 0.95 }}
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="cyber-btn text-sm flex items-center gap-2"
        >
          <FiExternalLink />
          Live Demo
        </motion.a>

        {/* GITHUB */}
        <motion.a
          whileTap={{ scale: 0.95 }}
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="glass-btn text-sm flex items-center gap-2"
        >
          <FiGithub />
          GitHub
        </motion.a>

        {/* ARCHITECTURE */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="glass-btn text-sm"
        >
          Architecture
        </motion.button>

      </div>

      {/* BOTTOM GLOW */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition duration-500"></div>

    </motion.div>
  );
}

export default ProjectCard;