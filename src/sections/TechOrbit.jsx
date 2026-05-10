import { motion } from "framer-motion";
import { useState } from "react";

function TechOrbit() {
  const [active, setActive] = useState("React");

  const tech = [
    { name: "React", desc: "Frontend UI Engineering" },
    { name: "Node.js", desc: "Backend Systems" },
    { name: "Python", desc: "Automation & Cybersecurity" },
    { name: "Linux", desc: "System Administration" },
    { name: "MySQL", desc: "Database Engineering" },
    { name: "Docker", desc: "Containerization & DevOps" },
    { name: "AWS", desc: "Cloud Infrastructure" },
    { name: "Kubernetes", desc: "Orchestration & Scaling" },
    { name: "AI/ML", desc: "Artificial Intelligence & Machine Learning" },
    
  ];

  return (
    <section className="py-24 px-6 text-center relative">

      <h2 className="text-4xl md:text-5xl font-bold mb-10">
        Tech <span className="text-cyan-400">Orbit</span>
      </h2>

      {/* CENTER NODE */}
      <div className="relative flex items-center justify-center">

        {/* ORBIT RING */}
        <div className="absolute w-72 h-72 border border-cyan-500/20 rounded-full animate-spin-slow"></div>
        <div className="absolute w-96 h-96 border border-purple-500/20 rounded-full animate-spin-slow-reverse"></div>

        {/* CENTER */}
        <div className="glass-card w-40 h-40 flex items-center justify-center">
          <p className="text-cyan-400 font-bold">DALITECH</p>
        </div>

        {/* TECH NODES */}
        <div className="absolute flex gap-3 flex-wrap justify-center mt-80">

          {tech.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(t.name)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                active === t.name
                  ? "bg-cyan-500 text-black"
                  : "glass-btn"
              }`}
            >
              {t.name}
            </button>
          ))}

        </div>

      </div>

      {/* DESCRIPTION */}
      <p className="mt-20 text-gray-400">
        <span className="text-cyan-400">{active}</span> — {
          tech.find((t) => t.name === active)?.desc
        }
      </p>

    </section>
  );
}

export default TechOrbit;