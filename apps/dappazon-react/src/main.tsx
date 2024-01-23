import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AccountContextProvider } from "./components/AccountContextProvider/AccountContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AccountContextProvider>
      <App />
    </AccountContextProvider>
  </React.StrictMode>
);
