import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assest/Logo.png';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import { HiOutlineMenu } from 'react-icons/hi';
import { Drawer, ListItem, ListItemIcon, ListItemText, Box, List, Button, Avatar, InputBase } from '@mui/material';
import { useAuth } from '../auth/authProvider';
import { useNavigate } from 'react-router-dom';

export const NavbarHome = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar la información de autenticación del almacenamiento local al cerrar sesión
    localStorage.removeItem('authData');
    // Limpiar la sesión del usuario
    auth.setIsAuthenticated(false);
    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login');
  };

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon/>,
      link: "/home"
    },
    {
      text: "About",
      icon: <InfoIcon />,
      link: "/about"
    },
  ];

  return (
    <div className="navbar-home"> {/* Cambia la clase aquí */}
      <nav>
        <div className="nav-logo-container">
          <Link to="/"><img src={Logo} alt='' /></Link>
        </div>
        <div className="navbar-links-container">
          {menuOptions.map((option, index) => (
            <Link key={index} to={option.link}>{option.text}</Link>
          ))}
        </div>
        <div className="navbar-search-container">
          {/* Aquí puedes agregar el componente de búsqueda */}
          <InputBase placeholder="Buscar..." />
        </div>
        <div className="navbar-user-container">
          {/* Visualización del nombre de usuario y la foto */}
          <Avatar className="user-avatar" /> {/* Agrega la clase para el avatar */}
          <span>{/* Aquí puedes pasar el nombre de usuario */}</span>
        </div>
        <div className="navbar-logout-container">
          {/* Botón de logout */}
          <Button onClick={handleLogout} variant="outlined">Logout</Button>
        </div>
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

export default NavbarHome;
