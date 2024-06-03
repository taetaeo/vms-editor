import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/app";
import "vms-editor/dist/css/vms-editor.css";

const container = document.getElementById("wrap") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(<App />);
