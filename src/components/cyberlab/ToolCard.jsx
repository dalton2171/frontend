import { motion } from "framer-motion";
import { useCyber } from "../../context/CyberContext";

function ToolCard({ tool }) {
  const { runTool } = useCyber();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="glass-card p-6"
    >
      <h2 className="text-xl font-bold text-cyan-400 mb-3">
        {tool.name}
      </h2>

      <p className="text-gray-400 text-sm mb-5">
        {tool.description}
      </p>

      <button
        onClick={() => runTool(tool.name)}
        className="cyber-btn w-full"
      >
        Execute Tool
      </button>
    </motion.div>
  );
}

export default ToolCard;