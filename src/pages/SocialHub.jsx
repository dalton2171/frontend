import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiVideo,
  FiPlay,
  FiEye,
  FiHeart,
  FiMessageCircle,
  FiYoutube,
  FiTwitter,
  FiInstagram,
  FiFacebook,
  FiVideo as FiTikTok,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import SocialCard from "../components/SocialCard";

import { socials } from "../data/socials";
import { initialPosts } from "../data/content";
import socket from "../lib/socket";

function getIcon(platform) {
  switch (platform) {
    case "youtube":
      return <FiYoutube className="text-red-500" />;
    case "twitter":
      return <FiTwitter className="text-sky-400" />;
    case "instagram":
      return <FiInstagram className="text-pink-400" />;
    case "facebook":
      return <FiFacebook className="text-blue-400" />;
    case "tiktok":
      return <FiTikTok className="text-white" />;
    default:
      return <FiVideo />;
  }
}

function SocialHub() {
  // =========================
  // STATE
  // =========================
  const [posts, setPosts] = useState(initialPosts);

  // =========================
  // REAL-TIME SOCKET STREAM
  // =========================
  useEffect(() => {
    const handleNewContent = (content) => {
      setPosts((prev) => [content, ...prev]);
    };

    socket.on("new-content", handleNewContent);

    return () => {
      socket.off("new-content", handleNewContent);
    };
  }, []);

  return (
    <main className="min-h-screen px-6 py-20 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="cyber-grid"></div>

      <Navbar />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-16 mt-20"
      >
        <h1 className="text-5xl md:text-6xl font-black mb-6">
          Social <span className="text-cyan-400 glow-text">Network</span>
        </h1>

        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          Unified real-time content intelligence system across all platforms.
        </p>
      </motion.div>

      {/* SOCIAL PLATFORMS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        {socials.map((social, i) => (
          <SocialCard key={i} social={social} />
        ))}
      </div>

      {/* CONTENT FEED */}
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-black mb-10">
          Live <span className="text-purple-400">Content Feed</span>
        </h2>

        {posts.length === 0 && (
          <p className="text-gray-500 text-center">
            No content available yet...
          </p>
        )}

        <div className="grid lg:grid-cols-3 gap-8">

          {posts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.02 }}
              className="glass-card overflow-hidden"
            >

              {/* IMAGE */}
              <div className="relative h-56">
                <img
                  src={post.thumbnail}
                  className="w-full h-full object-cover"
                  alt={post.title}
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full">
                  {getIcon(post.platform)}
                  <span className="text-xs capitalize">
                    {post.platform}
                  </span>
                </div>

                {post.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-cyan-400/20 flex items-center justify-center">
                      <FiPlay className="text-xl" />
                    </div>
                  </div>
                )}
              </div>

              {/* BODY */}
              <div className="p-6">

                <h3 className="font-bold text-lg mb-4">
                  {post.title}
                </h3>

                <div className="flex justify-between text-sm text-gray-400 mb-5">

                  <span className="flex items-center gap-1">
                    <FiEye /> {post.views || 0}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiHeart /> {post.likes || 0}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiMessageCircle /> {post.comments || 0}
                  </span>

                </div>

                <a
                  href={post.link}
                  target="_blank"
                  rel="noreferrer"
                  className="cyber-btn w-full block text-center"
                >
                  View on Platform
                </a>

              </div>
            </motion.div>
          ))}

        </div>
      </div>

      {/* FUTURE SYSTEM NOTICE */}
      <div className="mt-20 glass-card p-8 text-center">
        <h2 className="text-2xl text-cyan-400 font-bold mb-3">
          Real-Time Content Intelligence System
        </h2>

        <p className="text-gray-400">
          This system is connected to your backend via Socket.io.
          It supports live publishing, moderation, analytics tracking,
          and automated content updates across all platforms.
        </p>
      </div>

      {/* FOOTER */}
      <footer className="mt-24 border-t border-white/10 pt-10 text-center text-gray-500 text-sm">

        <p className="mb-2 text-cyan-400 font-semibold">
          DALITECH CYBER SYSTEM
        </p>

        <p>
          Real-Time Social Intelligence • AI Moderation • Secure Content Pipeline
        </p>

        <p className="mt-4 text-gray-600">
          © {new Date().getFullYear()} DALITECH. All rights reserved.
        </p>

      </footer>

    </main>
  );
}

export default SocialHub;