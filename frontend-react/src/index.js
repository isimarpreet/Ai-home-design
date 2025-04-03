import React from "react";
import ReactDOM from "react-dom/client";
import FirstPage from "./first"; // Import your new webpage component
import "./first.css"; // Import your styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirstPage />
  </React.StrictMode>
);
