import React from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronDown } from 'react-icons/fa';

const NavbarDropdown = ({ onLogout }) => {
  const dropdownIconStyle = {
    color: '#eeeaea', // Cambia el color a tu preferencia
  };

  return (
    <Dropdown alignRight>
      <Dropdown.Toggle as="a" id="dropdown-basic">
        <FaChevronDown style={dropdownIconStyle} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/profile">Perfil</Dropdown.Item>
        <Dropdown.Item href="#/Turnos">Turnos</Dropdown.Item>
        <Dropdown.Item onClick={onLogout}>Cerrar sesión</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NavbarDropdown;
