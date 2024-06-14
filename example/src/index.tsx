import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/app";
import "./css/index.css";
import "vms-editor/dist/css/vms-editor.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);
