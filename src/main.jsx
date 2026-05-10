
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/global.css";

import { ContentProvider } from "./context/ContentContext";
import { CyberProvider } from "./context/CyberContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ContentProvider>
      <CyberProvider>
        <App />
      </CyberProvider>
    </ContentProvider>
  </React.StrictMode>
);