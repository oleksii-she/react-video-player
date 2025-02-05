import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./app/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
/*     "video.js": "7.12.3",
    "videojs-contrib-quality-levels": "2.1.0",
    "videojs-hls-quality-selector": "1.1.4", */
