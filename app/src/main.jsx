import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import {
  MemoryProvider,
} from "./contexts/MemoryContext";

import "./index.css";
import "./styles/globals.css";
import "./styles/animations.css";


ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <BrowserRouter>

      <MemoryProvider>

        <App />

      </MemoryProvider>

    </BrowserRouter>

  </React.StrictMode>
);