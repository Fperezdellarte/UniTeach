import { Switch } from "@mui/material";
import { useTheme } from "../../contexts/themeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export const SwitchTheme = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <>
      <LightModeIcon sx={{ color: "white", fontSize: 20 }} />
      <Switch
        checked={darkMode}
        onChange={toggleTheme}
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "#fff",
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#fff",
          },
        }}
      />
      <DarkModeIcon sx={{ color: "white", fontSize: 20 }} />
    </>
  );
};
