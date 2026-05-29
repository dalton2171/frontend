import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FiShield,
  FiLock,
  FiSmartphone,
  FiEye,
  FiEyeOff,
  FiLoader,
} from "react-icons/fi";

import api from "../lib/api";

function Login() {
  const navigate = useNavigate();

  // =========================================
  // FORM STATE
  // =========================================
  const [form, setForm] = useState({
    email: "",
    password: "",
    otp: "",
  });

  // =========================================
  // UI STATE
  // =========================================
  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [otpStage, setOtpStage] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  // =========================================
  // STEP 1 LOGIN
  // =========================================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      setMessage("");

      const res = await api.post(
        "/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      if (res.data.success) {
        setOtpStage(true);

        setMessage(
          "WhatsApp verification code sent successfully."
        );
      }
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          "Authentication failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // STEP 2 VERIFY OTP
  // =========================================
  const verifyOTP = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      const res = await api.post(
        "/api/auth/verify-otp",
        {
          email: form.email,
          otp: form.otp,
        }
      );

      if (res.data.success) {
        // SAVE JWT TOKEN
        localStorage.setItem(
          "token",
          res.data.token
        );

        // SAVE ADMIN DATA
        localStorage.setItem(
          "admin",
          JSON.stringify(
            res.data.admin
          )
        );

        navigate("/admin");
      }
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#02030a] flex items-center justify-center px-6 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="cyber-grid"></div>

      <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full"></div>

      {/* LOGIN CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="glass-card w-full max-w-md p-8 relative z-10"
      >

        {/* ICON */}
        <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-400 flex items-center justify-center mx-auto mb-6">

          <FiShield className="text-cyan-400 text-4xl" />

        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-black text-center mb-3">

          DALITECH{" "}

          <span className="text-cyan-400">
            SECURE LOGIN
          </span>

        </h1>

        <p className="text-gray-400 text-center mb-8">

          AI Protected Administrative Access

        </p>

        {/* STATUS */}
        {message && (
          <div className="bg-green-500/10 border border-green-400 text-green-400 p-3 rounded-2xl mb-5 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-400 text-red-400 p-3 rounded-2xl mb-5 text-sm">
            {error}
          </div>
        )}

        {/* LOGIN FORM */}
        {!otpStage ? (
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Administrator Email
              </label>

              <input
                type="email"
                required
                placeholder="admin@dalitech.com"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email:
                      e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none focus:border-cyan-400 transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Secure Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  required
                  placeholder="Enter secure password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password:
                        e.target.value,
                    })
                  }
                  className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none focus:border-cyan-400 transition pr-14"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>

              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="cyber-btn w-full flex items-center justify-center gap-3"
            >

              {loading ? (
                <>
                  <FiLoader className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <FiLock />
                  Continue Secure Login
                </>
              )}

            </button>

          </form>
        ) : (
          // ======================================
          // OTP VERIFICATION
          // ======================================
          <form
            onSubmit={verifyOTP}
            className="space-y-5"
          >

            <div className="text-center mb-5">

              <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-400 flex items-center justify-center mx-auto mb-4">

                <FiSmartphone className="text-green-400 text-3xl" />

              </div>

              <h2 className="text-2xl font-bold text-green-400">
                WhatsApp Verification
              </h2>

              <p className="text-gray-400 text-sm mt-2">
                Enter the OTP sent to your WhatsApp number.
              </p>

            </div>

            {/* OTP */}
            <input
              type="text"
              required
              placeholder="Enter OTP code"
              value={form.otp}
              onChange={(e) =>
                setForm({
                  ...form,
                  otp: e.target.value,
                })
              }
              className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none focus:border-green-400 transition text-center tracking-[8px] text-xl"
            />

            {/* VERIFY BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="cyber-btn w-full flex items-center justify-center gap-3"
            >

              {loading ? (
                <>
                  <FiLoader className="animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <FiShield />
                  Verify & Access Admin
                </>
              )}

            </button>

          </form>
        )}

        {/* FOOTER */}
        <div className="mt-8 text-center text-xs text-gray-500">

          <p>
            JWT Authentication • WhatsApp OTP • AI Threat Protection
          </p>

          <p className="mt-2">
            Unauthorized access attempts are monitored and logged.
          </p>

        </div>

      </motion.div>

    </main>
  );
}

export default Login;