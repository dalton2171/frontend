import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import { motion } from "framer-motion";

function Projects() {
  // FILTER STATE
  const [activeCategory, setActiveCategory] = useState("All");

  // SEARCH STATE
  const [search, setSearch] = useState("");

  // UNIQUE CATEGORIES
  const categories = [
    "All",
    ...new Set(projects.map((p) => p.category)),
  ];

  // FILTERED PROJECTS
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "All" ||
      project.category === activeCategory;

    const matchesSearch =
      project.title
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 px-6 relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold">
          Project <span className="text-cyan-400">Vault</span>
        </h2>

        <p className="text-gray-400 mt-4">
          Classified digital assets and systems I’ve engineered
        </p>
      </motion.div>

      {/* TOP CONTROLS */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row gap-4 justify-between items-center relative z-10">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[300px] p-3 rounded-xl bg-white/5 border border-white/10 outline-none text-white"
        />

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 justify-center">

          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                activeCategory === category
                  ? "bg-cyan-400 text-black font-bold"
                  : "glass-btn"
              }`}
            >
              {category}
            </button>
          ))}

        </div>
      </div>

      {/* ANALYTICS BAR */}
      <div className="max-w-6xl mx-auto mb-12 grid md:grid-cols-3 gap-4 relative z-10">

        <div className="glass-card p-5 text-center">
          <p className="text-gray-400 text-sm">
            Total Projects
          </p>

          <h3 className="text-3xl font-bold text-cyan-400">
            {projects.length}
          </h3>
        </div>

        <div className="glass-card p-5 text-center">
          <p className="text-gray-400 text-sm">
            Filtered Results
          </p>

          <h3 className="text-3xl font-bold text-purple-400">
            {filteredProjects.length}
          </h3>
        </div>

        <div className="glass-card p-5 text-center">
          <p className="text-gray-400 text-sm">
            Active Category
          </p>

          <h3 className="text-2xl font-bold text-green-400">
            {activeCategory}
          </h3>
        </div>

      </div>

      {/* PROJECT GRID */}
      <motion.div
        layout
        className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
      >

        {filteredProjects.length > 0 ? (
          filteredProjects.map((p, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400">
            No matching projects found.
          </div>
        )}

      </motion.div>

    </section>
  );
}

export default Projects;