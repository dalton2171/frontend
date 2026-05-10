import Navbar from "../components/Navbar";

import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import CyberLab from "../sections/CyberLab";
import Contact from "../sections/Contact";
import TechOrbit from "../sections/TechOrbit";

import GitHubStats from "../components/GitHubStats";
import GitHubProjects from "../components/GitHubProjects";

import { motion } from "framer-motion";

import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";

import {
  FiCopy,
  FiActivity,
  FiShield,
} from "react-icons/fi";

import { useEffect, useState } from "react";

function Home() {
  // LIVE CLOCK
  const [time, setTime] = useState(
    new Date().toLocaleTimeString()
  );

  // COPY EMAIL
  const [copied, setCopied] =
    useState(false);

  // LIVE STATUS
  const [status, setStatus] =
    useState("ONLINE");

  // CLOCK SYSTEM
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString()
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // COPY EMAIL FUNCTION
  const copyEmail = () => {
    navigator.clipboard.writeText(
      "oumadalton409@gmail.com"
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">

      {/* CYBER GRID */}
      <div className="cyber-grid"></div>

      {/* BACKGROUND GLOW */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 blur-[120px] rounded-full"></div>

      {/* NAVBAR */}
      <Navbar />

      {/* FLOATING STATUS PANEL */}
      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="fixed top-24 right-6 z-40 hidden xl:block"
      >
        <div className="glass-card p-5 text-sm w-[260px]">

          <div className="flex items-center gap-2 mb-4">

            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

            <p className="text-cyan-400 font-bold">
              SYSTEM ACTIVE
            </p>

          </div>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span className="text-gray-400">
                Status
              </span>

              <span className="text-green-400">
                {status}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                Security
              </span>

              <span className="text-cyan-400">
                ACTIVE
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                AI Shield
              </span>

              <span className="text-purple-400">
                RUNNING
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                Backend
              </span>

              <span className="text-yellow-400">
                STABLE
              </span>
            </div>

          </div>

        </div>
      </motion.div>

      {/* HERO */}
      <Hero />

      {/* PROJECTS */}
      <Projects />

      {/* CYBER LAB */}
      <CyberLab />

      {/* TECH ORBIT */}
      <TechOrbit />

      {/* GITHUB */}
      <GitHubStats />

      <GitHubProjects />

      {/* CONTACT */}
      <Contact />

      {/* FOOTER */}
      <footer className="mt-24 border-t border-white/10 bg-black/20 backdrop-blur-md relative z-20">

        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* TOP */}
          <div className="grid lg:grid-cols-3 gap-12">

            {/* BRAND */}
            <div>

              <h2 className="text-3xl font-black text-cyan-400 mb-4 glow-text">
                DALITECH CEH
              </h2>

              <p className="text-gray-400 leading-relaxed">
                Cybersecurity Engineer •
                Full-Stack Developer •
                Tech Entrepreneur
              </p>

              <div className="flex items-center gap-3 mt-6">

                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

                <p className="text-sm text-gray-300">
                  Available For Projects &
                  Collaborations
                </p>

              </div>

            </div>

            {/* QUICK LINKS */}
            <div>

              <h3 className="text-xl font-bold mb-6 text-white">
                Navigation
              </h3>

              <div className="flex flex-col gap-4 text-gray-400">

                <a
                  href="/"
                  className="hover:text-cyan-400 transition"
                >
                  Home
                </a>

                <a
                  href="/projects"
                  className="hover:text-cyan-400 transition"
                >
                  Projects
                </a>

                <a
                  href="/cyberlab"
                  className="hover:text-cyan-400 transition"
                >
                  Cyber Lab
                </a>

                <a
                  href="/dashboard"
                  className="hover:text-cyan-400 transition"
                >
                  Dashboard
                </a>

                <a
                  href="/contact"
                  className="hover:text-cyan-400 transition"
                >
                  Contact
                </a>

              </div>

            </div>

            {/* CONTACT + SOCIALS */}
            <div>

              <h3 className="text-xl font-bold mb-6 text-white">
                Connect Network
              </h3>

              {/* SOCIALS */}
              <div className="flex flex-wrap gap-4 mb-8">

                <a
                  href="https://github.com/dalton2171"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-btn p-4"
                >
                  <FaGithub />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-btn p-4"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-btn p-4"
                >
                  <FaYoutube />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-btn p-4"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-btn p-4"
                >
                  <FaFacebook />
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-btn p-4"
                >
                  <FaTiktok />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-btn p-4"
                >
                  <FaTwitter />
                </a>

              </div>

              {/* EMAIL COPY */}
              <button
                onClick={copyEmail}
                className="cyber-btn flex items-center gap-2"
              >
                <FiCopy />

                {copied
                  ? "Email Copied!"
                  : "Copy Email"}
              </button>

            </div>

          </div>

          {/* BOTTOM */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">

            {/* LEFT */}
            <div className="flex items-center gap-3 text-gray-400 text-sm">

              <FiShield className="text-cyan-400" />

              <span>
                AI Protected Infrastructure
              </span>

            </div>

            {/* CENTER */}
            <div className="flex items-center gap-3 text-gray-400 text-sm">

              <FiActivity className="text-green-400" />

              <span>
                Secure Digital Ecosystem
              </span>

            </div>

            {/* RIGHT */}
            <div className="glass-card px-5 py-3 text-center">

              <p className="text-xs text-gray-400 mb-1">
                Local System Time
              </p>

              <h3 className="text-cyan-400 font-bold">
                {time}
              </h3>

            </div>

          </div>

          {/* COPYRIGHT */}
          <div className="mt-10 text-center text-gray-500 text-sm">

            © {new Date().getFullYear()} DALITECH CEH —
            All Rights Reserved.

          </div>

        </div>

      </footer>

    </main>
  );
}

export default Home;