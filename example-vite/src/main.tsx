import React from "react";
import ReactDOM from "react-dom/client";

import "./app.scss";
import "vite/modulepreload-polyfill";

import App from "./app";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
