import { motion } from "framer-motion";

function ArchitectureModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card p-8 w-[90%] md:w-[600px]"
      >

        <h2 className="text-2xl font-bold mb-4 text-cyan-400">
          System Architecture
        </h2>

        <div className="font-mono text-sm space-y-2 text-gray-300">
          <p>Frontend → React UI Layer</p>
          <p>API Layer → Backend Services</p>
          <p>Auth → JWT Secure Tokens</p>
          <p>Database → Encrypted Storage</p>
          <p>Security → Firewall + Validation</p>
        </div>

        <button
          onClick={onClose}
          className="cyber-btn mt-6"
        >
          Close
        </button>

      </motion.div>

    </div>
  );
}

export default ArchitectureModal;