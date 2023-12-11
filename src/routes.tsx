import Home from "@/pages/Home";
import About from "@/pages/About";
import NotFound from "@/pages/404";
import AllForms from "./pages/form";
import AllUsers from "@/pages/user";
import Contact from "@/pages/Contact";
import Login from "@/pages/auth/Login";
import AddForm from "./pages/form/add";
import EditForm from "./pages/form/edit";
import ViewForm from "./pages/form/view";
import AllPatients from "@/pages/patient";
import Dashboard from "./pages/Dashboard";
import Register from "@/pages/auth/Register";
import AddPatient from "@/pages/patient/add";
import EditPatient from "@/pages/patient/edit";
import ViewPatient from "@/pages/patient/view";
import { createBrowserRouter } from "react-router-dom";
import AllAdmissions from "./pages/form/admission";
import AddAdmission from "./pages/form/admission/add";
import EditAdmission from "./pages/form/admission/edit";
import ViewAdmission from "./pages/form/admission/view";
import AllAnaesthesia from "./pages/form/anaesthesia";
import AddAnaesthesia from "./pages/form/anaesthesia/add";
import EditAnaesthesia from "./pages/form/anaesthesia/edit";
import ViewAnaesthesia from "./pages/form/anaesthesia/view";
import AllSurgery from "./pages/form/surgery";
import AddSurgery from "./pages/form/surgery/add";
import EditSurgery from "./pages/form/surgery/edit";
import ViewSurgery from "./pages/form/surgery/view";

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
      { index: true, element: <AllForms /> },
      { path: "add", element: <AddForm /> },
      { path: "edit/:form", element: <EditForm /> },
      { path: "view/:form", element: <ViewForm /> },
      {
        path: "admission",
        children: [
          { index: true, element: <AllAdmissions /> },
          { path: "add", element: <AddAdmission /> },
          { path: "edit/:form", element: <EditAdmission /> },
          { path: "view/:form", element: <ViewAdmission /> },
        ],
      },
      {
        path: "anaesthesia",
        children: [
          { index: true, element: <AllAnaesthesia /> },
          { path: "add", element: <AddAnaesthesia /> },
          { path: "edit/:form", element: <EditAnaesthesia /> },
          { path: "view/:form", element: <ViewAnaesthesia /> },
        ],
      },
      {
        path: "surgery",
        children: [
          { index: true, element: <AllSurgery /> },
          { path: "add", element: <AddSurgery /> },
          { path: "edit/:form", element: <EditSurgery /> },
          { path: "view/:form", element: <ViewSurgery /> },
        ],
      },
    ],
  },
  {
    path: "user",
    children: [
      { index: true, element: <AllUsers /> },
      { path: "add", element: <AddPatient /> },
      { path: "nurse", element: <AllUsers filter="nurse" /> },
      { path: "doctor", element: <AllUsers filter="doctor" /> },
      { path: "edit/:user", element: <EditPatient /> },
      { path: "view/:user", element: <ViewPatient /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default routes;
