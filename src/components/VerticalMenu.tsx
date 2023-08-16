import { Menu, Label, Input } from "semantic-ui-react";

const VerticalMenu = () => {
  return (
    <Menu vertical fluid>
      <Menu.Item>
        <Input icon="search" placeholder="Quick search..." />
      </Menu.Item>
      <Menu.Item name="inbox">
        <Label color="teal">1</Label>
        Inbox
      </Menu.Item>
      <Menu.Item name="spam">
        <Label>51</Label>
        Spam
      </Menu.Item>

      <Menu.Item name="updates">
        <Label>1</Label>
        Updates
      </Menu.Item>
    </Menu>
  );
};

export default VerticalMenu;
