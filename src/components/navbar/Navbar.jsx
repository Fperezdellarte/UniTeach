import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import { HiOutlineMenu } from "react-icons/hi";
import { useAuth } from "../../contexts/authContext";
import Logo from "../../Assest/Logo.png";
import { MobileMenu } from "./mobileMenu";
import { SearchBar } from "../searchBar/SearchBar";
import UserDropdown from "./UserDropdown";
import { menuItems } from "../../config/navbarConfig";
import IconMapper from "./IconMapper";

const NavbarMain = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isAuthenticated } = useAuth();

  const currentMenuItems = isAuthenticated
    ? [...menuItems.common, ...menuItems.private]
    : [...menuItems.common, ...menuItems.auth];

  return (
    <AppBar position="sticky" color="transparent" elevation={10}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Link to={isAuthenticated ? "/app/home" : "/"}>
            <img
              src={Logo}
              alt="Logo"
              className="nav-logo"
              style={{ width: "70px" }}
            />
          </Link>

          {/* Sección Central - Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              justifyItems: "center",
            }}
          >
            {currentMenuItems.map((navItem) => (
              <Button
                key={navItem.text}
                component={Link}
                to={navItem.link}
                startIcon={<IconMapper name={navItem.icon} />}
                sx={{
                  color: "inherit",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {navItem.text}
              </Button>
            ))}
          </Box>

          {/* Sección derecha - Solo para autenticados */}
          <div className="navbar-actions">
            {isAuthenticated && (
              <div style={{ display: "flex" }}>
                <SearchBar />
                <UserDropdown />
              </div>
            )}

            {/* Menú hamburguesa siempre visible */}
            <IconButton
              color="inherit"
              onClick={() => setOpenMenu(true)}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <HiOutlineMenu />
            </IconButton>
          </div>
        </Toolbar>
      </Container>

      <MobileMenu
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        menuItems={currentMenuItems}
      />
    </AppBar>
  );
};

export default NavbarMain;
