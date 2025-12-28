import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { CssBaseline } from "@mui/material";
import App from "./App";
import store from "./store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </Provider>
);
