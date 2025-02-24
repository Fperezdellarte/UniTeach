import {
  Drawer,
  Avatar,
  Box,
  Divider,
  Typography,
  styled,
  Button,
  Switch,
  Slide,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useAuth } from "../../contexts/authContext";
import { SearchBar } from "../searchBar/SearchBar";

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

const LogoutButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  background: "rgba(255, 255, 255, 0.2)",
  color: "white",
  transition: "transform 0.2s ease-in-out, background 0.3s",
  "&:hover": {
    background: "rgba(255, 0, 0, 0.7)",
    transform: "scale(1.05)",
  },
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

export const MobileMenu = ({ open, onClose, darkMode, onDarkModeToggle }) => {
  const { isAuthenticated, handleLogout, user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StyledDrawer
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
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
            src={user.Avatar_URL}
          ></Avatar>
          {user.Name}
          <Typography variant="subtitle1" sx={{ color: "white" }}>
            {user.Username}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            {""}
          </Typography>
          <LogoutButton
            variant="contained"
            onClick={() => {
              handleLogout();
              onClose();
              navigate("/");
            }}
          >
            Cerrar sesión
          </LogoutButton>
        </UserSection>
      ) : (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="subtitle1" sx={{ color: "white", mb: 2 }}>
            ¡Bienvenido!
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                onClose();
                navigate("/auth/login");
              }}
            >
              Iniciar sesión
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                onClose();
                navigate("/auth/signup");
              }}
            >
              Registrarse
            </Button>
          </Box>
        </Box>
      )}

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
      {isAuthenticated && (
        <div style={{ width: "80%", marginLeft: "30px" }}>
          <SearchBar />
        </div>
      )}

      <Divider sx={{ mt: "auto", borderColor: "rgba(7, 7, 7, 0.04)" }} />

      {/* Theme Toggle - Only visible on mobile */}
      {isMobile && (
        <ThemeToggle>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <DarkModeIcon sx={{ color: "white" }} />
              <Typography variant="body2" sx={{ color: "white" }}>
                Modo oscuro
              </Typography>
            </Box>
            <Switch
              checked={darkMode}
              onChange={onDarkModeToggle}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#fff",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#fff",
                },
              }}
            />
          </Box>
        </ThemeToggle>
      )}
    </StyledDrawer>
  );
};
