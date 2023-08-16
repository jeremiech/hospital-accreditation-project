import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard";
import Register from "@/pages/auth/Register";
import AllPatients from "@/pages/patient/all";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/login", element: <Login /> },
  { path: "/contact", element: <Contact /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/patient", element: <AllPatients /> },
]);

export default routes;
