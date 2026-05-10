import CyberTerminal from "../components/cyberlab/CyberTerminal";
import ToolCard from "../components/cyberlab/ToolCard";
import SecurityStatus from "../components/cyberlab/SecurityStatus";

import { cyberTools } from "../data/cyberTools";
import { motion } from "framer-motion";
import {
  FiShield,
  FiTerminal,
  FiLock,
  FiActivity,
  FiCpu,
  FiDatabase,
  FiWifi,
  FiEye,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import socket from "../lib/socket";

function CyberLabPage() {
  // =========================
  // LIVE SYSTEM STATUS
  // =========================
  const [liveLogs, setLiveLogs] = useState([]);

  const systems = [
    {
      title: "Linux Containers",
      value: "ONLINE",
      color: "text-green-400",
      icon: <FiTerminal />,
    },
    {
      title: "AI Threat Detection",
      value: "ACTIVE",
      color: "text-cyan-400",
      icon: <FiShield />,
    },
    {
      title: "Network Scanner",
      value: "READY",
      color: "text-purple-400",
      icon: <FiWifi />,
    },
    {
      title: "Access Control",
      value: "LOCKED",
      color: "text-yellow-400",
      icon: <FiLock />,
    },
  ];

  const tools = [
    {
      name: "Nmap Scanner",
      description: "Advanced network discovery and vulnerability mapping.",
      status: "Containerized",
    },
    {
      name: "Metasploit Framework",
      description: "Controlled exploit testing environment inside Docker.",
      status: "Isolated",
    },
    {
      name: "AI Security Engine",
      description: "Behavior analysis and malicious request detection.",
      status: "Monitoring",
    },
    {
      name: "Packet Analyzer",
      description: "Traffic inspection and protocol monitoring system.",
      status: "Running",
    },
    {
      name: "Secure Linux Terminal",
      description: "Web-based PTY terminal powered by WebSockets.",
      status: "Protected",
    },
    {
      name: "Threat Intelligence",
      description: "AI assisted cybersecurity event analysis.",
      status: "Learning",
    },
  ];

  const logs = [
    "Secure Docker environment initialized.",
    "AI moderation system enabled.",
    "Container firewall policy loaded.",
    "Authentication shield active.",
    "Terminal PTY bridge connected.",
    "Network monitoring daemon online.",
  ];

  // =========================
  // SOCKET LIVE LOG STREAM
  // =========================
  useEffect(() => {
    socket.on("live-log", (data) => {
      setLiveLogs((prev) => [data.message, ...prev.slice(0, 8)]);
    });

    return () => {
      socket.off("live-log");
    };
  }, []);

  return (
    <main className="min-h-screen px-6 py-20 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="cyber-grid"></div>

      <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full"></div>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-20 mb-16 relative z-10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400 flex items-center justify-center text-cyan-400 text-3xl">
            <FiShield />
          </div>

          <div>
            <h1 className="text-5xl md:text-6xl font-black">
              Cyber <span className="text-cyan-400 glow-text">Laboratory</span>
            </h1>
            <p className="text-gray-400 mt-2">
              AI Powered Penetration Testing & Secure Linux Infrastructure
            </p>
          </div>
        </div>

        <div className="glass-card p-6 border border-yellow-400/20">
          <h2 className="text-yellow-400 font-bold text-xl mb-3">
            Restricted Environment
          </h2>
          <p className="text-gray-300 leading-relaxed">
            This lab runs fully containerized security tools with AI monitoring,
            isolated Docker environments, and real-time threat detection.
          </p>
        </div>
      </motion.div>

      {/* TOOL GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10 relative z-10">
        {cyberTools.map((tool, i) => (
          <ToolCard key={i} tool={tool} />
        ))}
      </div>

      {/* TERMINAL + SECURITY */}
      <div className="grid lg:grid-cols-2 gap-8 relative z-10">
        <CyberTerminal />
        <SecurityStatus />
      </div>

      {/* LIVE SYSTEM STATUS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16 mt-12 relative z-10">

        {systems.map((system, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <div className="text-3xl mb-4">{system.icon}</div>

            <h3 className="text-gray-400 text-sm uppercase">
              {system.title}
            </h3>

            <p className={`text-2xl font-bold ${system.color}`}>
              {system.value}
            </p>
          </motion.div>
        ))}

      </div>

      {/* MAIN CONTENT */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16 relative z-10">

        {/* TOOLS */}
        <div className="glass-card p-8">
          <h2 className="text-3xl font-black text-cyan-400 mb-6">
            Cyber Tools
          </h2>

          {tools.map((tool, i) => (
            <div key={i} className="mb-5 border border-white/10 p-4 rounded-xl">
              <div className="flex justify-between">
                <h3 className="font-bold">{tool.name}</h3>
                <span className="text-cyan-400 text-sm">{tool.status}</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">{tool.description}</p>
            </div>
          ))}
        </div>

        {/* LOGS */}
        <div className="glass-card p-8">
          <h2 className="text-3xl font-black text-purple-400 mb-6">
            Live Security Logs
          </h2>

          <div className="space-y-3 font-mono text-sm">
            {[...liveLogs, ...logs].slice(0, 10).map((log, i) => (
              <div key={i} className="border-l-2 border-cyan-400 pl-3 text-green-400">
                {log}
              </div>
            ))}
          </div>

          {/* TERMINAL PREVIEW */}
          <div className="mt-8 bg-black p-5 rounded-xl border border-cyan-400/20 font-mono text-sm">
            <p className="text-green-400">root@cyberlab:~# system ready</p>
            <p className="text-cyan-400">Docker sandbox active</p>
            <p className="text-yellow-400">Waiting for terminal session...</p>
          </div>
        </div>
      </div>

      {/* SECURITY ARCHITECTURE */}
      <div className="glass-card p-8 relative z-10">
        <h2 className="text-4xl font-black mb-10">
          Secure <span className="text-cyan-400">Architecture</span>
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="p-5 bg-white/5 rounded-xl border border-white/10">
            <FiCpu className="text-cyan-400 text-3xl mb-3" />
            <h3 className="font-bold">Docker Isolation</h3>
            <p className="text-gray-400 text-sm">Each tool runs in sandbox containers.</p>
          </div>

          <div className="p-5 bg-white/5 rounded-xl border border-white/10">
            <FiDatabase className="text-purple-400 text-3xl mb-3" />
            <h3 className="font-bold">Persistent Logs</h3>
            <p className="text-gray-400 text-sm">Secure storage for audit trails.</p>
          </div>

          <div className="p-5 bg-white/5 rounded-xl border border-white/10">
            <FiActivity className="text-green-400 text-3xl mb-3" />
            <h3 className="font-bold">AI Monitoring</h3>
            <p className="text-gray-400 text-sm">Real-time threat detection system.</p>
          </div>

          <div className="p-5 bg-white/5 rounded-xl border border-white/10">
            <FiEye className="text-yellow-400 text-3xl mb-3" />
            <h3 className="font-bold">Access Control</h3>
            <p className="text-gray-400 text-sm">Authorized users only system.</p>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-20 text-center text-gray-500 text-sm border-t border-white/10 pt-10">
        <p className="text-cyan-400 font-bold">DALITECH CyberLab System</p>
        <p className="mt-2">AI Powered Penetration Testing Environment</p>
        <p className="mt-2">© {new Date().getFullYear()} DALITECH Security Systems</p>
      </footer>

    </main>
  );
}

export default CyberLabPage;