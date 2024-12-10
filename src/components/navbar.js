import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, ListItem, ListItemIcon, ListItemText, Box, List, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { HiOutlineMenu } from 'react-icons/hi';
import { useAuth } from '../auth/authProvider';
import { handleLogout } from '../auth/logout';
import { useBuscador } from './buscador';
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
  const [searchError, setSearchError] = useState(false);
  const { searchTerm, setSearchTerm, error, handleSearch } = useBuscador();
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  
  useEffect(() => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    
    if (authData && authData.user) {
      if (authData.user.Name) {
        setUserName(authData.user.Name);
      }
      if (authData.user.Avatar_URL) {
        setUserImage(authData.user.Avatar_URL);
      }
    }
  }, []);
  
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
      setSearchError(true);
    } else {
      setSearchError(false);
      handleSearch(null);
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
              <NavbarDropdown onLogout={handleLogout} userName={userName} userImage={userImage} />
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




