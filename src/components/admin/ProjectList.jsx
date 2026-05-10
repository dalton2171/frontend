function ProjectList({
  projects,
  setSelected,
  deleteProject,
}) {
  return (
    <div className="glass-card p-6">

      <h2 className="text-cyan-400 mb-4">
        Live Projects
      </h2>

      <div className="space-y-3">

        {projects.map((p, i) => (
          <div
            key={i}
            className="p-3 bg-white/5 border border-white/10"
          >

            <h3 className="font-bold">{p.title}</h3>

            <p className="text-sm text-gray-400">
              {p.status}
            </p>

            <div className="flex gap-2 mt-2">

              <button
                onClick={() => setSelected(p)}
                className="glass-btn text-xs"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteProject(p.title)
                }
                className="cyber-btn text-xs"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ProjectList;