import { useEffect, useState } from "react";
import socket from "../../lib/socket";
import { motion, AnimatePresence } from "framer-motion";

function NotificationSystem() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => socket.off("notification");
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );
  };

  return (
    <div className="fixed top-5 right-5 z-[9999] space-y-3 w-[320px]">

      <AnimatePresence>

        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className={`p-4 rounded-xl shadow-lg border backdrop-blur-md
              ${
                n.type === "warning"
                  ? "bg-yellow-500/10 border-yellow-400"
                  : n.type === "danger"
                  ? "bg-red-500/10 border-red-400"
                  : n.type === "success"
                  ? "bg-green-500/10 border-green-400"
                  : "bg-cyan-500/10 border-cyan-400"
              }`}
          >
            <p className="text-sm text-white">{n.message}</p>

            <button
              onClick={() => removeNotification(n.id)}
              className="text-xs text-gray-400 mt-2"
            >
              dismiss
            </button>
          </motion.div>
        ))}

      </AnimatePresence>

    </div>
  );
}

export default NotificationSystem;