import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: "sans-serif",
        },

        palette: {
          mode: darkMode ? "dark" : "light",
          ...(darkMode
            ? {
                primary: { main: "#1976d2" },
                secondary: { main: "#ce93d8" },
                background: { default: "#0d1f34", paper: "#1e1e1e" },
              }
            : {
                primary: { main: "#1976d2" },
                secondary: { main: "#9c27b0" },
                background: { default: "#d3e8ff", paper: "#ffffff" },
              }),
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: (themeParam) => `
        body {
          background-color: ${themeParam.palette.background.default};
        }
      `,
          },
        },
      }),
    [darkMode]
  );

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
