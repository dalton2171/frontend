import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "dalitech@root") {
      navigate("/admin");
    } else {
      alert("ACCESS DENIED ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="glass-card p-8 w-96">

        <h1 className="text-cyan-400 text-center text-xl mb-6">
          ADMIN ACCESS
        </h1>

        <input
          type="password"
          placeholder="Enter Access Key"
          className="w-full p-3 bg-black/40 border border-white/10 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="cyber-btn w-full"
        >
          Authenticate
        </button>

      </div>

    </div>
  );
}

export default Login;