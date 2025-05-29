import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <script
      src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
      crossorigin
    ></script>

    <script
      src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
      crossorigin
    ></script>

    <script
      src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
      crossorigin
    ></script>
  </StrictMode>
);
