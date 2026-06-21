import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Modal from "react-modal";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

Modal.setAppElement("#root");
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
