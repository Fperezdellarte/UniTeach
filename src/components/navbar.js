import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../auth/constans';
import Logo from '../Assest/Logo.png';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import SignUpIcon from "@mui/icons-material/PersonAdd";
import { HiOutlineMenu } from 'react-icons/hi';
import { Drawer, ListItem, ListItemIcon, ListItemText, Box, List, Avatar, InputBase } from '@mui/material';
import { useAuth } from '../auth/authProvider';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import NavbarDropdown from './NavbarDropdown'; // Importa tu NavbarDropdown
import '../styles/navbarHome.css';

export const Navbar = () => {
  const auth = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = async () => {
    // Mostrar un mensaje de confirmación
    const confirmLogout = window.confirm('¿Estás seguro de que deseas cerrar sesión?');

    // Si el usuario cancela, no hacer nada
    if (!confirmLogout) return;

    try {
      const authData = JSON.parse(localStorage.getItem('authData'));

      if (!authData || !authData.token) {
        throw new Error('Token no encontrado');
      }

      const token = authData.token;

      await axios.post(`${API_URL}/users/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Eliminar el token y otros datos de usuario del almacenamiento local
      localStorage.removeItem('authData');

      // Redirigir al usuario a la página de inicio de sesión
      <Navigate to="/login" />;

      window.location.reload();

      console.log('Usuario ha cerrado sesión');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const menuOptions = auth.isAuthenticated
    ? [
        { text: "Home", icon: <HomeIcon />, link: "/home" },
        { text: "About", icon: <InfoIcon />, link: "/about" }
      ]
    : [
        { text: "Home", icon: <HomeIcon />, link: "/" },
        { text: "Login", icon: <LoginIcon />, link: "/login" },
        { text: "Registro", icon: <SignUpIcon />, link: "/signup" },
        { text: "About", icon: <InfoIcon />, link: "/about" }
      ];

  return (
    <div className="navbar-home">
      <nav>
        <div className="nav-logo-container">
          <Link to={auth.isAuthenticated ? "/home" : "/"}><img src={Logo} alt="Logo" /></Link>
        </div>
        <div className="navbar-links-container">
          {menuOptions.map((option, index) => (
            <Link key={index} to={option.link}>{option.text}</Link>
          ))}
        </div>
        {/* Mostrar la barra de búsqueda solo si el usuario está autenticado */}
        {auth.isAuthenticated && (
          <div className="navbar-search-container">
            <InputBase placeholder="Buscar..." />
          </div>
        )}
        {auth.isAuthenticated && (
          <div className="navbar-user-container">
            <Avatar className="user-avatar" />
            <NavbarDropdown onLogout={handleLogout} />
          </div>
        )}
        <div className="navbar-menu-container">
          <HiOutlineMenu onClick={() => setOpenMenu(true)} />
        </div>
        <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
          <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpenMenu(false)} onKeyDown={() => setOpenMenu(false)}>
            <List>
              {menuOptions.map((item, index) => (
                <ListItem key={index} disablePadding button component={Link} to={item.link}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </nav>
    </div>
  );
};

export default Navbar;
