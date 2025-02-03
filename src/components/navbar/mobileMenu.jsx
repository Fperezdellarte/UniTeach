import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Divider,
  Typography,
  styled,
  Button,
  Switch,
  Slide,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import { Link } from "react-router-dom";
import IconMapper from "./IconMapper"; // Importación faltante
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useAuth } from "../../contexts/authContext"; // Asegurar que la ruta sea correcta
import { SearchBar } from "../searchBar/SearchBar";

// Componentes estilizados (deben estar definidos antes de su uso)
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiBackdrop-root": {
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(5, 5, 5, 0.2)",
  },
  "& .MuiDrawer-paper": {
    width: 280,
    background: "rgba(107, 108, 110, 0.7)",
    backdropFilter: "blur(20px)",
    color: "white",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important",
  },
}));

const UserSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const ThemeToggle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  margin: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const AnimatedListItem = styled(ListItem)(({ theme, delay }) => ({
  borderRadius: "8px",
  margin: theme.spacing(0, 1),
  animation: `${slideIn} 0.3s ease-out ${delay}ms both`,
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15) !important",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
}));

export const MobileMenu = ({
  open,
  onClose,
  menuItems,
  darkMode,
  onDarkModeToggle,
  userProfile = {
    name: "Usuario",
    email: "usuario@ejemplo.com",
    avatar: null,
  },
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <StyledDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      TransitionComponent={Slide}
      transitionDuration={300}
      ModalProps={{
        keepMounted: true,
      }}
    >
      {isAuthenticated ? (
        <UserSection>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mb: 1,
              border: "2px solid",
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
            src={userProfile.avatar}
          >
            {userProfile.name.charAt(0)}
          </Avatar>
          <Typography variant="subtitle1" sx={{ color: "white" }}>
            {userProfile.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            {userProfile.email}
          </Typography>
        </UserSection>
      ) : (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="subtitle1" sx={{ color: "white", mb: 2 }}>
            ¡Bienvenido!
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button variant="contained" color="primary">
              Iniciar sesión
            </Button>
            <Button variant="outlined" color="white">
              Registrarse
            </Button>
          </Box>
        </Box>
      )}
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
      <SearchBar />

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
      <List>
        {menuItems.map((item, index) => (
          <AnimatedListItem
            key={index}
            button
            component={Link}
            to={item.link}
            onClick={onClose}
            delay={index * 50}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <IconMapper name={item.icon} />
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: 500,
                variant: "body1",
              }}
            />
          </AnimatedListItem>
        ))}
      </List>

      <Divider sx={{ mt: "auto", borderColor: "rgba(7, 7, 7, 0.04)" }} />

      <ThemeToggle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DarkModeIcon sx={{ color: "white" }} />
          <Typography variant="body2" sx={{ color: "white" }}>
            Modo oscuro
          </Typography>
        </Box>
        <Switch
          checked={darkMode}
          onChange={onDarkModeToggle}
          color="primary"
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(7, 6, 6, 0.1)",
              },
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "8796A5#",
            },
          }}
        />
      </ThemeToggle>
    </StyledDrawer>
  );
};
