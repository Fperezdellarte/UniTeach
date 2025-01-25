import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./auth/authProvider";
import { ClassesProvider } from "./contexts/classesContext";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ClassesProvider>
      <App />
    </ClassesProvider>
  </AuthProvider>
);
