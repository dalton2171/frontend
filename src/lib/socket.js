import { io } from "socket.io-client";

// ===============================
// SOCKET CONNECTION (PHASE 8)
// ===============================
const socket = io("http://localhost:5000", {
  withCredentials: true,

  // makes connection more stable for realtime dashboards
  transports: ["websocket", "polling"],

  // auto reconnect system (important for AI dashboard)
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

// ===============================
// DEBUG (optional but useful)
// ===============================
socket.on("connect", () => {
  console.log("🟢 Socket connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("🔴 Socket disconnected");
});

socket.on("connect_error", (err) => {
  console.log("⚠️ Socket error:", err.message);
});

export default socket;