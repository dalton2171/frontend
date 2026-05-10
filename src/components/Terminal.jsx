import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { commands } from "../data/commands";

function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "Initializing DALITECH systems...",
    "Secure connection established.",
    "Type 'help' to view commands.",
  ]);

  const [booting, setBooting] = useState(true);
  const endRef = useRef(null);

  // AUTO SCROLL TO BOTTOM
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // BOOT SEQUENCE EFFECT
  useEffect(() => {
    const bootLogs = [
      "Booting kernel modules...",
      "Loading cybersecurity framework...",
      "Mounting secure environment...",
      "Encrypting session...",
      "System ready.",
    ];

    let i = 0;

    const interval = setInterval(() => {
      if (i < bootLogs.length) {
        setHistory((prev) => [...prev, bootLogs[i]]);
        i++;
      } else {
        setBooting(false);
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const handleCommand = (e) => {
    e.preventDefault();

    const command = input.trim().toLowerCase();

    if (!command) return;

    // CLEAR COMMAND
    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const response =
      commands[command] || `Command not found: ${command}`;

    setHistory((prev) => [
      ...prev,
      `> ${command}`,
      response,
    ]);

    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="glass-card p-6 h-[500px] overflow-hidden flex flex-col relative"
    >
      {/* TOP BAR */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>

        <span className="ml-4 text-sm text-gray-400 font-mono">
          terminal@dalitech
        </span>

        {/* LIVE STATUS */}
        <span className="ml-auto text-xs text-cyan-400 animate-pulse">
          {booting ? "BOOTING..." : "ONLINE"}
        </span>
      </div>

      {/* TERMINAL BODY */}
      <div className="flex-1 overflow-y-auto font-mono text-sm text-green-400 space-y-2 pr-2 terminal-scroll">

        {history.map((line, index) => (
          <div
            key={index}
            className="whitespace-pre-wrap animate-pulse"
          >
            {line}
          </div>
        ))}

        {/* SCROLL TARGET */}
        <div ref={endRef} />
      </div>

      {/* INPUT */}
      <form
        onSubmit={handleCommand}
        className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4"
      >
        <span className="text-cyan-400 font-mono">$</span>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            booting ? "system booting..." : "Enter command..."
          }
          disabled={booting}
          className="bg-transparent outline-none flex-1 text-white font-mono"
        />
      </form>

      {/* GLOW OVERLAY */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-gradient-to-br from-cyan-500 to-purple-500 blur-3xl"></div>
    </motion.div>
  );
}

export default Terminal;