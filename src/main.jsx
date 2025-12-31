import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import App from "./App";
import "./index.css";
import NotifificationProvider from "./contexts/notificationContext";
import AuthContextProvider from "./contexts/authContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotifificationProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </NotifificationProvider>
  </QueryClientProvider>
);
