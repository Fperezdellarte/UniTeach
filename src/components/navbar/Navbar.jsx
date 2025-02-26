import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { HiOutlineMenu } from "react-icons/hi";
import { useAuth } from "../../contexts/authContext";
import Logo from "../../Assest/u3.png";
import { MobileMenu } from "./mobileMenu";
import { SearchBar } from "../searchBar/SearchBar";
import UserDropdown from "./UserDropdown";
import { menuItems } from "../../config/navbarConfig";
import IconMapper from "./IconMapper";
import { SwitchTheme } from "./SwitchTheme";

const NavbarMain = ({ onToggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openMenu, setOpenMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isAuthenticated } = useAuth();

  const allMenuItems = isAuthenticated
    ? [...menuItems.common, ...menuItems.private]
    : [...menuItems.common, ...menuItems.auth];

  let currentMenuItems = isMobile
    ? allMenuItems
    : allMenuItems.filter((item) => item.text !== "Perfil");

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
        background: "rgba(34, 74, 148, 0.8)",
        backdropFilter: "blur(1px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: "56px",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link to={isAuthenticated ? "/app/home" : "/"}>
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: "120px",
                height: "auto",
                padding: "8px 0",
              }}
            />
          </Link>

          {/* Center Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              gap: "2px",
            }}
          >
            {currentMenuItems.map((navItem) => (
              <Button
                key={navItem.text}
                component={Link}
                to={navItem.link}
                startIcon={<IconMapper name={navItem.icon} />}
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontSize: "15px",
                  fontWeight: "500",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.14)",
                  },
                  "& .MuiButton-startIcon": {
                    color: "white",
                    marginRight: "5px",
                    "& svg": {
                      fontSize: "29.5px",
                    },
                  },
                }}
              >
                {navItem.text}
              </Button>
            ))}
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, md: 2 },
              marginLeft: "auto",
            }}
          >
            {isAuthenticated && !isMobile && (
              <>
                <SearchBar />
                <UserDropdown sx={{ display: { xs: "none", md: "flex" } }} />
              </>
            )}

            <IconButton
              color="inherit"
              onClick={() => setOpenMenu(true)}
              sx={{
                display: { xs: "flex", md: "none" },
                color: "white",
              }}
            >
              <HiOutlineMenu />
            </IconButton>
          </Box>

          {/* Theme Switch - Only visible on desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              mr: 1,
            }}
          >
            <SwitchTheme />
          </Box>
        </Toolbar>
      </Container>

      <MobileMenu
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        menuItems={currentMenuItems}
        darkMode={isDarkMode}
        onDarkModeToggle={handleThemeChange}
      />
    </AppBar>
  );
};

export default NavbarMain;
