import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./video-player.css";
import "./stream-player.css";

import App from "./app/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
