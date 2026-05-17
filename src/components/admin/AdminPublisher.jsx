import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import {
  FiUpload,
  FiShield,
  FiLoader,
  FiImage,
  FiVideo,
} from "react-icons/fi";

import api from "../../lib/api";
import socket from "../../lib/socket";

function AdminPublisher() {
  // =========================================
  // AUTH STATE
  // =========================================
  const [authorized, setAuthorized] =
    useState(false);

  const [checkingAuth, setCheckingAuth] =
    useState(true);

  // =========================================
  // FORM STATE
  // =========================================
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "video",
    platform: "YouTube",
    thumbnail: "",
    mediaUrl: "",
  });

  // =========================================
  // FILE STATE
  // =========================================
  const [file, setFile] = useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // =========================================
  // VERIFY ADMIN
  // =========================================
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) {
          setAuthorized(false);
          setCheckingAuth(false);
          return;
        }

        const res = await api.get(
          "/api/auth/verify-admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (error) {
        console.log(error);

        setAuthorized(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    verifyAdmin();
  }, []);

  // =========================================
  // FILE UPLOAD
  // =========================================
  const uploadFile = async () => {
    try {
      if (!file) return null;

      setUploading(true);

      const token =
        localStorage.getItem("token");

      const formData = new FormData();

      formData.append("file", file);

      const res = await api.post(
        "/api/upload/single",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      return res.data.file.url;
    } catch (error) {
      console.log(error);
      alert("File upload failed.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  // =========================================
  // SUBMIT CONTENT
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      // =====================================
      // UPLOAD FILE FIRST
      // =====================================
      let uploadedUrl = "";

      if (file) {
        uploadedUrl = await uploadFile();
      }

      // =====================================
      // CREATE CONTENT
      // =====================================
      const payload = {
        ...form,
        thumbnail:
          uploadedUrl ||
          form.thumbnail,

        mediaUrl:
          uploadedUrl ||
          form.mediaUrl,
      };

      const res = await api.post(
        "/api/content",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newContent =
        res.data.content;

      // =====================================
      // REALTIME EVENT
      // =====================================
      socket.emit("admin-publish", {
        id: newContent._id,
        title: newContent.title,
        description:
          newContent.description,
        platform:
          newContent.platform,
        type: newContent.type,
        thumbnail:
          newContent.thumbnail,
        mediaUrl:
          newContent.mediaUrl,
        createdAt:
          new Date().toISOString(),
      });

      alert(
        "🚀 Content published successfully!"
      );

      // RESET
      setForm({
        title: "",
        description: "",
        type: "video",
        platform: "YouTube",
        thumbnail: "",
        mediaUrl: "",
      });

      setFile(null);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Publishing failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // LOADING
  // =========================================
  if (checkingAuth) {
    return (
      <div className="glass-card p-10 text-center">
        <FiLoader className="animate-spin text-5xl text-cyan-400 mx-auto mb-5" />

        <h2 className="text-2xl font-bold">
          Verifying Admin Access...
        </h2>
      </div>
    );
  }

  // =========================================
  // BLOCK NON ADMIN
  // =========================================
  if (!authorized) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="glass-card p-6">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400 flex items-center justify-center">

          <FiShield className="text-cyan-400 text-2xl" />

        </div>

        <div>
          <h2 className="text-3xl font-black text-cyan-400">
            Secure Admin Publisher
          </h2>

          <p className="text-gray-400">
            Protected content publishing system
          </p>
        </div>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* TITLE */}
        <input
          type="text"
          placeholder="Content title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none focus:border-cyan-400"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Content description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
          className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none focus:border-cyan-400 min-h-[140px]"
          required
        />

        {/* TYPE */}
        <select
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
            })
          }
          className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
        >
          <option value="video">
            Video
          </option>

          <option value="post">
            Post
          </option>

          <option value="project">
            Project
          </option>
        </select>

        {/* PLATFORM */}
        <select
          value={form.platform}
          onChange={(e) =>
            setForm({
              ...form,
              platform:
                e.target.value,
            })
          }
          className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
        >
          <option>
            YouTube
          </option>

          <option>
            TikTok
          </option>

          <option>
            Instagram
          </option>

          <option>
            Facebook
          </option>

          <option>
            Twitter/X
          </option>
        </select>

        {/* FILE */}
        <div className="border border-dashed border-cyan-400/30 rounded-2xl p-6">

          <label className="flex flex-col items-center justify-center cursor-pointer">

            <div className="text-5xl text-cyan-400 mb-4">

              {form.type === "video" ? (
                <FiVideo />
              ) : (
                <FiImage />
              )}

            </div>

            <p className="text-gray-300 mb-2">
              Click to upload media
            </p>

            <p className="text-gray-500 text-sm">
              PNG, JPG, WEBP, MP4
            </p>

            <input
              type="file"
              hidden
              onChange={(e) =>
                setFile(
                  e.target.files[0]
                )
              }
            />

          </label>

          {file && (
            <div className="mt-4 text-green-400 text-sm text-center">
              Selected:
              {" "}
              {file.name}
            </div>
          )}

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={
            loading || uploading
          }
          className="cyber-btn w-full flex items-center justify-center gap-3"
        >

          {loading ||
          uploading ? (
            <>
              <FiLoader className="animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <FiUpload />
              Publish Live Content
            </>
          )}

        </button>

      </form>

    </div>
  );
}

export default AdminPublisher;