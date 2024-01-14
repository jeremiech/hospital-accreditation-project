import user from "@/assets/user.png";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { AuthState } from "@/store/slice/AuthSlice";
import { Menu, Label, Image, Header } from "semantic-ui-react";

interface MenuProps {
  metrics?: {
    users: number;
    forms: number;
    patients: number;
    carePlans: number;
    formResponses: number;
  };
}

const VerticalMenu = ({ metrics }: MenuProps) => {
  const navigate = useNavigate();
  const authState = useAppSelector((state: { auth: AuthState }) => state.auth);

  function capitalize(str: string): string {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <Menu
      vertical
      inverted
      id="sidebar"
      style={{ minHeight: "100vh", margin: 0, borderRadius: 0 }}
    >
      <Menu.Item name="header">
        <center>
          <img alt="logo" src={logo} width="80" height="86" />
        </center>
        <Header as="h4" textAlign="center" inverted style={{ marginTop: 10 }}>
          CLINICAL CARE OF PATIENT ANALYSIS SYSTEM
        </Header>
      </Menu.Item>
      <Menu.Item name="profile">
        <Image src={user} size="mini" verticalAlign="middle" />
        <strong style={{ paddingLeft: 10 }}>
          {capitalize(authState?.name)}
        </strong>
      </Menu.Item>
      <Menu.Item name="home" onClick={() => navigate("/")}>
        Home
      </Menu.Item>
      <Menu.Item name="dashboard" onClick={() => navigate("/dashboard")}>
        Dashboard
      </Menu.Item>
      {authState?.role == "patient" ? (
        <>
          <Menu.Item name="consent-form">Consent Forms</Menu.Item>
          <Menu.Item name="prescription">Prescriptions</Menu.Item>
        </>
      ) : (
        <Menu.Item name="report" onClick={() => navigate("/report")}>
          Reports
        </Menu.Item>
      )}
      {(authState?.role == "doctor" || authState?.role == "nurse") && (
        <>
          <Menu.Item name="patients" onClick={() => navigate("/patient")}>
            {metrics && <Label color="teal">{metrics?.patients}</Label>}
            Patients
          </Menu.Item>
          <Menu.Item>
            {metrics && <Label color="blue">{metrics?.forms}</Label>}
            <Menu.Header>Forms</Menu.Header>
            <Menu.Menu>
              <Menu.Item
                name="Admission Form"
                onClick={() => navigate("/form/admission")}
              />
              <Menu.Item
                name="Anesthesia Consent Form"
                onClick={() => navigate("/form/anesthesia")}
              />
              <Menu.Item
                name="Surgery Consent Form"
                onClick={() => navigate("/form/surgery")}
              />
              {/* <Menu.Item name="Other Form" onClick={() => navigate("/form")} /> */}
            </Menu.Menu>
          </Menu.Item>
          {/* <Menu.Item name="forms" onClick={() => navigate("/form")}>
            {metrics && <Label color="green">{metrics?.formResponses}</Label>}
            Form Responses
          </Menu.Item> */}
          <Menu.Item name="care plan" onClick={() => navigate("/patient")}>
            {metrics && <Label color="orange">{metrics?.carePlans}</Label>}
            Care Plan
          </Menu.Item>
        </>
      )}
      {authState?.role == "admin" && (
        <Menu.Item>
          {metrics && <Label color="violet">{metrics?.users}</Label>}
          <Menu.Header>Users</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name="doctors"
              onClick={() => navigate("/user/doctor")}
            />
            <Menu.Item name="nurses" onClick={() => navigate("/user/nurse")} />
            <Menu.Item name="all users" onClick={() => navigate("/user")} />
          </Menu.Menu>
        </Menu.Item>
      )}
      <Menu.Item name="message" onClick={() => navigate("/message")}>
        Message
      </Menu.Item>
      <Menu.Item name="log out" onClick={() => navigate("/")}>
        Log out
      </Menu.Item>
    </Menu>
  );
};

export default VerticalMenu;
