import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const MenuBar = () => {
  return (
    <Menu pointing secondary size="massive" color="pink">
      <Menu.Item name="Home" as={NavLink} to="/" exact />
      <Menu.Menu position="right">
        <Menu.Item name="Login" as={NavLink} to="/login" />
        <Menu.Item name="Register" as={NavLink} to="/register" />
      </Menu.Menu>
    </Menu>
  );
};

export default MenuBar;
