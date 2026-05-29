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
  const [loading, setLoading] =
    useState(true);

  // =========================================
  // CURSOR STATE
  // =========================================
  const [cursor, setCursor] =
    useState({
      x: 0,
      y: 0,
    });

  // =========================================
  // CURSOR MOVEMENT
  // =========================================
  useEffect(() => {
    const move = (e) => {
      setCursor({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener(
      "mousemove",
      move
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        move
      );
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

      {/* BOOT SCREEN */}
      {loading ? (
        <BootScreen
          onFinish={() =>
            setLoading(false)
          }
        />
      ) : (
        <Routes>

          {/* ========================================= */}
          {/* PUBLIC PORTFOLIO ROUTES */}
          {/* ========================================= */}

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* PROJECTS */}
          <Route
            path="/projects"
            element={
              <ProjectsPage />
            }
          />

          {/* CYBER LAB */}
          <Route
            path="/cyberlab"
            element={
              <CyberLabPage />
            }
          />

          {/* CONTACT */}
          <Route
            path="/contact"
            element={
              <ContactPage />
            }
          />

          {/* SOCIAL HUB */}
          <Route
            path="/socialhub"
            element={<SocialHub />}
          />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* ANALYTICS */}
          <Route
            path="/analytics"
            element={<Analytics />}
          />

          {/* ========================================= */}
          {/* ADMIN AUTH ROUTES */}
          {/* ========================================= */}

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={<Admin />}
          />

          {/* ========================================= */}
          {/* FALLBACK */}
          {/* ========================================= */}
          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>
      )}

    </BrowserRouter>
  );
}

export default App;