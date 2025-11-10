import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";

// HashRouter is used here because it works better with the remote development environment. 
// https://reactrouter.com/6.30.1/router-components/hash-router
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

// Typically, BrowserRouter is a better choice.
// https://reactrouter.com/6.30.1/router-components/browser-router
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <HashRouter>
//       <App />
//     </HashRouter>
//   </React.StrictMode>
// );
