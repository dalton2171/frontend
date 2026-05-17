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
  FiExternalLink,
  FiActivity,
  FiWifi,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import SocialCard from "../components/SocialCard";

import { socials } from "../data/socials";

import socket from "../lib/socket";
import api from "../lib/api";

// =========================================
// ICONS
// =========================================
function getIcon(platform) {
  switch (platform?.toLowerCase()) {
    case "youtube":
      return (
        <FiYoutube className="text-red-500" />
      );

    case "twitter":
      return (
        <FiTwitter className="text-sky-400" />
      );

    case "instagram":
      return (
        <FiInstagram className="text-pink-400" />
      );

    case "facebook":
      return (
        <FiFacebook className="text-blue-400" />
      );

    case "tiktok":
      return (
        <FiVideo className="text-white" />
      );

    default:
      return (
        <FiVideo className="text-cyan-400" />
      );
  }
}

function SocialHub() {
  // =========================================
  // STATE
  // =========================================
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [connected, setConnected] =
    useState(false);

  // =========================================
  // FETCH CONTENT FROM BACKEND
  // =========================================
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get(
          "/api/content"
        );

        if (res.data.success) {
          setPosts(
            res.data.content
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // =========================================
  // SOCKET REALTIME SYSTEM
  // =========================================
  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    // =====================================
    // NEW CONTENT
    // =====================================
    socket.on(
      "new-content",
      (data) => {
        if (data?.content) {
          setPosts((prev) => [
            data.content,
            ...prev,
          ]);
        }
      }
    );

    // =====================================
    // UPDATED CONTENT
    // =====================================
    socket.on(
      "content-updated",
      (data) => {
        setPosts((prev) =>
          prev.map((item) =>
            item._id ===
            data.content._id
              ? data.content
              : item
          )
        );
      }
    );

    // =====================================
    // DELETED CONTENT
    // =====================================
    socket.on(
      "content-deleted",
      (data) => {
        setPosts((prev) =>
          prev.filter(
            (item) =>
              item._id !== data.id
          )
        );
      }
    );

    return () => {
      socket.off("connect");

      socket.off("disconnect");

      socket.off(
        "new-content"
      );

      socket.off(
        "content-updated"
      );

      socket.off(
        "content-deleted"
      );
    };
  }, []);

  return (
    <main className="min-h-screen px-6 py-20 relative overflow-hidden bg-[#02030a] text-white">

      {/* BACKGROUND */}
      <div className="cyber-grid"></div>

      <Navbar />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-16 mt-20"
      >

        <div className="flex justify-center mb-6">

          <div className="glass-card px-5 py-3 flex items-center gap-3">

            <FiWifi
              className={`${
                connected
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            />

            <span className="text-sm">
              {connected
                ? "Realtime Connected"
                : "Realtime Offline"}
            </span>

          </div>

        </div>

        <h1 className="text-5xl md:text-6xl font-black mb-6">

          Social{" "}

          <span className="text-cyan-400 glow-text">
            Intelligence Hub
          </span>

        </h1>

        <p className="text-gray-400 max-w-3xl mx-auto text-lg">

          Unified AI-powered realtime content ecosystem
          connected directly to your secure backend infrastructure.

        </p>

      </motion.div>

      {/* SOCIAL PLATFORMS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">

        {socials.map(
          (social, i) => (
            <SocialCard
              key={i}
              social={social}
            />
          )
        )}

      </div>

      {/* LIVE FEED */}
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-4xl font-black">

            Live{" "}

            <span className="text-purple-400">
              Content Feed
            </span>

          </h2>

          <div className="glass-card px-4 py-2 flex items-center gap-2">

            <FiActivity className="text-cyan-400" />

            <span className="text-sm">
              {posts.length} Published
            </span>

          </div>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-20">

            <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

            <h2 className="text-2xl font-bold text-cyan-400">
              Loading Content...
            </h2>

          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          posts.length === 0 && (
            <div className="glass-card p-10 text-center">

              <h2 className="text-3xl font-bold mb-4 text-cyan-400">
                No Content Yet
              </h2>

              <p className="text-gray-400">
                Admin has not uploaded any content yet.
              </p>

            </div>
          )}

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-3 gap-8">

          {posts.map((post) => (
            <motion.div
              key={post._id}
              whileHover={{
                scale: 1.02,
              }}
              className="glass-card overflow-hidden"
            >

              {/* MEDIA */}
              <div className="relative h-60 bg-black">

                <img
                  src={
                    post.thumbnail ||
                    post.mediaUrl
                  }
                  alt={post.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30"></div>

                {/* PLATFORM */}
                <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-full flex items-center gap-2">

                  {getIcon(
                    post.platform
                  )}

                  <span className="text-xs capitalize">
                    {post.platform}
                  </span>

                </div>

                {/* TYPE */}
                {post.type ===
                  "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">

                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">

                      <FiPlay className="text-2xl text-white" />

                    </div>

                  </div>
                )}

              </div>

              {/* BODY */}
              <div className="p-6">

                <h3 className="text-xl font-bold mb-3">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm mb-5 line-clamp-3">

                  {post.description}

                </p>

                {/* STATS */}
                <div className="flex justify-between text-sm text-gray-400 mb-6">

                  <span className="flex items-center gap-1">
                    <FiEye />
                    {post.views || 0}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiHeart />
                    {post.likes || 0}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiMessageCircle />
                    {post.comments || 0}
                  </span>

                </div>

                {/* TAGS */}
                {post.tags &&
                  post.tags.length >
                    0 && (
                    <div className="flex flex-wrap gap-2 mb-5">

                      {post.tags.map(
                        (
                          tag,
                          index
                        ) => (
                          <span
                            key={
                              index
                            }
                            className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs text-cyan-400"
                          >
                            #{tag}
                          </span>
                        )
                      )}

                    </div>
                  )}

                {/* ACTION */}
                <a
                  href={
                    post.mediaUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="cyber-btn w-full flex items-center justify-center gap-3"
                >

                  <FiExternalLink />

                  Open Content

                </a>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

      {/* LIVE SYSTEM */}
      <div className="mt-24 glass-card p-10 text-center max-w-6xl mx-auto">

        <h2 className="text-3xl font-black text-cyan-400 mb-5">

          Realtime AI Content Infrastructure

        </h2>

        <p className="text-gray-400 max-w-4xl mx-auto leading-8">

          This platform is powered by secure backend infrastructure,
          realtime Socket.io synchronization,
          JWT authentication,
          AI moderation systems,
          protected admin publishing,
          and scalable cloud deployment architecture.

        </p>

      </div>

      {/* FOOTER */}
      <footer className="mt-24 border-t border-white/10 pt-10 text-center text-gray-500 text-sm">

        <p className="mb-2 text-cyan-400 font-semibold">

          DALITECH CYBER SYSTEM

        </p>

        <p>
          Realtime Intelligence • AI Moderation • Secure Cloud Infrastructure
        </p>

        <p className="mt-4 text-gray-600">

          © {new Date().getFullYear()} DALITECH. All rights reserved.

        </p>

      </footer>

    </main>
  );
}

export default SocialHub;