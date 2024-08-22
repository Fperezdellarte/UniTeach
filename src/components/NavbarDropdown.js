import React from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaAngleDown, FaUser, FaSignOutAlt } from 'react-icons/fa'; // Importa los íconos adicionales
import { Avatar } from '@mui/material';

const NavbarDropdown = ({ onLogout, userImage }) => {
  const dropdownButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '5px',
  };

  const dropdownIconStyle = {
    color: '#fff',
    fontSize: '1.5rem',
    marginLeft: '0.1em',
    transition: 'transform 0.2s ease-in-out',
  };

  const avatarStyle = {
    width: '3em',
    height: '3em',
    transition: 'transform 0.2s ease-in-out',
  };

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const iconStyle = {
    marginRight: '8px',
  };

  return (
    <Dropdown>
      <Dropdown.Toggle as="div" id="dropdown-basic" style={dropdownButtonStyle} className="dropdown-toggle-custom">
        <Avatar alt="User Avatar" src={userImage} style={avatarStyle} className="avatar-hover" />
        <FaAngleDown style={dropdownIconStyle} className="icon-hover" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-custom">
        <Dropdown.Item href="#/profile" style={menuItemStyle}>
          <FaUser style={iconStyle} /> Perfil
        </Dropdown.Item>
        <Dropdown.Item onClick={onLogout} style={menuItemStyle}>
          <FaSignOutAlt style={iconStyle} /> Cerrar sesión
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavbarDropdown;

