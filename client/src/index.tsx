import React from "react";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { router } from "./router";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);