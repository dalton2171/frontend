import { useEffect, useState } from "react";
import socket from "../../lib/socket";
import { motion } from "framer-motion";

function LiveAIModeration() {
  const [events, setEvents] =
    useState([]);

  // ======================================
  // SOCKET STREAM
  // ======================================
  useEffect(() => {
    socket.on(
      "ai-moderation",
      (data) => {
        setEvents((prev) => [
          data,
          ...prev.slice(0, 7),
        ]);
      }
    );

    return () => {
      socket.off(
        "ai-moderation"
      );
    };
  }, []);

  // ======================================
  // COLORS
  // ======================================
  const getColor = (level) => {
    switch (level) {
      case "danger":
        return "text-red-400 border-red-400";

      case "warning":
        return "text-yellow-400 border-yellow-400";

      default:
        return "text-green-400 border-green-400";
    }
  };

  return (
    <div className="glass-card p-8 mt-10">

      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-3xl font-black text-cyan-400">
            AI Moderation Stream
          </h2>

          <p className="text-gray-400 mt-2">
            Live AI cybersecurity moderation engine
          </p>
        </div>

        <div className="flex items-center gap-2">

          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

          <span className="text-sm text-gray-400">
            AI LIVE
          </span>

        </div>

      </div>

      <div className="space-y-4">

        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className={`border-l-2 pl-4 py-2 bg-white/5 rounded-r-xl ${getColor(
              event.level
            )}`}
          >
            <div className="flex items-center justify-between">

              <p className="font-semibold">
                {event.message}
              </p>

              <span className="text-xs text-gray-400">
                {event.time}
              </span>

            </div>
          </motion.div>
        ))}

      </div>

    </div>
  );
}

export default LiveAIModeration;