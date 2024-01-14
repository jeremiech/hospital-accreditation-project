import Home from "@/pages/Home";
import About from "@/pages/About";
import NotFound from "@/pages/404";
import AllForms from "./pages/form";
import AllUsers from "@/pages/user";
import Report from "@/pages/Report";
import Contact from "@/pages/Contact";
import Message from "./pages/Message";
import Login from "@/pages/auth/Login";
import AddForm from "./pages/form/add";
import EditForm from "./pages/form/edit";
import ViewForm from "./pages/form/view";
import EditUser from "@/pages/user/edit";
import ViewUser from "./pages/user/view";
import AllPatients from "@/pages/patient";
import Dashboard from "./pages/Dashboard";
import Register from "@/pages/auth/Register";
import AddPatient from "@/pages/patient/add";
import AllSurgery from "./pages/form/surgery";
import EditPatient from "@/pages/patient/edit";
import ViewPatient from "@/pages/patient/view";
import AddSurgery from "./pages/form/surgery/add";
import AllAdmissions from "./pages/form/admission";
import AllAnesthesia from "./pages/form/anesthesia";
import ViewSurgery from "./pages/form/surgery/view";
import EditSurgery from "./pages/form/surgery/edit";
import AddAdmission from "./pages/form/admission/add";
import { createBrowserRouter } from "react-router-dom";
import EditAdmission from "./pages/form/admission/edit";
import ViewAdmission from "./pages/form/admission/view";
import AddAnesthesia from "./pages/form/anesthesia/add";
import EditAnesthesia from "./pages/form/anesthesia/edit";
import ViewAnesthesia from "./pages/form/anesthesia/view";

const routes = createBrowserRouter([
  { index: true, element: <Home /> },
  { path: "about", element: <About /> },
  { path: "login", element: <Login /> },
  { path: "report", element: <Report /> },
  { path: "contact", element: <Contact /> },
  { path: "message", element: <Message /> },
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
          { path: "edit/:admission", element: <EditAdmission /> },
          { path: "view/:admission", element: <ViewAdmission /> },
        ],
      },
      {
        path: "anesthesia",
        children: [
          { index: true, element: <AllAnesthesia /> },
          { path: "add", element: <AddAnesthesia /> },
          { path: "edit/:anesthesia", element: <EditAnesthesia /> },
          { path: "view/:anesthesia", element: <ViewAnesthesia /> },
        ],
      },
      {
        path: "surgery",
        children: [
          { index: true, element: <AllSurgery /> },
          { path: "add", element: <AddSurgery /> },
          { path: "edit/:surgery", element: <EditSurgery /> },
          { path: "view/:surgery", element: <ViewSurgery /> },
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
      { path: "edit/:user", element: <EditUser /> },
      { path: "view/:user", element: <ViewUser /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default routes;
