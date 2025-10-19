import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApiContext } from "./Context Api/ApiContext.jsx";

createRoot(document.getElementById("root")).render(
  <ApiContext>
    <App />
  </ApiContext>
);
