import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";

import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/animations.css";
import "./styles/components.css";

import "./styles/intro.css";
import "./styles/openingGift.css";
import "./styles/birthday.css";
import "./styles/letter.css";
import "./styles/timeline.css";
import "./styles/music.css";
import "./styles/gifts.css";
import "./styles/movieInvite.css";
import "./styles/ending.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);