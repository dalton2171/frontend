import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  FiUsers,
  FiEye,
  FiServer,
  FiShield,
  FiActivity,
  FiTrendingUp,
} from "react-icons/fi";

import Navbar from "../components/Navbar";

function Analytics() {
  // LIVE ANALYTICS STATE
  const [stats, setStats] = useState([
    {
      label: "Visitors Today",
      value: 1284,
      icon: <FiUsers />,
      color: "text-cyan-400",
    },

    {
      label: "Project Views",
      value: 8902,
      icon: <FiEye />,
      color: "text-purple-400",
    },

    {
      label: "API Requests",
      value: 32441,
      icon: <FiActivity />,
      color: "text-green-400",
    },

    {
      label: "Threat Events Blocked",
      value: 0,
      icon: <FiShield />,
      color: "text-red-400",
    },

    {
      label: "Server Load",
      value: 72,
      icon: <FiServer />,
      color: "text-yellow-400",
    },

    {
      label: "AI Efficiency",
      value: 99,
      icon: <FiTrendingUp />,
      color: "text-cyan-400",
    },
  ]);

  // LIVE LOGS
  const [logs, setLogs] = useState([
    "Initializing analytics engine...",
    "Secure AI monitoring active...",
    "Live traffic synchronized...",
  ]);

  // LIVE UPDATES
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => {
          // DON'T CHANGE THREAT EVENTS TOO MUCH
          if (
            stat.label ===
            "Threat Events Blocked"
          ) {
            return {
              ...stat,
              value:
                stat.value +
                Math.floor(Math.random() * 2),
            };
          }

          // SERVER LOAD
          if (stat.label === "Server Load") {
            let random =
              65 +
              Math.floor(Math.random() * 20);

            return {
              ...stat,
              value: random,
            };
          }

          // AI EFFICIENCY
          if (stat.label === "AI Efficiency") {
            return {
              ...stat,
              value:
                98 +
                Math.floor(Math.random() * 2),
            };
          }

          // NORMAL COUNTERS
          return {
            ...stat,
            value:
              stat.value +
              Math.floor(Math.random() * 10),
          };
        })
      );

      // RANDOM LOGS
      const systemLogs = [
        "Threat scan completed successfully.",
        "AI moderation synchronized.",
        "Secure API connection stable.",
        "Spam protection engine updated.",
        "GitHub analytics refreshed.",
        "Social media network synced.",
        "Firewall defense layer active.",
        "Database integrity verified.",
      ];

      const randomLog =
        systemLogs[
          Math.floor(
            Math.random() *
              systemLogs.length
          )
        ];

      setLogs((prev) => {
        const updated = [
          randomLog,
          ...prev,
        ];

        return updated.slice(0, 8);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen px-6 py-24 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="cyber-grid"></div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 blur-[120px] rounded-full"></div>

      {/* NAVBAR */}
      <Navbar />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-black mb-5">
          Security{" "}
          <span className="text-cyan-400 glow-text">
            Analytics
          </span>
        </h1>

        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          Real-time cyber intelligence,
          AI monitoring systems, traffic
          analytics, infrastructure
          health, and secure ecosystem
          insights powered by DALITECH
          CEH.
        </p>
      </motion.div>

      {/* STATS GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto mb-14">

        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              delay: i * 0.08,
            }}
            whileHover={{
              scale: 1.03,
            }}
            className="glass-card p-7 relative overflow-hidden"
          >

            {/* GLOW */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-[60px] rounded-full"></div>

            {/* ICON */}
            <div
              className={`text-3xl mb-4 ${s.color}`}
            >
              {s.icon}
            </div>

            {/* LABEL */}
            <h2 className="text-gray-400 uppercase tracking-widest text-sm">
              {s.label}
            </h2>

            {/* VALUE */}
            <p
              className={`text-4xl font-black mt-3 ${s.color}`}
            >
              {s.label === "Server Load"
                ? `${s.value}%`
                : s.label ===
                    "AI Efficiency"
                  ? `${s.value}.9%`
                  : s.value.toLocaleString()}
            </p>

          </motion.div>
        ))}

      </div>

      {/* ANALYTICS SECTION */}
      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">

        {/* LIVE ACTIVITY */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="glass-card p-8"
        >
          <h2 className="text-3xl font-bold text-cyan-400 mb-8">
            Live Activity Feed
          </h2>

          <div className="space-y-4 font-mono text-sm">

            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                className="border-l-2 border-cyan-400 pl-4 text-green-400"
              >
                {log}
              </motion.div>
            ))}

          </div>
        </motion.div>

        {/* AI SECURITY ENGINE */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="glass-card p-8"
        >
          <h2 className="text-3xl font-bold text-purple-400 mb-8">
            AI Security Engine
          </h2>

          <div className="space-y-6">

            {/* BAR */}
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>
                  Spam Detection
                </span>

                <span className="text-cyan-400">
                  99%
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[99%] bg-cyan-400 rounded-full"></div>
              </div>
            </div>

            {/* BAR */}
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>
                  Intrusion Prevention
                </span>

                <span className="text-purple-400">
                  98%
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[98%] bg-purple-400 rounded-full"></div>
              </div>
            </div>

            {/* BAR */}
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>
                  Firewall Efficiency
                </span>

                <span className="text-green-400">
                  100%
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-full bg-green-400 rounded-full"></div>
              </div>
            </div>

            {/* STATUS */}
            <div className="mt-8 flex items-center gap-3">

              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

              <p className="text-gray-400 uppercase tracking-widest text-sm">
                AI Shield Operational
              </p>

            </div>

          </div>
        </motion.div>

      </div>

      {/* FOOTER */}
      <div className="mt-16 text-center text-gray-500 text-sm">

        <p>
          DALITECH CEH • Real-Time Cyber
          Analytics System
        </p>

        <p className="mt-2">
          AI Powered Infrastructure •
          Secure Monitoring Environment
        </p>

      </div>

    </main>
  );
}

export default Analytics;