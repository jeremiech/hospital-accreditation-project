import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Menu stackable inverted style={{ borderRadius: 0 }}>
      <Container>
        <Menu.Item header>
          <img alt="logo" src={logo} style={{ marginRight: "1em" }} />
          Clinical Care of Patient
        </Menu.Item>
        <Menu.Item name="home" onClick={() => navigate("/")} />
        <Menu.Item name="dashboard" onClick={() => navigate("/dashboard")} />
        <Menu.Item name="about" onClick={() => navigate("/about")} />
        <Menu.Item name="contact" onClick={() => navigate("/contact")} />
        <Menu.Menu position="right">
          <Menu.Item name="login" onClick={() => navigate("/login")} />
          <Menu.Item name="register" onClick={() => navigate("/register")} />
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Navbar;
