import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";

import {
  FiShield,
  FiLock,
  FiActivity,
  FiLogOut,
  FiServer,
  FiAlertTriangle,
  FiUsers,
  FiWifi,
  FiDatabase,
  FiCpu,
  FiRefreshCw,
  FiBell,
  FiCheckCircle,
} from "react-icons/fi";

import AdminSidebar from "../components/admin/AdminSidebar";
import ProjectEditor from "../components/admin/ProjectEditor";
import ProjectList from "../components/admin/ProjectList";

import api from "../lib/api";
import socket from "../lib/socket";

function Admin() {
  const navigate = useNavigate();

  // =========================================
  // AUTH STATE
  // =========================================
  const [authorized, setAuthorized] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [adminData, setAdminData] =
    useState(null);

  // =========================================
  // PROJECT STATE
  // =========================================
  const [projects, setProjects] =
    useState([]);

  const [selected, setSelected] =
    useState(null);

  // =========================================
  // LIVE STATES
  // =========================================
  const [logs, setLogs] = useState([]);

  const [notifications, setNotifications] =
    useState([]);

  const [analytics, setAnalytics] =
    useState({
      totalViews: 0,
      threatsBlocked: 0,
      engagement: 0,
      activeUsers: 0,
      aiScans: 0,
    });

  const [securityStatus, setSecurityStatus] =
    useState({
      aiShield: "ACTIVE",
      threatLevel: "LOW",
      backend: "SECURE",
      liveUsers: 0,
      cpuUsage: 0,
    });

  // =========================================
  // VERIFY ADMIN
  // =========================================
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) {
          setAuthorized(false);
          setLoading(false);
          return;
        }

        const res = await api.get(
          "/api/auth/verify-admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setAuthorized(true);

          setAdminData(
            res.data.admin
          );

          // FETCH PROJECTS
          try {
            const projectRes =
              await api.get(
                "/api/content"
              );

            setProjects(
              projectRes.data || []
            );
          } catch (err) {
            console.log(err);
          }
        } else {
          localStorage.removeItem(
            "token"
          );

          setAuthorized(false);
        }
      } catch (error) {
        console.log(error);

        localStorage.removeItem(
          "token"
        );

        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  // =========================================
  // SOCKET LISTENERS
  // =========================================
  useEffect(() => {
    socket.on(
      "live-stats",
      (data) => {
        setSecurityStatus({
          aiShield:
            data.aiStatus ||
            "ACTIVE",

          threatLevel: "LOW",

          backend:
            data.serverHealth ||
            "SECURE",

          liveUsers:
            data.onlineUsers || 0,

          cpuUsage:
            data.cpuUsage || 0,
        });
      }
    );

    socket.on(
      "analytics-update",
      (data) => {
        setAnalytics(data);
      }
    );

    socket.on("live-log", (data) => {
      setLogs((prev) => [
        data,
        ...prev.slice(0, 7),
      ]);
    });

    socket.on(
      "notification",
      (data) => {
        setNotifications((prev) => [
          data,
          ...prev.slice(0, 4),
        ]);
      }
    );

    socket.on(
      "content:new",
      (data) => {
        setProjects((prev) => [
          data,
          ...prev,
        ]);
      }
    );

    return () => {
      socket.off("live-stats");

      socket.off(
        "analytics-update"
      );

      socket.off("live-log");

      socket.off(
        "notification"
      );

      socket.off(
        "content:new"
      );
    };
  }, []);

  // =========================================
  // ADD PROJECT
  // =========================================
  const addProject = async (
    project
  ) => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const res = await api.post(
        "/api/content",
        project,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects((prev) => [
        res.data,
        ...prev,
      ]);

      socket.emit(
        "admin-publish",
        res.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  // =========================================
  // UPDATE PROJECT
  // =========================================
  const updateProject = async (
    updated
  ) => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const res = await api.put(
        `/api/content/${updated._id}`,
        updated,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects((prev) =>
        prev.map((p) =>
          p._id === updated._id
            ? res.data
            : p
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // =========================================
  // DELETE PROJECT
  // =========================================
  const deleteProject =
    async (id) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await api.delete(
          `/api/content/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProjects((prev) =>
          prev.filter(
            (p) => p._id !== id
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  // =========================================
  // LOGOUT
  // =========================================
  const logout = async () => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      await api.post(
        "/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "admin"
    );

    navigate("/login");
  };

  // =========================================
  // LOADING
  // =========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#02030a] flex items-center justify-center text-cyan-400">

        <div className="text-center">

          <FiShield className="text-7xl mx-auto mb-6 animate-pulse" />

          <h1 className="text-4xl font-black">
            Verifying Secure Session...
          </h1>

        </div>

      </div>
    );
  }

  // =========================================
  // BLOCK UNAUTHORIZED
  // =========================================
  if (!authorized) {
    return (
      <Navigate to="/login" />
    );
  }

  // =========================================
  // DASHBOARD STATS
  // =========================================
  const stats = [
    {
      title: "Projects",
      value: projects.length,
      icon: <FiDatabase />,
      color: "text-cyan-400",
    },

    {
      title: "Live Users",
      value:
        securityStatus.liveUsers,
      icon: <FiUsers />,
      color: "text-green-400",
    },

    {
      title: "Threats Blocked",
      value:
        analytics.threatsBlocked,
      icon: <FiShield />,
      color: "text-red-400",
    },

    {
      title: "CPU Usage",
      value: `${securityStatus.cpuUsage}%`,
      icon: <FiCpu />,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#02030a] text-white overflow-hidden">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN */}
      <div className="flex-1 overflow-y-auto p-6 relative">

        {/* BACKGROUND */}
        <div className="cyber-grid"></div>

        <div className="absolute top-10 left-10 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full"></div>

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10"
        >

          <div>

            <h1 className="text-5xl font-black mb-3">
              DALITECH{" "}

              <span className="text-cyan-400 glow-text">
                ADMIN
              </span>

            </h1>

            <p className="text-gray-400">
              AI Powered Secure Control Center
            </p>

            {adminData && (
              <div className="mt-4 flex items-center gap-3 text-sm">

                <FiCheckCircle className="text-green-400" />

                <span className="text-cyan-400">
                  Logged in as:
                  {" "}
                  {
                    adminData.email
                  }
                </span>

              </div>
            )}

          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-4">

            <button className="glass-card px-5 py-3 flex items-center gap-3">

              <FiWifi />

              Live:
              {" "}
              {
                securityStatus.liveUsers
              }

            </button>

            <button className="glass-card px-5 py-3 flex items-center gap-3">

              <FiActivity />

              AI:
              {" "}
              {
                securityStatus.aiShield
              }

            </button>

            <button
              onClick={logout}
              className="glass-card px-5 py-3 flex items-center gap-3 hover:border-red-400 transition"
            >

              <FiLogOut />

              Logout

            </button>

          </div>

        </motion.div>

        {/* ALERT */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="glass-card border border-yellow-400/20 p-5 mb-8 flex items-center gap-4 relative z-10"
        >

          <FiAlertTriangle className="text-yellow-400 text-4xl" />

          <div>

            <h2 className="text-yellow-400 font-bold text-lg">
              Restricted Secure Environment
            </h2>

            <p className="text-gray-400 text-sm">
              JWT authentication, WhatsApp OTP verification,
              realtime AI monitoring, and backend threat analysis are active.
            </p>

          </div>

        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10 relative z-10">

          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.03,
              }}
              className="glass-card p-6"
            >

              <div className="flex items-center justify-between mb-4">

                <div
                  className={`text-3xl ${stat.color}`}
                >
                  {stat.icon}
                </div>

                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

              </div>

              <h2 className="text-sm text-gray-400 mb-2">
                {stat.title}
              </h2>

              <p
                className={`text-3xl font-black ${stat.color}`}
              >
                {stat.value}
              </p>

            </motion.div>
          ))}

        </div>

        {/* MAIN GRID */}
        <div className="grid xl:grid-cols-3 gap-8 relative z-10">

          {/* LEFT */}
          <div className="xl:col-span-2 space-y-8">

            {/* PROJECT EDITOR */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="glass-card p-6"
            >

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-black text-cyan-400">
                  Project Control Panel
                </h2>

                <button className="glass-card px-4 py-2 flex items-center gap-2 text-sm">

                  <FiRefreshCw />

                  Sync

                </button>

              </div>

              <ProjectEditor
                selected={selected}
                addProject={addProject}
                updateProject={updateProject}
              />

            </motion.div>

            {/* PROJECT LIST */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="glass-card p-6"
            >

              <h2 className="text-2xl font-black text-cyan-400 mb-6">
                Live Project Vault
              </h2>

              <ProjectList
                projects={projects}
                setSelected={
                  setSelected
                }
                deleteProject={
                  deleteProject
                }
              />

            </motion.div>

          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            {/* LIVE LOGS */}
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="glass-card p-6"
            >

              <h2 className="text-2xl font-black text-purple-400 mb-6">
                Live Security Logs
              </h2>

              <div className="space-y-4 max-h-[350px] overflow-y-auto">

                {logs.length > 0 ? (
                  logs.map((log) => (
                    <div
                      key={log.id}
                      className="border-l-2 border-cyan-400 pl-4 text-sm"
                    >

                      <p className="text-green-400">
                        {log.message}
                      </p>

                      <p className="text-gray-500 text-xs mt-1">
                        {log.time}
                      </p>

                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    Waiting for realtime logs...
                  </p>
                )}

              </div>

            </motion.div>

            {/* NOTIFICATIONS */}
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="glass-card p-6"
            >

              <h2 className="text-2xl font-black text-yellow-400 mb-6 flex items-center gap-3">

                <FiBell />

                Security Notifications

              </h2>

              <div className="space-y-4">

                {notifications.length >
                0 ? (
                  notifications.map(
                    (note) => (
                      <div
                        key={note.id}
                        className="bg-white/5 border border-white/10 rounded-2xl p-4"
                      >

                        <p className="text-sm text-white">
                          {
                            note.message
                          }
                        </p>

                        <p className="text-xs text-gray-500 mt-2">
                          {note.time}
                        </p>

                      </div>
                    )
                  )
                ) : (
                  <p className="text-gray-500">
                    No alerts yet.
                  </p>
                )}

              </div>

            </motion.div>

            {/* AI STATUS */}
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="glass-card p-6"
            >

              <h2 className="text-2xl font-black text-green-400 mb-6">
                AI Threat Engine
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    AI Scans
                  </span>

                  <span className="text-cyan-400">
                    {
                      analytics.aiScans
                    }
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Engagement
                  </span>

                  <span className="text-purple-400">
                    {
                      analytics.engagement
                    }
                    %
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Total Views
                  </span>

                  <span className="text-green-400">
                    {
                      analytics.totalViews
                    }
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Status
                  </span>

                  <span className="text-yellow-400">
                    ACTIVE
                  </span>
                </div>

              </div>

            </motion.div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-16 text-center text-gray-500 text-sm relative z-10">

          <p>
            DALITECH CEH • AI Protected Infrastructure • Secure Admin Environment
          </p>

          <p className="mt-2">
            JWT Authentication • WhatsApp OTP • Cloud Security • Live Monitoring
          </p>

        </div>

      </div>

    </div>
  );
}

export default Admin;