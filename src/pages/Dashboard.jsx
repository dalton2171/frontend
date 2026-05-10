import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import AISecurityPanel from "../components/ai/AISecurityPanel";
import AdminPublisher from "../components/admin/AdminPublisher";
import LiveAnalytics from "../components/analytics/LiveAnalytics";
import LiveAIModeration from "../components/ai/LiveAIModeration";

import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";

import {
  FiActivity,
  FiShield,
  FiCpu,
  FiDatabase,
} from "react-icons/fi";

import { useEffect, useState } from "react";
import socket from "../lib/socket";
import NotificationSystem from "../components/notifications/NotificationSystem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CyberLab from "../components/cyber/CyberLab";

function Dashboard() {
  // =========================
  // REALTIME STATE
  // =========================
  const [liveStats, setLiveStats] = useState({
    onlineUsers: 0,
    status: "CONNECTING",
    serverHealth: "UNKNOWN",
    cpuUsage: 0,
    threatsBlocked: 0,
  });

  const [time, setTime] = useState(
    new Date().toLocaleTimeString()
  );

  const [logs, setLogs] = useState([
    "System initializing...",
  ]);

  // =========================
  // SOCKET CONNECTION
  // =========================
  useEffect(() => {
    socket.on("live-stats", (data) => {
      setLiveStats(data);
    });

    socket.on("log", (msg) => {
      setLogs((prev) => [
        msg,
        ...prev.slice(0, 5),
      ]);
    });

    return () => {
      socket.off("live-stats");
      socket.off("log");
    };
  }, []);

  // CLOCK
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // STATS
  // =========================
  const stats = [
    {
      title: "CPU Usage",
      value: `${liveStats.cpuUsage || 0}%`,
      color: "text-cyan-400",
      icon: <FiCpu />,
    },
    {
      title: "Threats Blocked",
      value: liveStats.threatsBlocked || 0,
      color: "text-red-400",
      icon: <FiShield />,
    },
    {
      title: "Live Visitors",
      value: liveStats.onlineUsers || 0,
      color: "text-green-400",
      icon: <FiActivity />,
    },
    {
      title: "AI Shield",
      value: liveStats.status || "OFFLINE",
      color: "text-yellow-400",
      icon: <FiDatabase />,
    },
  ];

  // SOCIALS
  const socials = [
    { name: "YouTube", icon: <FaYoutube />, url: "https://youtube.com" },
    { name: "TikTok", icon: <FaTiktok />, url: "https://tiktok.com" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://instagram.com" },
    { name: "Facebook", icon: <FaFacebook />, url: "https://facebook.com" },
    { name: "Twitter/X", icon: <FaTwitter />, url: "https://twitter.com" },
  ];

  return (
    <main className="min-h-screen px-6 py-24 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="cyber-grid"></div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 blur-[120px] rounded-full"></div>

      <Navbar />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-14"
      >
        <div className="flex flex-wrap items-center justify-between gap-6">

          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              System{" "}
              <span className="text-cyan-400 glow-text">
                Dashboard
              </span>
            </h1>

            <p className="text-gray-400 text-lg max-w-2xl">
              DALITECH real-time cyber command center powered by Socket.io.
            </p>
          </div>

          <div className="glass-card px-6 py-4 text-center">
            <p className="text-sm text-gray-400 mb-2">
              Local System Time
            </p>
            <h2 className="text-3xl font-bold text-cyan-400">
              {time}
            </h2>
          </div>

        </div>
      </motion.div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <div className="text-2xl text-white/20">
              {stat.icon}
            </div>

            <h3 className="text-gray-400 text-sm uppercase tracking-widest mt-2">
              {stat.title}
            </h3>

            <p className={`text-4xl font-black ${stat.color}`}>
              {stat.value}
            </p>
          </motion.div>
        ))}

      </div>

      {/* MAIN SECTION */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* LOGS */}
        <div className="glass-card p-8">
          <h2 className="text-3xl font-bold text-purple-400 mb-6">
            Live System Logs
          </h2>

          <div className="space-y-4 font-mono text-sm">
            {logs.map((log, i) => (
              <div
                key={i}
                className="border-l-2 border-cyan-400 pl-4 text-green-400"
              >
                {log}
              </div>
            ))}
          </div>
        </div>
<CyberLab />
        {/* AI PANEL */}
        <AISecurityPanel />

      </div>

      {/* ANALYTICS + AI MODERATION */}
      <LiveAnalytics />
      <LiveAIModeration />

      {/* ADMIN PUBLISHER */}
      <AdminPublisher />

      {/* SOCIALS */}
      <div className="glass-card p-8 mt-10">

        <h2 className="text-3xl font-bold text-cyan-400 mb-8">
          Social Media Network
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">

          {socials.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-cyan-400 transition"
            >
              <div className="text-4xl text-cyan-400 mb-4 flex justify-center">
                {social.icon}
              </div>

              <h3 className="text-lg font-bold">
                {social.name}
              </h3>

              <p className="text-cyan-400 text-sm">
                @DALITECH_CEH
              </p>
            </a>
          ))}

        </div>
      </div>

      {/* FOOTER */}
      <footer
        id="dashboard-footer"
        className="mt-20 text-center text-gray-500 text-sm"
      >
        <p>
          DALITECH CEH • Cybersecurity Engineer • Full Stack Developer
        </p>
        <p className="mt-2">
          Real-Time AI Cyber Command System • Socket.io Powered Infrastructure
        </p>
      </footer>

    </main>
  );
}

export default Dashboard;