import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <div>404 not found</div>,
  },
]);