import { motion } from "framer-motion";
import { useCyber } from "../../context/CyberContext";

function CyberTerminal() {
  const { terminalLogs } = useCyber();

  return (
    <div className="bg-black rounded-2xl border border-cyan-400/20 p-5 h-[400px] overflow-y-auto font-mono text-sm">

      <div className="flex items-center gap-2 mb-5">
        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
      </div>

      {terminalLogs.map((log, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-400 mb-2"
        >
          {log}
        </motion.p>
      ))}

      <p className="text-cyan-400 animate-pulse">
        root@dalitech:~#
      </p>
    </div>
  );
}

export default CyberTerminal;