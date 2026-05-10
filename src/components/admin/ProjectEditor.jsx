import { useState, useEffect } from "react";

function ProjectEditor({
  selected,
  addProject,
  updateProject,
}) {
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    tech: "",
    status: "ACTIVE",
  });

  // LOAD SELECTED PROJECT INTO FORM
  useEffect(() => {
    if (selected) {
      setForm({
        id: selected.id || Date.now(),
        title: selected.title || "",
        description: selected.description || "",
        tech: selected.tech ? selected.tech.join(", ") : "",
        status: selected.status || "ACTIVE",
      });
    } else {
      // reset when nothing selected
      setForm({
        id: null,
        title: "",
        description: "",
        tech: "",
        status: "ACTIVE",
      });
    }
  }, [selected]);

  // FORM HANDLER
  const handleSubmit = (e) => {
    e.preventDefault();

    // BASIC VALIDATION
    if (!form.title.trim() || !form.description.trim()) {
      alert("Title and Description are required");
      return;
    }

    const projectData = {
      id: form.id || Date.now(),
      title: form.title.trim(),
      description: form.description.trim(),
      tech: form.tech
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""),
      status: form.status,
    };

    if (selected) {
      updateProject(projectData);
    } else {
      addProject(projectData);
    }

    // RESET FORM
    setForm({
      id: null,
      title: "",
      description: "",
      tech: "",
      status: "ACTIVE",
    });
  };

  return (
    <div className="glass-card p-6">

      <h2 className="text-xl text-cyan-400 mb-4">
        Project Control Panel
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          placeholder="Title"
          className="w-full p-2 bg-black/40 border border-white/10"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 bg-black/40 border border-white/10"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          placeholder="Tech (comma separated)"
          className="w-full p-2 bg-black/40 border border-white/10"
          value={form.tech}
          onChange={(e) =>
            setForm({ ...form, tech: e.target.value })
          }
        />

        {/* STATUS CONTROL (important for admin system) */}
        <select
          className="w-full p-2 bg-black/40 border border-white/10"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="DEPLOYED">DEPLOYED</option>
          <option value="ARCHIVED">ARCHIVED</option>
        </select>

        <button className="cyber-btn w-full">
          {selected ? "Update Project" : "Add Project"}
        </button>

      </form>
    </div>
  );
}

export default ProjectEditor;