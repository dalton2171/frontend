import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function GitHubStats() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/dalton2171")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="glass-card p-6"
    >
      <h3 className="text-cyan-400 text-xl font-bold mb-4">
        Live GitHub Intelligence
      </h3>

      {!data ? (
        <p className="text-gray-400">Fetching data...</p>
      ) : (
        <div className="space-y-2 text-sm text-gray-300">
          <p>Username: {data.login}</p>
          <p>Followers: {data.followers}</p>
          <p>Public Repos: {data.public_repos}</p>
          <p>Location: {data.location}</p>
        </div>
      )}
    </motion.div>
  );
}

export default GitHubStats;