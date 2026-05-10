import { useEffect, useState } from "react";
import socket from "../../lib/socket";
import { motion } from "framer-motion";

function CyberLab() {
  const [logs, setLogs] = useState([]);

  // =========================
  // SOCKET LOG STREAM
  // =========================
  useEffect(() => {
    socket.on("live-log", (data) => {
      setLogs((prev) => {
        const updated = [data, ...prev];
        return updated.slice(0, 20); // keep last 20 logs
      });
    });

    return () => {
      socket.off("live-log");
    };
  }, []);

  // =========================
  // STYLE BY LEVEL
  // =========================
  const getColor = (level) => {
    switch (level) {
      case "critical":
        return "text-red-500";
      case "warning":
        return "text-yellow-400";
      case "info":
      default:
        return "text-green-400";
    }
  };

  return (
    <div className="glass-card p-6 mt-10">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-400">
          CyberLab Live Logs
        </h2>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">STREAMING</span>
        </div>
      </div>

      {/* LOG STREAM */}
      <div className="h-[400px] overflow-y-auto font-mono text-sm space-y-2">

        {logs.length === 0 && (
          <p className="text-gray-500">
            Waiting for security feed...
          </p>
        )}

        {logs.map((log, i) => (
          <motion.div
            key={log.id || i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`border-l-2 border-cyan-400 pl-3 ${getColor(
              log.level
            )}`}
          >
            <div className="text-xs text-gray-500">
              {log.time}
            </div>

            <div className="font-semibold">
              [{log.type || "system"}]
            </div>

            <div>{log.message}</div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}

export default CyberLab;