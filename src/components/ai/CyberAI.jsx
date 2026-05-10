import { useState } from "react";
import axios from "axios";

function CyberAI() {
  const [message, setMessage] = useState("");

  const [response, setResponse] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/ai/analyze",
        {
          message,
        }
      );

      setResponse(res.data.response);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 mt-10">

      <h2 className="text-3xl font-black text-cyan-400 mb-5">
        AI Cyber Assistant
      </h2>

      <textarea
        placeholder="Ask AI about cybersecurity..."
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        className="w-full h-40 bg-black/40 border border-white/10 rounded-xl p-4 outline-none"
      />

      <button
        onClick={handleAnalyze}
        className="cyber-btn mt-5"
      >
        {loading
          ? "Analyzing..."
          : "Run AI Analysis"}
      </button>

      {response && (
        <div className="mt-6 bg-black/40 border border-cyan-400/20 rounded-xl p-5 whitespace-pre-wrap text-green-400 font-mono">
          {response}
        </div>
      )}

    </div>
  );
}

export default CyberAI;