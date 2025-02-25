import React, { useState } from "react";
import { FormPerfilUsuario } from "./formPerfilUsuario/FormPerfilUsuario";
import {
  Container,
  Tab,
  Tabs,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export const PerfilUsuario = () => {
  const [tab, setTab] = useState("settings");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth={false} sx={{ p: 2, pb: 5, margin: 0 }}>
      <Box sx={{ textAlign: "center", p: 2 }}>
        <h2 className="perfilusuario-title">Configuracion</h2>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Tabs
          orientation={isMobile ? "horizontal" : "vertical"}
          value={tab}
          onChange={handleChange}
          aria-label="Tabs de perfil"
          sx={{
            borderRight: isMobile ? 0 : 1,
            borderBottom: isMobile ? 1 : 0,
            borderColor: "divider",
            pr: isMobile ? 0 : 5,
            pb: isMobile ? 2 : 0,
          }}
        >
          <Tab
            icon={<SettingsIcon />}
            iconPosition="start"
            value="settings"
            label="Cuenta"
          />
        </Tabs>
        <Box
          sx={{
            p: 3,
            boxShadow: "1px 1px 5px black",
            borderRadius: 2,
            flexGrow: 1,
            minHeight: 500,
            maxWidth: isMobile ? "100%" : "77%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {tab === "settings" && <FormPerfilUsuario />}
        </Box>
      </Box>
    </Container>
  );
};
