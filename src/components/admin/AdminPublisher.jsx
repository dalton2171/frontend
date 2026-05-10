import { useState } from "react";
import api from "../../lib/api";
import socket from "../../lib/socket";

function AdminPublisher() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "video",
    platform: "YouTube",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // SUBMIT + REALTIME PUSH
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. SAVE TO DATABASE
      const res = await api.post("/content", form);

      const newContent = res.data.content;

      // 2. SEND REALTIME EVENT TO ALL USERS
      socket.emit("admin-publish", {
        id: newContent._id,
        title: newContent.title,
        description: newContent.description,
        platform: newContent.platform,
        type: newContent.type,
        thumbnail: newContent.thumbnail,
        createdAt: new Date().toISOString(),
      });

      alert("🚀 Content published live!");

      // RESET FORM
      setForm({
        title: "",
        description: "",
        type: "video",
        platform: "YouTube",
        thumbnail: "",
      });
    } catch (error) {
      console.log(error);
      alert("Publishing failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6">
      
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Live Admin Publisher
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* TITLE */}
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
          required
        />

        {/* THUMBNAIL */}
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={form.thumbnail}
          onChange={(e) =>
            setForm({ ...form, thumbnail: e.target.value })
          }
          className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
        />

        {/* PLATFORM */}
        <select
          value={form.platform}
          onChange={(e) =>
            setForm({ ...form, platform: e.target.value })
          }
          className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
        >
          <option>YouTube</option>
          <option>TikTok</option>
          <option>Instagram</option>
          <option>Facebook</option>
          <option>Twitter/X</option>
        </select>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="cyber-btn w-full"
        >
          {loading ? "Publishing..." : "Publish Live Content"}
        </button>

      </form>
    </div>
  );
}

export default AdminPublisher;