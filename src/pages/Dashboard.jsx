import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import AISecurityPanel from "../components/ai/AISecurityPanel";
import AdminPublisher from "../components/admin/AdminPublisher";
import LiveAnalytics from "../components/analytics/LiveAnalytics";
import LiveAIModeration from "../components/ai/LiveAIModeration";
import NotificationSystem from "../components/notifications/NotificationSystem";
import CyberLab from "../components/cyber/CyberLab";

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
  FiWifi,
  FiAlertTriangle,
  FiServer,
  FiClock,
} from "react-icons/fi";

import {
  useEffect,
  useState,
} from "react";

import socket from "../lib/socket";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  // =========================================
  // REALTIME STATE
  // =========================================
  const [connected, setConnected] =
    useState(false);

  const [time, setTime] =
    useState(
      new Date().toLocaleTimeString()
    );

  const [logs, setLogs] = useState([
    "System boot sequence initialized...",
  ]);

  const [liveStats, setLiveStats] =
    useState({
      onlineUsers: 0,
      aiStatus: "OFFLINE",
      serverHealth: "UNKNOWN",
      cpuUsage: 0,
      threatsBlocked: 0,
      visitors: 0,
    });

  // =========================================
  // SOCKET CONNECTION
  // =========================================
  useEffect(() => {
    // CONNECT
    socket.on("connect", () => {
      setConnected(true);

      toast.success(
        "Realtime system connected."
      );
    });

    // DISCONNECT
    socket.on("disconnect", () => {
      setConnected(false);

      toast.error(
        "Realtime system disconnected."
      );
    });

    // LIVE STATS
    socket.on(
      "live-stats",
      (data) => {
        setLiveStats(data);
      }
    );

    // LOGS
    socket.on(
      "live-log",
      (data) => {
        setLogs((prev) => [
          `[${data.time}] ${data.message}`,
          ...prev.slice(0, 8),
        ]);
      }
    );

    // NOTIFICATIONS
    socket.on(
      "notification",
      (data) => {
        toast.info(data.message);
      }
    );

    return () => {
      socket.off("connect");

      socket.off(
        "disconnect"
      );

      socket.off(
        "live-stats"
      );

      socket.off(
        "live-log"
      );

      socket.off(
        "notification"
      );
    };
  }, []);

  // =========================================
  // LIVE CLOCK
  // =========================================
  useEffect(() => {
    const interval =
      setInterval(() => {
        setTime(
          new Date().toLocaleTimeString()
        );
      }, 1000);

    return () =>
      clearInterval(interval);
  }, []);

  // =========================================
  // DASHBOARD STATS
  // =========================================
  const stats = [
    {
      title: "CPU Usage",
      value: `${liveStats.cpuUsage}%`,
      color: "text-cyan-400",
      icon: <FiCpu />,
    },

    {
      title: "Threats Blocked",
      value:
        liveStats.threatsBlocked,
      color: "text-red-400",
      icon: <FiShield />,
    },

    {
      title: "Live Visitors",
      value:
        liveStats.onlineUsers,
      color: "text-green-400",
      icon: <FiActivity />,
    },

    {
      title: "AI Shield",
      value:
        liveStats.aiStatus,
      color: "text-yellow-400",
      icon: <FiDatabase />,
    },
  ];

  // =========================================
  // SOCIALS
  // =========================================
  const socials = [
    {
      name: "YouTube",
      icon: <FaYoutube />,
      url: "https://youtube.com",
      color: "text-red-500",
    },

    {
      name: "TikTok",
      icon: <FaTiktok />,
      url: "https://tiktok.com",
      color: "text-white",
    },

    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://instagram.com",
      color: "text-pink-400",
    },

    {
      name: "Facebook",
      icon: <FaFacebook />,
      url: "https://facebook.com",
      color: "text-blue-400",
    },

    {
      name: "Twitter/X",
      icon: <FaTwitter />,
      url: "https://twitter.com",
      color: "text-sky-400",
    },
  ];

  return (
    <main className="min-h-screen px-6 py-24 relative overflow-hidden bg-[#02030a] text-white">

      {/* BACKGROUND */}
      <div className="cyber-grid"></div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 blur-[120px] rounded-full"></div>

      {/* NAVBAR */}
      <Navbar />

      {/* NOTIFICATIONS */}
      <NotificationSystem />

      {/* HEADER */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="mb-14 mt-10"
      >

        <div className="flex flex-wrap items-center justify-between gap-6">

          <div>

            <div className="flex items-center gap-3 mb-5">

              <div
                className={`w-3 h-3 rounded-full ${
                  connected
                    ? "bg-green-400"
                    : "bg-red-400"
                }`}
              ></div>

              <span className="text-sm text-gray-400 flex items-center gap-2">

                <FiWifi />

                {connected
                  ? "Realtime Connected"
                  : "Realtime Offline"}

              </span>

            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-4">

              Cyber{" "}

              <span className="text-cyan-400 glow-text">
                Dashboard
              </span>

            </h1>

            <p className="text-gray-400 text-lg max-w-2xl leading-8">

              DALITECH realtime AI cybersecurity infrastructure
              powered by Socket.io,
              secure cloud backend,
              realtime analytics,
              and intelligent threat monitoring systems.

            </p>

          </div>

          {/* TIME CARD */}
          <div className="glass-card px-6 py-5 min-w-[240px]">

            <div className="flex items-center gap-3 mb-3 text-gray-400">

              <FiClock />

              <span>
                System Time
              </span>

            </div>

            <h2 className="text-4xl font-black text-cyan-400">

              {time}

            </h2>

          </div>

        </div>

      </motion.div>

      {/* WARNING */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="glass-card p-5 border border-yellow-400/20 mb-10 flex items-center gap-4"
      >

        <FiAlertTriangle className="text-yellow-400 text-3xl" />

        <div>

          <h2 className="font-bold text-yellow-400">
            Secure Infrastructure Active
          </h2>

          <p className="text-gray-400 text-sm">

            AI moderation,
            realtime analytics,
            protected admin publishing,
            and secure cloud synchronization are operational.

          </p>

        </div>

      </motion.div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

        {stats.map(
          (stat, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
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

              <div className="flex items-center justify-between mb-5">

                <div className="text-3xl text-white/20">
                  {stat.icon}
                </div>

                <FiServer className="text-cyan-400" />

              </div>

              <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-3">

                {stat.title}

              </h3>

              <p
                className={`text-4xl font-black ${stat.color}`}
              >
                {stat.value}
              </p>

            </motion.div>
          )
        )}

      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-2 gap-8 mb-10">

        {/* LOGS */}
        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="glass-card p-8"
        >

          <h2 className="text-3xl font-bold text-purple-400 mb-6">

            Live Security Logs

          </h2>

          <div className="space-y-4 font-mono text-sm">

            {logs.map(
              (log, i) => (
                <div
                  key={i}
                  className="border-l-2 border-cyan-400 pl-4 text-green-400 break-words"
                >
                  {log}
                </div>
              )
            )}

          </div>

        </motion.div>

        {/* AI SECURITY PANEL */}
        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
        >

          <AISecurityPanel />

        </motion.div>

      </div>

      {/* CYBER LAB */}
      <CyberLab />

      {/* ANALYTICS */}
      <LiveAnalytics />

      {/* AI MODERATION */}
      <LiveAIModeration />

      {/* ADMIN PUBLISHER */}
      <AdminPublisher />

      {/* SOCIAL NETWORKS */}
      <div className="glass-card p-8 mt-10">

        <h2 className="text-3xl font-bold text-cyan-400 mb-8">

          Social Media Network

        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">

          {socials.map(
            (social, i) => (
              <motion.a
                key={i}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  scale: 1.03,
                }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-cyan-400 transition"
              >

                <div
                  className={`text-4xl mb-4 flex justify-center ${social.color}`}
                >
                  {social.icon}
                </div>

                <h3 className="text-lg font-bold mb-2">

                  {social.name}

                </h3>

                <p className="text-cyan-400 text-sm">

                  @DALITECH_CEH

                </p>

              </motion.a>
            )
          )}

        </div>

      </div>

      {/* FOOTER */}
      <footer
        id="dashboard-footer"
        className="mt-20 text-center text-gray-500 text-sm border-t border-white/10 pt-10"
      >

        <p className="text-cyan-400 font-semibold mb-2">

          DALITECH CEH

        </p>

        <p>

          Cybersecurity Engineer • Full Stack Developer • AI Infrastructure Builder

        </p>

        <p className="mt-3">

          Realtime AI Cyber Command System • Secure Socket.io Infrastructure

        </p>

        <p className="mt-5 text-gray-600">

          © {new Date().getFullYear()} DALITECH. All rights reserved.

        </p>

      </footer>

    </main>
  );
}

export default Dashboard;