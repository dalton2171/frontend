import { useEffect, useState } from "react";

function BootScreen({ onFinish }) {
  const [text, setText] = useState("Initializing DALITECH CEH...");

  useEffect(() => {
    const steps = [
      "Loading kernel modules...",
      "Connecting secure nodes...",
      "Bypassing firewalls...",
      "Encrypting session...",
      "System ready.",
    ];

    let i = 0;

    const interval = setInterval(() => {
      if (i < steps.length) {
        setText(steps[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onFinish, 800);
      }
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center text-center z-50">
      <div>
        <h1 className="text-cyan-400 text-2xl mb-4 animate-pulse">
          DALITECH CEH
        </h1>
        <p className="text-green-400 font-mono">{text}</p>
      </div>
    </div>
  );
}

export default BootScreen;