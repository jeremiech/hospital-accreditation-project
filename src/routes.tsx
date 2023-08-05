import Home from "@/pages/Home";
import About from "@/pages/About";
import Dashboard from "@/pages/dashboard/index";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

export default routes;
