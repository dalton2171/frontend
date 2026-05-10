import { useState } from "react";
import { motion } from "framer-motion";

function ContentManager() {
  const [posts, setPosts] = useState([]);

  const [form, setForm] = useState({
    title: "",
    type: "post",
    content: "",
    platform: "YouTube",
  });

  // ADD CONTENT
  const addContent = (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      alert("Title and content required");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: form.title,
      type: form.type,
      content: form.content,
      platform: form.platform,
      date: new Date().toISOString(),
    };

    setPosts([newPost, ...posts]);

    setForm({
      title: "",
      type: "post",
      content: "",
      platform: "YouTube",
    });
  };

  // DELETE
  const deletePost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="glass-card p-6">

      <h2 className="text-xl text-cyan-400 mb-4">
        Content Manager (Social Hub Control)
      </h2>

      {/* FORM */}
      <form onSubmit={addContent} className="space-y-3">

        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 bg-black/40 border border-white/10"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <select
          className="w-full p-2 bg-black/40 border border-white/10"
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        >
          <option value="post">Post</option>
          <option value="video">Video</option>
          <option value="image">Image</option>
          <option value="link">Link</option>
        </select>

        <input
          type="text"
          placeholder="Content / URL"
          className="w-full p-2 bg-black/40 border border-white/10"
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
        />

        <select
          className="w-full p-2 bg-black/40 border border-white/10"
          value={form.platform}
          onChange={(e) =>
            setForm({ ...form, platform: e.target.value })
          }
        >
          <option>YouTube</option>
          <option>Instagram</option>
          <option>TikTok</option>
          <option>Facebook</option>
          <option>Twitter/X</option>
        </select>

        <button className="cyber-btn w-full">
          Publish Content
        </button>

      </form>

      {/* LIST */}
      <div className="mt-6 space-y-3">

        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 border border-white/10 rounded-lg bg-white/5"
          >

            <h3 className="text-cyan-400 font-bold">
              {post.title}
            </h3>

            <p className="text-sm text-gray-300">
              {post.type} • {post.platform}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {post.content}
            </p>

            <button
              onClick={() => deletePost(post.id)}
              className="text-red-400 text-xs mt-2"
            >
              Delete
            </button>

          </motion.div>
        ))}

      </div>

    </div>
  );
}

export default ContentManager;