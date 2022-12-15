import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import { BrowserRouter } from "react-router-dom";
//Import fonts for Mui
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
const root = createRoot(document.querySelector(".root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
