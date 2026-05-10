import { useState, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import CyberLabPage from "./pages/CyberLabPage";
import ContactPage from "./pages/ContactPage";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import SocialHub from "./pages/SocialHub";

import BootScreen from "./components/BootScreen";

function App() {
  const [loading, setLoading] = useState(true);

  // CURSOR STATE
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  // CURSOR MOVEMENT
  useEffect(() => {
    const move = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <BrowserRouter>

      {/* CURSOR GLOW */}
      <div
        className="cursor"
        style={{
          left: cursor.x,
          top: cursor.y,
        }}
      ></div>

      {/* SCAN LINE */}
      <div className="scan-line"></div>

      {/* BOOT OR MAIN APP */}
      {loading ? (
        <BootScreen onFinish={() => setLoading(false)} />
      ) : (
        <Routes>

          {/* MAIN HOME */}
          <Route path="/" element={<Home />} />

          {/* PUBLIC PAGES */}
          <Route
            path="/projects"
            element={<ProjectsPage />}
          />

          <Route
            path="/cyberlab"
            element={<CyberLabPage />}
          />

          <Route
            path="/contact"
            element={<ContactPage />}
          />

          {/* SYSTEM PAGES */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

         <Route
          path="/admin" 
          element={<Admin />} 
          />
    

          <Route
            path="/login"
            element={<Login />}
          />
          <Route path="/socials" element={<SocialHub />} />

          {/* FIX: CATCH-ALL ROUTE */}
          {/* This prevents the "No routes matched" error by redirecting invalid paths back to home */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      )}

    </BrowserRouter>
  );
}

export default App;