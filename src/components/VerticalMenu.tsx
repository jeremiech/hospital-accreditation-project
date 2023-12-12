// import { VerticalMenu } from "./VerticalMenu.1";
import user from "@/assets/user.png";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { AuthState } from "@/store/slice/AuthSlice";
import { Menu, Sidebar, Label, Image, Header } from "semantic-ui-react";

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
    <Sidebar as={Menu} visible vertical inverted>
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
        <strong style={{ paddingLeft: 10 }}>Mr User</strong>
      </Menu.Item>
      <Menu.Item name="home" onClick={() => navigate("/")}>
        Home
      </Menu.Item>
      <Menu.Item name="dashboard" onClick={() => navigate("/dashboard")}>
        Dashboard
      </Menu.Item>
                <Menu.Item name="patients" onClick={() => navigate("/patient")}>
            {metrics && <Label color="teal">{metrics?.patients}</Label>}
            Patients
          </Menu.Item>
                <Menu.Item>
        {metrics && <Label color="blue">{metrics?.forms}</Label>}
        <Menu.Header>Consent Forms</Menu.Header>
        <Menu.Menu>
          <Menu.Item name="Admission Form" onClick={() => navigate("/form")} />
          <Menu.Item
            name="Anaesthesia Consent Form"
            onClick={() => navigate("/form")}
          />
          <Menu.Item
            name="Surgery Consent Form"
            onClick={() => navigate("/form")}
          />
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item name="forms" onClick={() => navigate("/form")}>
        {metrics && <Label color="green">{metrics?.formResponses}</Label>}
        Form Responses
      </Menu.Item>
      <Menu.Item name="care plan" onClick={() => navigate("/patient")}>
        {metrics && <Label color="orange">{metrics?.carePlans}</Label>}
        Care Plan
      </Menu.Item>
      <Menu.Item>
        {metrics && <Label color="violet">{metrics?.users}</Label>}
        <Menu.Header>Users</Menu.Header>
        <Menu.Menu>
          <Menu.Item name="doctors" onClick={() => navigate("/user/doctor")} />
          <Menu.Item name="nurses" onClick={() => navigate("/user/nurse")} />
          <Menu.Item name="all users" onClick={() => navigate("/user")} />
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item name="log out">Log out</Menu.Item>
    </Sidebar>
  );
};

export default VerticalMenu;
