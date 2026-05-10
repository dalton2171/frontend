import { motion } from "framer-motion";

import {
  FiShield,
  FiTerminal,
  FiActivity,
  FiLock,
  FiWifi,
  FiCpu,
  FiDatabase,
} from "react-icons/fi";

import { useState } from "react";
import LiveTerminal from "../components/cyber/LiveTerminal";
import CyberAI from "../components/ai/CyberAI";
function CyberLab() {
  // TERMINAL LOGS
  const [logs, setLogs] = useState([
    "[SYSTEM] Initializing secure cyber lab...",
    "[AI] AI security engine connected.",
    "[DOCKER] Kali Linux container ready.",
  ]);

  // ACTIVE TOOLS
  const [activeTools, setActiveTools] =
    useState([]);

  // SECURITY STATUS
  const securitySystems = [
    {
      name: "Firewall",
      status: "ACTIVE",
      color: "text-green-400",
    },

    {
      name: "AI Scanner",
      status: "ONLINE",
      color: "text-cyan-400",
    },

    {
      name: "Intrusion Detection",
      status: "MONITORING",
      color: "text-purple-400",
    },

    {
      name: "Container Sandbox",
      status: "SECURE",
      color: "text-yellow-400",
    },
  ];

  // CYBER TOOLS
  const tools = [
    {
      name: "Nmap Scanner",
      icon: <FiWifi />,
      description:
        "Advanced network discovery and port scanning.",
    },

    {
      name: "Metasploit Framework",
      icon: <FiShield />,
      description:
        "Controlled exploit testing environment.",
    },

    {
      name: "Packet Analyzer",
      icon: <FiActivity />,
      description:
        "Live network traffic monitoring system.",
    },

    {
      name: "Docker Inspector",
      icon: <FiDatabase />,
      description:
        "Secure container validation and isolation.",
    },

    {
      name: "Linux Terminal",
      icon: <FiTerminal />,
      description:
        "Web based PTY terminal environment.",
    },

    {
      name: "AI Threat Engine",
      icon: <FiCpu />,
      description:
        "AI powered malicious behavior detection.",
    },
  ];

  // RUN TOOL
  const runTool = (tool) => {
    setActiveTools((prev) => [...prev, tool]);

    setLogs((prev) => [
      ...prev,
      `[SYSTEM] Executing ${tool}...`,
    ]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `[AI] ${tool} completed successfully.`,
      ]);
    }, 2000);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <LiveTerminal />
      <CyberAI />

      {/* CYBER GRID */}
      <div className="cyber-grid"></div>

      {/* GLOW EFFECTS */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full"></div>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mb-20 relative z-10"
      >

        <h1 className="text-5xl md:text-6xl font-black mb-6">
          Cyber{" "}
          <span className="text-cyan-400 glow-text">
            Laboratory
          </span>
        </h1>

        <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
          AI powered penetration testing
          environment with secure Linux
          infrastructure, Docker isolation,
          live monitoring, and cybersecurity
          automation systems.
        </p>

        {/* STATUS */}
        <div className="flex items-center justify-center gap-3 mt-8">

          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

          <p className="uppercase tracking-widest text-sm text-gray-400">
            Secure Environment Active
          </p>

        </div>

      </motion.div>

      {/* LIVE STATUS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16 relative z-10">

        {securitySystems.map((system, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: i * 0.1,
            }}
            whileHover={{
              scale: 1.03,
            }}
            className="glass-card p-6"
          >

            <h2 className="text-gray-400 text-sm uppercase tracking-widest mb-3">
              {system.name}
            </h2>

            <p
              className={`text-3xl font-black ${system.color}`}
            >
              {system.status}
            </p>

          </motion.div>
        ))}

      </div>

      {/* CYBER TOOLS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20 relative z-10">

        {tools.map((tool, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: i * 0.1,
            }}
            whileHover={{
              scale: 1.03,
            }}
            className="glass-card p-6"
          >

            {/* ICON */}
            <div className="text-cyan-400 text-4xl mb-5">
              {tool.icon}
            </div>

            {/* TITLE */}
            <h2 className="text-2xl font-bold mb-4">
              {tool.name}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-400 leading-relaxed mb-6">
              {tool.description}
            </p>

            {/* BUTTON */}
            <button
              onClick={() => runTool(tool.name)}
              className="cyber-btn w-full"
            >
              Execute Tool
            </button>

          </motion.div>
        ))}

      </div>

      {/* TERMINAL + SECURITY */}
      <div className="grid lg:grid-cols-2 gap-8 relative z-10">

        {/* TERMINAL */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="glass-card p-6"
        >

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-black text-cyan-400">
              Secure Terminal
            </h2>

            <div className="flex items-center gap-2">

              <div className="w-3 h-3 bg-red-400 rounded-full"></div>

              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>

              <div className="w-3 h-3 bg-green-400 rounded-full"></div>

            </div>

          </div>

          <div className="bg-black rounded-2xl border border-cyan-400/20 p-5 h-[400px] overflow-y-auto font-mono text-sm">

            {logs.map((log, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 mb-3"
              >
                {log}
              </motion.p>
            ))}

            <p className="text-cyan-400 animate-pulse">
              root@dalitech:~#
            </p>

          </div>

        </motion.div>

        {/* SECURITY STATUS */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="glass-card p-6"
        >

          <h2 className="text-3xl font-black text-purple-400 mb-8">
            Security Monitoring
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between items-center">
              <span className="text-gray-300">
                Authentication Shield
              </span>

              <span className="text-green-400 font-bold">
                ENABLED
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">
                AI Spam Detection
              </span>

              <span className="text-cyan-400 font-bold">
                ACTIVE
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">
                Docker Isolation
              </span>

              <span className="text-purple-400 font-bold">
                SECURE
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">
                Threat Monitoring
              </span>

              <span className="text-yellow-400 font-bold">
                LIVE
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">
                Access Control
              </span>

              <span className="text-green-400 font-bold">
                LOCKED
              </span>
            </div>

          </div>

          {/* ACTIVE TOOLS */}
          <div className="mt-10">

            <h3 className="text-xl font-bold text-cyan-400 mb-5">
              Active Tools
            </h3>

            <div className="space-y-3">

              {activeTools.length === 0 ? (
                <p className="text-gray-500">
                  No tools running.
                </p>
              ) : (
                activeTools.map((tool, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex justify-between"
                  >

                    <span>{tool}</span>

                    <span className="text-green-400">
                      RUNNING
                    </span>

                  </div>
                ))
              )}

            </div>

          </div>

        </motion.div>

      </div>

      {/* ARCHITECTURE */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="glass-card p-8 mt-20 relative z-10"
      >

        <h2 className="text-4xl font-black mb-10">
          Infrastructure{" "}
          <span className="text-cyan-400">
            Architecture
          </span>
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

            <FiTerminal className="text-cyan-400 text-3xl mb-4" />

            <h3 className="font-bold text-xl mb-3">
              PTY Terminal
            </h3>

            <p className="text-gray-400 text-sm">
              Real Linux terminal system using
              WebSocket communication.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

            <FiDatabase className="text-purple-400 text-3xl mb-4" />

            <h3 className="font-bold text-xl mb-3">
              Docker Sandbox
            </h3>

            <p className="text-gray-400 text-sm">
              Isolated Kali Linux containers for
              secure penetration testing.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

            <FiShield className="text-green-400 text-3xl mb-4" />

            <h3 className="font-bold text-xl mb-3">
              AI Security
            </h3>

            <p className="text-gray-400 text-sm">
              AI based spam filtering and
              malicious activity monitoring.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

            <FiLock className="text-yellow-400 text-3xl mb-4" />

            <h3 className="font-bold text-xl mb-3">
              Private Access
            </h3>

            <p className="text-gray-400 text-sm">
              Restricted access for authorized
              admin sessions only.
            </p>

          </div>

        </div>

      </motion.div>

    </section>
  );
}

export default CyberLab;