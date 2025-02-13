import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/authContext";
import { ClassesProvider } from "./contexts/classesContext";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { SearchProvider } from "./contexts/searchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ClassesProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </ClassesProvider>
  </AuthProvider>
);
