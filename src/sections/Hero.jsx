import { motion } from "framer-motion";
import Terminal from "../components/Terminal";
import { Link } from "react-router-dom";
import CyberScene from "../components/CyberScene";

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center z-10">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >

          {/* SMALL TAG */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-cyan-400 uppercase tracking-[6px] mb-5 text-sm"
          >
            Welcome To My Digital Space
          </motion.p>

          {/* MAIN TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-black leading-tight mb-6"
          >
            DALITECH
            <span className="text-cyan-400 glow-text"> CEH</span>
          </motion.h1>

          {/* PROFESSIONAL TITLE */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed"
          >
            Cybersecurity Engineer • Full-Stack Developer • Tech Entrepreneur
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-400 leading-relaxed max-w-xl mb-10 text-lg"
          >
            Building secure digital ecosystems, intelligent software,
            and future-driven technological solutions using modern
            cybersecurity and engineering practices.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex gap-4 flex-wrap"
          >
            <button onClick={() => navigate("/projects")} className="cyber-btn">
  View Projects
</button>

            <button className="glass-btn">
              Contact Me
            </button>
          </motion.div>

          {/* STATUS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10 flex items-center gap-3"
          >
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

            <p className="text-sm text-gray-400 uppercase tracking-widest">
              Available For Freelance & Collaborations
            </p>
          </motion.div>

        </motion.div>

        {/* RIGHT SIDE TERMINAL */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >

          {/* CYBER BORDER EFFECT */}
          <div className="absolute -inset-[1px] rounded-[30px] bg-gradient-to-r from-cyan-500 to-purple-500 opacity-30 blur-sm"></div>

          <div className="relative">
            <Terminal />
          </div>
          <div className="absolute inset-0 opacity-20 -z-10">
  <CyberScene />
</div>

        </motion.div>

      </div>
    </section>
  );
}

export default Hero;