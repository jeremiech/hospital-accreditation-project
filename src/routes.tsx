import Home from "@/pages/Home";
import About from "@/pages/About";
import NotFound from "@/pages/404";
import Contact from "@/pages/Contact";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard";
import AllPatients from "@/pages/patient";
import Register from "@/pages/auth/Register";
import AddPatient from "@/pages/patient/add";
import EditPatient from "@/pages/patient/edit";
import ViewPatient from "@/pages/patient/view";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  { index: true, element: <Home /> },
  { path: "about", element: <About /> },
  { path: "login", element: <Login /> },
  { path: "contact", element: <Contact /> },
  { path: "register", element: <Register /> },
  { path: "dashboard", element: <Dashboard /> },
  {
    path: "patient",
    children: [
      { index: true, element: <AllPatients /> },
      { path: "add", element: <AddPatient /> },
      { path: "edit/:patient", element: <EditPatient /> },
      { path: "view/:patient", element: <ViewPatient /> },
    ],
  },
  {
    path: "form",
    children: [
      { index: true, element: <AllPatients /> },
      { path: "add", element: <AddPatient /> },
      { path: "edit/:form", element: <EditPatient /> },
      { path: "view/:form", element: <ViewPatient /> },
    ],
  },
  {
    path: "user",
    children: [
      { index: true, element: <AllPatients /> },
      { path: "add", element: <AddPatient /> },
      { path: "edit/:user", element: <EditPatient /> },
      { path: "view/:user", element: <ViewPatient /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default routes;
