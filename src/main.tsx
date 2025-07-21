//? Module
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//? Style
import "./style/style-theme.css";
import "./style/style.css";
import "./style/style-mobile.css";
import "aos/dist/aos.css";

//? Component
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
