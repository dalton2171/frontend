import { motion } from "framer-motion";

function SocialCard({ social }) {
  return (
    <motion.a
      href={social.link}
      target="_blank"
      rel="noreferrer"
      whileHover={{
        scale: 1.05,
      }}
      className={`glass-card p-6 block bg-gradient-to-br ${social.color}`}
    >
      <h2 className="text-2xl font-bold mb-2">
        {social.name}
      </h2>

      <p className="text-white/80 mb-4">
        {social.username}
      </p>

      <button className="glass-btn">
        Visit Platform
      </button>
    </motion.a>
  );
}

export default SocialCard;