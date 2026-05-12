import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function GitHubProjects() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/dalton2171/repos")
      .then((res) => res.json())
      .then((data) => setRepos(data.slice(0, 6))); // top 6 repos
  }, []);

  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-10">
        Live <span className="text-cyan-400">Repositories</span>
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {repos.map((repo) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            whileHover={{ scale: 1.03 }}
            className="glass-card p-5 block"
          >
            <h3 className="text-xl font-bold text-white">
              {repo.name}
            </h3>

            <p className="text-gray-400 text-sm mt-2">
              {repo.description || "No description provided"}
            </p>

            <div className="mt-3 text-xs text-cyan-400">
              ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
            </div>
          </motion.a>
        ))}

      </div>
    </section>
  );
}

export default GitHubProjects;