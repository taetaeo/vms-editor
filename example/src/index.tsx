import React from "react";
import ReactDOM from "react-dom/client";

const App = () => <div style={{ width: "100vw", height: "100vh", zIndex: -1 }}>테스트</div>;

const container = document.getElementById("wrap") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(<App />);
