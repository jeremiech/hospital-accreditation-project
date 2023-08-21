import user from "@/assets/user.png";
import { useNavigate } from "react-router-dom";
import { Menu, Sidebar, Label, Image, Header } from "semantic-ui-react";

const VerticalMenu = () => {
  const navigate = useNavigate();
  return (
    <Sidebar as={Menu} visible vertical inverted>
      <Menu.Item name="header">
        <Header as="h3" textAlign="center" inverted>
          Hospital Activity
        </Header>
        <p style={{ textAlign: "center" }}>
          Organize patient's information. Create and update different forms,
          care plans, and so much more
        </p>
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
        <Label color="teal">51</Label>
        Patients
      </Menu.Item>
      <Menu.Item>
        <Menu.Header>Users</Menu.Header>
        <Menu.Menu>
          <Menu.Item name="doctors" onClick={() => navigate("/patient")} />
          <Menu.Item name="nurses" onClick={() => navigate("/patient")} />
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item name="forms" onClick={() => navigate("/patient")}>
        <Label color="blue">20</Label>
        Forms
      </Menu.Item>
      <Menu.Item name="care plan" onClick={() => navigate("/patient")}>
        <Label color="orange">3</Label>
        Care Plan
      </Menu.Item>
      <Menu.Item name="log out">Log out</Menu.Item>
    </Sidebar>
  );
};

export default VerticalMenu;
