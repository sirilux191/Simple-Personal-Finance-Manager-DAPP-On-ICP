import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./global.css";

const container = document.getElementById("app");
const app = createRoot(container);

app.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
