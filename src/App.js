import { RouterProvider } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useTheme } from "./contexts/themeContext";
import { routerConfig } from "./config/routes";
import { useAuth } from "./contexts/authContext";
import { CssBaseline, GlobalStyles } from "@mui/material";

function App() {
  const { theme } = useTheme();
  const { loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "#root": {
            flex: 0,
          },
        }}
      />
      <RouterProvider router={routerConfig} />
    </MuiThemeProvider>
  );
}

export default App;
