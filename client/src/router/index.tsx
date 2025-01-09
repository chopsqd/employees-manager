import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components";
import { Employees, Login, Register } from "../pages";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Employees />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      }
    ]
  }
]);