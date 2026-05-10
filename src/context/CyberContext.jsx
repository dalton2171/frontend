import { createContext, useContext, useState } from "react";

const CyberContext = createContext();

export function CyberProvider({ children }) {
  // TERMINAL OUTPUT
  const [terminalLogs, setTerminalLogs] = useState([
    "Initializing secure environment...",
    "Connecting AI security modules...",
    "Docker container ready.",
  ]);

  // THREATS
  const [threats, setThreats] = useState([]);

  // ACTIVE TOOLS
  const [activeTools, setActiveTools] = useState([]);

  // SECURITY STATUS
  const [securityStatus, setSecurityStatus] =
    useState({
      firewall: true,
      aiScanner: true,
      intrusion: true,
      sandbox: true,
    });

  // RUN TOOL
  const runTool = (tool) => {
    setActiveTools((prev) => [...prev, tool]);

    setTerminalLogs((prev) => [
      ...prev,
      `[SYSTEM] Running ${tool}...`,
    ]);

    // SIMULATED AI EVENTS
    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        `[AI] ${tool} scan completed.`,
      ]);
    }, 2000);
  };

  // ADD THREAT
  const addThreat = (threat) => {
    setThreats((prev) => [...prev, threat]);

    setTerminalLogs((prev) => [
      ...prev,
      `[THREAT] ${threat}`,
    ]);
  };

  return (
    <CyberContext.Provider
      value={{
        terminalLogs,
        threats,
        activeTools,
        securityStatus,
        runTool,
        addThreat,
      }}
    >
      {children}
    </CyberContext.Provider>
  );
}

export const useCyber = () =>
  useContext(CyberContext);