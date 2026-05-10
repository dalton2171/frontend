import { motion } from "framer-motion";

import {
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

import {
  FiMenu,
  FiX,
  FiMoon,
  FiSun,
  FiShield,
  FiActivity,
} from "react-icons/fi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(true);

  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  // DARK MODE SYSTEM
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  // NAV LINKS
  const navLinks = [
    { name: "Home", path: "/" },

    {
      name: "Projects",
      path: "/projects",
    },

    {
      name: "Cyber Lab",
      path: "/cyberlab",
    },

    {
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      name: "Analytics",
      path: "/analytics",
    },

    {
      name: "Socials",
      path: "/socials",
    },

    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <>
      {/* TOP SECURITY BAR */}
      <div className="fixed top-0 left-0 w-full z-[60] bg-black/80 border-b border-cyan-500/10 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs">

          {/* LEFT */}
          <div className="flex items-center gap-3 text-gray-400">

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

              <span>
                AI SECURITY ACTIVE
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <FiShield className="text-cyan-400" />

              <span>
                Protected Infrastructure
              </span>
            </div>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 text-gray-400">

            <div className="hidden md:flex items-center gap-2">
              <FiActivity className="text-green-400" />

              <span>
                Threat Monitoring Enabled
              </span>
            </div>

            <span className="text-cyan-400 font-semibold">
              DALITECH CEH
            </span>

          </div>

        </div>

      </div>

      {/* MAIN NAVBAR */}
      <motion.nav
        initial={{
          y: -80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className={`fixed left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "top-[36px] bg-black/70 backdrop-blur-2xl border-b border-cyan-500/20 shadow-[0_0_30px_rgba(0,255,255,0.08)]"
            : "top-[36px] bg-black/30 backdrop-blur-md border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <motion.div
            whileHover={{
              scale: 1.04,
            }}
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center gap-3"
          >

            {/* LOGO ICON */}
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.4)]">

              <FiShield className="text-black text-xl" />

            </div>

            {/* LOGO TEXT */}
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-widest text-cyan-400 leading-none">
                DALITECH CEH
              </h1>

              <p className="text-[10px] uppercase tracking-[3px] text-gray-500 mt-1">
                Cyber Command Center
              </p>
            </div>

          </motion.div>

          {/* DESKTOP NAV */}
          <ul className="hidden lg:flex gap-7 text-sm uppercase tracking-wider items-center">

            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-cyan-400 border-b border-cyan-400 pb-1 font-semibold"
                      : "nav-link text-gray-300 hover:text-cyan-400"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

          </ul>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* ONLINE STATUS */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">

              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

              <span className="text-xs text-gray-300">
                SYSTEM ONLINE
              </span>

            </div>

            {/* DARK MODE TOGGLE */}
            <motion.button
              whileTap={{
                scale: 0.9,
              }}
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="glass-btn p-3"
            >
              {darkMode ? (
                <FiSun />
              ) : (
                <FiMoon />
              )}
            </motion.button>

            {/* CONNECT BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={() =>
                navigate("/contact")
              }
              className="cyber-btn hidden md:block"
            >
              Secure Connect
            </motion.button>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="lg:hidden glass-btn p-3"
            >
              {menuOpen ? (
                <FiX />
              ) : (
                <FiMenu />
              )}
            </button>

          </div>

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="lg:hidden px-6 pb-6 mobile-menu"
          >

            <div className="glass-card p-6">

              {/* CURRENT PAGE */}
              <div className="mb-5 text-sm text-gray-400">
                Current Route:
                <span className="text-cyan-400 ml-2">
                  {location.pathname}
                </span>
              </div>

              <ul className="flex flex-col gap-5 uppercase tracking-wider">

                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className={({ isActive }) =>
                        isActive
                          ? "text-cyan-400 font-semibold"
                          : "nav-link text-gray-300"
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}

              </ul>

              {/* MOBILE FOOTER */}
              <div className="mt-8 pt-5 border-t border-white/10 text-xs text-gray-500">

                <p>
                  DALITECH CEH © 2026
                </p>

                <p className="mt-1">
                  AI Protected Infrastructure
                </p>

              </div>

            </div>

          </motion.div>
        )}
      </motion.nav>
    </>
  );
}

export default Navbar;