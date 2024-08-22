import React from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaAngleDown, FaUser, FaSignOutAlt } from 'react-icons/fa'; // Importa los íconos adicionales
import { Avatar } from '@mui/material';

const NavbarDropdown = ({ onLogout }) => {
  const dropdownButtonStyle = {
    backgroundColor: 'transparent', // Fondo transparente
    border: 'none',
    display: 'flex',
    color: 'transparent',
    alignItems: 'center',
    cursor: 'pointer', // Cambia el cursor para que parezca un botón interactivo
    padding: '5px', // Ajusta el padding para centrar
  };

  const dropdownIconStyle = {
    color: '#fff', // Color del ícono
    fontSize: '1.5rem', // Tamaño inicial del ícono
    marginLeft: '0.1em', // Espacio entre el avatar y el ícono
    transition: 'transform 0.2s ease-in-out', // Animación suave para el hover
  };

  const avatarStyle = {
    width: '3em', // Ancho del avatar
    height: '3em', // Altura del avatar
    transition: 'transform 0.2s ease-in-out', // Animación suave para el hover
  };

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const iconStyle = {
    marginRight: '8px', // Espacio entre el ícono y el texto
  };

  return (
    <Dropdown>
      <Dropdown.Toggle as="div" id="dropdown-basic" style={dropdownButtonStyle} className="dropdown-toggle-custom">
        <Avatar alt="User Avatar" src="/path-to-avatar-image.jpg" style={avatarStyle} className="avatar-hover" />
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
}

export default NavbarDropdown;

