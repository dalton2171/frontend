import { useState } from "react";
import { motion } from "framer-motion";

import AdminSidebar from "../components/admin/AdminSidebar";
import ProjectEditor from "../components/admin/ProjectEditor";
import ProjectList from "../components/admin/ProjectList";

import { projects as initialProjects } from "../data/projects";

function Admin() {
  const [projects, setProjects] = useState(initialProjects);

  const [selected, setSelected] = useState(null);

  // ADD PROJECT
  const addProject = (project) => {
    setProjects([...projects, project]);
  };

  // UPDATE PROJECT
  const updateProject = (updated) => {
    setProjects(
      projects.map((p) =>
        p.title === updated.title ? updated : p
      )
    );
  };

  // DELETE PROJECT
  const deleteProject = (title) => {
    setProjects(
      projects.filter((p) => p.title !== title)
    );
  };

  // DASHBOARD STATS
  const stats = [
    {
      title: "Projects",
      value: projects.length,
      color: "text-cyan-400",
    },

    {
      title: "System Status",
      value: "SECURE",
      color: "text-green-400",
    },

    {
      title: "Threat Level",
      value: "LOW",
      color: "text-purple-400",
    },

    {
      title: "AI Shield",
      value: "ACTIVE",
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#02030a] text-white">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black mb-3">
            DALITECH{" "}
            <span className="text-cyan-400">
              ADMIN
            </span>
          </h1>

          <p className="text-gray-400">
            Cybersecurity Command Center &
            System Management Dashboard
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="glass-card p-6"
            >
              <h2 className="text-sm text-gray-400 mb-2">
                {stat.title}
              </h2>

              <p
                className={`text-3xl font-bold ${stat.color}`}
              >
                {stat.value}
              </p>
            </motion.div>
          ))}

        </div>

        {/* AI SECURITY PANEL */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-6 mb-10"
        >
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">
            AI Security Shield
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-300 mb-2">
                Spam Detection:
                <span className="text-green-400 ml-2">
                  ACTIVE
                </span>
              </p>

              <p className="text-gray-300 mb-2">
                Threat Monitoring:
                <span className="text-green-400 ml-2">
                  ENABLED
                </span>
              </p>

              <p className="text-gray-300 mb-2">
                User Protection:
                <span className="text-green-400 ml-2">
                  ONLINE
                </span>
              </p>
            </div>

            <div>
              <p className="text-gray-300 mb-2">
                AI Moderation:
                <span className="text-yellow-400 ml-2">
                  READY
                </span>
              </p>

              <p className="text-gray-300 mb-2">
                Ban System:
                <span className="text-yellow-400 ml-2">
                  PREPARING
                </span>
              </p>

              <p className="text-gray-300 mb-2">
                Backend Security:
                <span className="text-cyan-400 ml-2">
                  PENDING
                </span>
              </p>
            </div>

          </div>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* PROJECT EDITOR */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass-card p-6"
          >
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">
              Project Control Panel
            </h2>

            <ProjectEditor
              selected={selected}
              addProject={addProject}
              updateProject={updateProject}
            />
          </motion.div>

          {/* PROJECT LIST */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass-card p-6"
          >
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">
              Live Project Vault
            </h2>

            <ProjectList
              projects={projects}
              setSelected={setSelected}
              deleteProject={deleteProject}
            />
          </motion.div>

        </div>

        {/* FOOTER */}
        <div className="mt-12 text-center text-gray-500 text-sm">

          <p>
            DALITECH CEH • Cybersecurity Engineer •
            Full-Stack Developer • Tech Entrepreneur
          </p>

          <p className="mt-2">
            AI Protected Infrastructure • Secure
            Admin Environment
          </p>

        </div>

      </div>
    </div>
  );
}

export default Admin;