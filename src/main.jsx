import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routing } from "./routing.jsx";
import { ProSidebarProvider } from "react-pro-sidebar";
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
  <SnackbarProvider>
    <ProSidebarProvider>
    <RouterProvider router={routing} />
    </ProSidebarProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
