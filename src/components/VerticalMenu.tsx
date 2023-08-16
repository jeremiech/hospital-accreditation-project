import user from "@/assets/user.png";
import { useNavigate } from "react-router-dom";
import { Menu, Label, Image } from "semantic-ui-react";

const VerticalMenu = () => {
  const navigate = useNavigate();
  return (
    <Menu vertical fluid>
      <Menu.Item name="profile">
        <Image src={user} size="small" centered />
      </Menu.Item>
      <Menu.Item name="dashboard" onClick={() => navigate("/dashboard")}>
        Dashboard
      </Menu.Item>
      <Menu.Item name="patients">
        <Label color="teal">51</Label>
        Patients
      </Menu.Item>
      <Menu.Item name="forms">
        <Label color="blue">20</Label>
        Forms
      </Menu.Item>
      <Menu.Item name="care plan">
        <Label color="orange">3</Label>
        Care Plan
      </Menu.Item>
      <Menu.Item name="nurses">
        <Label>7</Label>
        Nurses
      </Menu.Item>
      <Menu.Item name="doctors">
        <Label>4</Label>
        Doctors
      </Menu.Item>
      <Menu.Item name="users">
        <Label>9</Label>
        All Users
      </Menu.Item>
      <Menu.Item name="log out">Log out</Menu.Item>
    </Menu>
  );
};

export default VerticalMenu;
