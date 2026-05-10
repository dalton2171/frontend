import { useEffect, useRef } from "react";

import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

import { io } from "socket.io-client";

import "xterm/css/xterm.css";

function LiveTerminal() {
  const terminalRef = useRef(null);

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#02030a",
        foreground: "#00ffcc",
      },
    });

    const fitAddon = new FitAddon();

    term.loadAddon(fitAddon);

    term.open(terminalRef.current);

    fitAddon.fit();

    const socket = io("http://localhost:5000");

    socket.on("terminal:data", (data) => {
      term.write(data);
    });

    term.onData((data) => {
      socket.emit("terminal:write", data);
    });

    return () => {
      socket.disconnect();
      term.dispose();
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      className="w-full h-[600px] rounded-2xl overflow-hidden border border-cyan-400"
    />
  );
}

export default LiveTerminal;