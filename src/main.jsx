import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProviderContext } from "./contexts/index.jsx";

createRoot(document.getElementById("root")).render(
  <ProviderContext>
    <App />
  </ProviderContext>
);
