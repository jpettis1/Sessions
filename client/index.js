import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";

const root = createRoot(document.querySelector(".root"));
root.render(<App />);
