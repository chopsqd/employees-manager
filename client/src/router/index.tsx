import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components";
import { Login, Register } from "../pages";

export const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Login />
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