import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components";
import { AddEmployee, Employees, Login, Register, ShowStatus } from "../pages";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/",
        element: <Employees />
      },
      {
        path: "/employee/add",
        element: <AddEmployee />
      },
      {
        path: "/status/:status",
        element: <ShowStatus />
      }
    ]
  }
]);