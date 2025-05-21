import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Removed StrictMode to prevent double rendering of components
// This helps avoid issues with Three.js components being rendered twice
createRoot(document.getElementById("root")!).render(<App />);
