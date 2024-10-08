import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Drawer, ListItem, ListItemIcon, ListItemText, Box, List, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { HiOutlineMenu } from 'react-icons/hi';
import { useAuth } from '../auth/authProvider';
import axios from 'axios';
import { API_URL } from '../auth/constans';
import { useBuscador } from './buscador'; // Importa el hook y el componente de resultados
import Logo from '../Assest/Logo.png';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import SignUpIcon from "@mui/icons-material/PersonAdd";
import NavbarDropdown from './NavbarDropdown';
import '../styles/navbarHome.css';

export const Navbar = () => {
  const auth = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [searchError, setSearchError] = useState(false); // Nuevo estado para el error de búsqueda
  const { searchTerm, setSearchTerm, error, handleSearch } = useBuscador();

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
        { text: "Inicio", icon: <HomeIcon />, link: "/home" },
        { text: "Nosotros", icon: <InfoIcon />, link: "/about" }
      ]
    : [
        { text: "Inicio", icon: <HomeIcon />, link: "/" },
        { text: "Inicio sesion", icon: <LoginIcon />, link: "/login" },
        { text: "Registro", icon: <SignUpIcon />, link: "/signup" },
        { text: "Nosotros", icon: <InfoIcon />, link: "/about" }
      ];

  const handleSearchClick = () => {
    if (searchTerm.trim() === '') {
      setSearchError(true); // Mostrar error si no hay texto
    } else {
      setSearchError(false); // Ocultar error si hay texto
      handleSearch();
    }
  };

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

        {auth.isAuthenticated && (
          <>
            <div className="navbar-search-container">
              <InputBase
                placeholder={searchError ? "Busca Una Materia" : "Buscar materia..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                className={searchError ? "search-error" : ""}
                sx={{
                  border: searchError ? '2px solid red' : 'none',
                  borderRadius: '4px',
                  padding: '8px',
                }}
              />
              <IconButton onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>
            </div>
            <div className="navbar-user-container">
              <NavbarDropdown onLogout={handleLogout} />
            </div>
          </>
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
      {error && <p>{error}</p>}
    </div>
  );
};

export default Navbar;

