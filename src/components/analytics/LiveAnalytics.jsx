import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import socket from "../../lib/socket";

function LiveAnalytics() {
  const [analytics, setAnalytics] =
    useState({
      activeUsers: 0,
      totalViews: 0,
      totalPosts: 0,
      engagement: 0,
      threatsBlocked: 0,
      aiScans: 0,
    });

  // ======================================
  // SOCKET ANALYTICS STREAM
  // ======================================
  useEffect(() => {
    socket.on(
      "analytics-update",
      (data) => {
        setAnalytics(data);
      }
    );

    return () => {
      socket.off(
        "analytics-update"
      );
    };
  }, []);

  const cards = [
    {
      title: "Active Users",
      value:
        analytics.activeUsers,
      color: "text-cyan-400",
    },

    {
      title: "Total Views",
      value:
        analytics.totalViews,
      color: "text-green-400",
    },

    {
      title: "Published Posts",
      value:
        analytics.totalPosts,
      color:
        "text-purple-400",
    },

    {
      title: "Engagement",
      value: `${analytics.engagement}%`,
      color:
        "text-yellow-400",
    },

    {
      title:
        "Threats Blocked",
      value:
        analytics.threatsBlocked,
      color: "text-red-400",
    },

    {
      title: "AI Scans",
      value:
        analytics.aiScans,
      color: "text-pink-400",
    },
  ];

  return (
    <div className="glass-card p-8 mt-10">

      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-3xl font-black text-cyan-400">
            Live Analytics
          </h2>

          <p className="text-gray-400 mt-2">
            Real-time platform intelligence
          </p>
        </div>

        <div className="flex items-center gap-2">

          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

          <span className="text-sm text-gray-400">
            LIVE
          </span>

        </div>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {cards.map(
          (card, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: i * 0.08,
              }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-4">
                {card.title}
              </h3>

              <p
                className={`text-4xl font-black ${card.color}`}
              >
                {card.value}
              </p>
            </motion.div>
          )
        )}

      </div>

    </div>
  );
}

export default LiveAnalytics;