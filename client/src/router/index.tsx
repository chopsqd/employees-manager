import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components";
import { AddEmployee, EditEmployee, EmployeeInfo, Employees, Login, Register, ShowStatus } from "../pages";

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
        path: "/employee/:id",
        element: <EmployeeInfo />
      },
      {
        path: "/employee/add",
        element: <AddEmployee />
      },
      {
        path: "/employee/edit/:id",
        element: <EditEmployee />
      },
      {
        path: "/status/:status",
        element: <ShowStatus />
      }
    ]
  }
]);