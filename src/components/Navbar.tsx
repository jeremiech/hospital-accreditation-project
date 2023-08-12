import { useState } from "react";
import { Input, Menu, Segment } from "semantic-ui-react";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState<string>("home");

  return (
    <Segment inverted style={{ borderRadius: 0 }}>
      <Menu stackable inverted secondary>
        <Menu.Item header>HOSPITAL ACCREDITATION</Menu.Item>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={() => setActiveItem("home")}
        />
        <Menu.Item
          name="messages"
          active={activeItem === "messages"}
          onClick={() => setActiveItem("messages")}
        />
        <Menu.Item
          name="friends"
          active={activeItem === "friends"}
          onClick={() => setActiveItem("friends")}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={() => setActiveItem("logout")}
          />
        </Menu.Menu>
      </Menu>
    </Segment>
  );
};

export default Navbar;
