import { io } from "socket.io-client";

// ===============================
// SOCKET URL
// ===============================
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  "https://backend-o6y6.onrender.com";

// ===============================
// SOCKET CONNECTION
// ===============================
const socket = io(SOCKET_URL, {
  withCredentials: true,

  // Better realtime stability
  transports: ["websocket", "polling"],

  // Auto reconnect
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,

  // Timeout
  timeout: 20000,
});

// ===============================
// DEBUG EVENTS
// ===============================
socket.on("connect", () => {
  console.log(
    "🟢 Socket connected:",
    socket.id
  );
});

socket.on("disconnect", (reason) => {
  console.log(
    "🔴 Socket disconnected:",
    reason
  );
});

socket.on("connect_error", (err) => {
  console.log(
    "⚠️ Socket error:",
    err.message
  );
});

socket.on("reconnect", (attempt) => {
  console.log(
    `🟢 Socket reconnected after ${attempt} attempts`
  );
});

// ===============================
// EXPORT
// ===============================
export default socket;