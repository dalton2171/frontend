import { useState } from "react";

import {
  calculateThreat,
} from "../../data/aiRules";

function AIThreatScanner() {
  const [message, setMessage] = useState("");

  const [result, setResult] = useState(null);

  const scanMessage = () => {
    const score =
      calculateThreat(message);

    let status = "SAFE";

    if (score >= 60) {
      status = "MALICIOUS";
    } else if (score >= 30) {
      status = "SUSPICIOUS";
    }

    setResult({
      score,
      status,
    });
  };

  return (
    <div className="glass-card p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        AI Threat Scanner
      </h2>

      <textarea
        rows="6"
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="Paste suspicious message..."
        className="w-full p-4 bg-black/30 border border-white/10 rounded-xl outline-none mb-4"
      ></textarea>

      <button
        onClick={scanMessage}
        className="cyber-btn"
      >
        Analyze Threat
      </button>

      {result && (
        <div className="mt-6">

          <p className="mb-2">
            Threat Score:
            <span className="text-cyan-400 ml-2">
              {result.score}%
            </span>
          </p>

          <p>
            Status:
            <span
              className={`ml-2 font-bold ${
                result.status ===
                "MALICIOUS"
                  ? "text-red-400"
                  : result.status ===
                    "SUSPICIOUS"
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {result.status}
            </span>
          </p>

          {result.status ===
            "MALICIOUS" && (
            <div className="mt-4 text-red-400">
              USER FLAGGED FOR
              6-MONTH BAN
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default AIThreatScanner;