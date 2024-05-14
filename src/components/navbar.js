import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assest/Logo.png';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import SignUpIcon from "@mui/icons-material/PersonAdd";
import { HiOutlineMenu } from 'react-icons/hi';
import { Drawer, ListItem, ListItemIcon, ListItemText, Box, List } from '@mui/material';

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    
    {
      text: "Home",
      icon: <HomeIcon/>,
      link: "/"
    },
    {
      text: "Login",
      icon: <LoginIcon/>,
      link: "/login"
    },
    {
      text: "Registro",
      icon: <SignUpIcon />,
      link: "/signup"
    },
    {
      text: "About",
      icon: <InfoIcon />,
      link: "/about"
    },
  ];

  return (
    <div>
      <nav>
        <div className="nav-logo-container">
          <Link to="/"><img src={Logo} alt='' /></Link>
        </div>
        <div className="navbar-links-container">
          {menuOptions.map((option, index) => (
            <Link key={index} to={option.link}>{option.text}</Link>
          ))}
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

export default Navbar;
