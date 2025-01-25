import React from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaAngleDown, FaUser } from "react-icons/fa"; // Importa los íconos adicionales
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const NavbarDropdown = ({ onLogout, userName, userImage }) => {
  const navigate = useNavigate();

  const dropdownButtonStyle = {
    color: "transparent",
    border: "none",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "5px",
  };

  const dropdownIconStyle = {
    color: "",
    fontSize: "1.5rem",
    marginLeft: "0.1em",
    transition: "transform 0.2s ease-in-out",
  };

  const avatarStyle = {
    width: "3em",
    height: "3em",
    transition: "transform 0.2s ease-in-out",
  };

  const menuItemStyle = {
    display: "flex",
    alignItems: "center",
  };

  const iconStyle = {
    marginRight: "8px",
  };

  const handleProfileClick = () => {
    navigate("/perfil"); // Redirige al perfil
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        as="div"
        id="dropdown-basic"
        style={dropdownButtonStyle}
        className="dropdown-toggle-custom"
      >
        <span
          className="fw-bold "
          style={{
            color: "white",
            margin: "1em",
            transition: "transform 0.2 ease-in-out",
          }}
        >
          {userName}
        </span>
        <Avatar
          alt="User Avatar"
          src={userImage}
          style={avatarStyle}
          className="avatar-hover"
        />
        <FaAngleDown style={dropdownIconStyle} className="icon-hover" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-custom">
        <Dropdown.Item onClick={handleProfileClick} style={menuItemStyle}>
          <FaUser style={iconStyle} /> Perfil
        </Dropdown.Item>
        <Dropdown.Item style={menuItemStyle}>
          <LogoutButton />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavbarDropdown;
