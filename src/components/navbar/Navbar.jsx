import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Box,
  Button,
  Switch,
  styled,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { HiOutlineMenu } from "react-icons/hi";
import { useAuth } from "../../auth/authProvider";
import Logo from "../../Assest/u3.png";
import { MobileMenu } from "./mobileMenu";
import { SearchBar } from "../searchBar/SearchBar";
import UserDropdown from "./UserDropdown";
import { menuItems } from "../../config/navbarConfig";
import IconMapper from "./IconMapper";

// Switch personalizado
const ThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#8796A5',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#003892',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#8796A5',
    borderRadius: 20 / 2,
  },
}));

const NavbarMain = ({ onToggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openMenu, setOpenMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isAuthenticated } = useAuth();

  const currentMenuItems = isAuthenticated
    ? [...menuItems.common, ...menuItems.private]
    : [...menuItems.common, ...menuItems.auth];

  const handleThemeChange = (event) => {
    setIsDarkMode(event.target.checked);
    if (onToggleTheme) {
      onToggleTheme();
    }
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{
        background: 'rgba(34, 74, 148, 0.8)',
        backdropFilter: 'blur(1px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{ 
            minHeight: '56px',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo */}
          <Link to={isAuthenticated ? "/app/home" : "/"}>
            <img
              src={Logo}
              alt="Logo"
              style={{ 
                width: '120px',
                height: 'auto',
                padding: '8px 0'
              }}
            />
          </Link>

          {/* Center Navigation */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              gap: '2px'
            }}
          >
            {currentMenuItems.map((navItem) => (
              <Button
                key={navItem.text}
                component={Link}
                to={navItem.link}
                startIcon={<IconMapper name={navItem.icon} />}
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  fontSize: '15px',
                  fontWeight: '500',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.14)'
                  },
                  '& .MuiButton-startIcon': {
                    color: 'white',
                    marginRight: '5px',
                    '& svg': {
                      fontSize: '29.5px'
                    }
                  }
                }}
              >
                {navItem.text}
              </Button>
            ))}
          </Box>

          {/* Right Section */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: { xs: 1, md: 2 },
              marginLeft: 'auto'
            }}
          >
            {isAuthenticated && (
              <>{
              
              isMobile? (""):
              (
              <><SearchBar/>
                  <UserDropdown sx={{ display: { xs: 'none', md: 'flex' } }} />
                  </>
                )} 
              </>
            )}
            {/* Switch solo en desktop */}
            <ThemeSwitch
              checked={isDarkMode}
              onChange={handleThemeChange}
              sx={{ 
                display: { xs: 'none', md: 'block' },
                mr: { xs: 1, md: 2 },
                transform: { xs: 'scale(0.8)', md: 'scale(1)' }
              }}
            />
             
            <IconButton
              color="inherit"
              onClick={() => setOpenMenu(true)}
              sx={{ 
                display: { xs: 'flex', md: 'none' },
                color: 'white'
              }}
            >
              <HiOutlineMenu />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <MobileMenu
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        menuItems={currentMenuItems}
        // Nuevos props para controlar el tema
        darkMode={isDarkMode}
        onDarkModeToggle={handleThemeChange}
      />
    </AppBar>
  );
};

export default NavbarMain;