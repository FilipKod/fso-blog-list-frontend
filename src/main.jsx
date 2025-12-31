import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import axios from "axios";
import App from "./App";
import "./index.css";
import NotifificationProvider from "./contexts/notificationContext";
import AuthContextProvider from "./contexts/authContext";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      setTimeout(() => {
        window.localStorage.removeItem("loggedAppUser");
        window.location.href = "/";
      }, 5000);
    }
    return Promise.reject(error);
  }
);

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
