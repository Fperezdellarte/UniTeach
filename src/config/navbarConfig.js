export const menuItems = {
  common: [
    { text: "Inicio", icon: "HomeIcon", link: "/" },
    { text: "Nosotros", icon: "InfoIcon", link: "/about" },
  ],
  auth: [
    { text: "Iniciar sesión", icon: "LoginIcon", link: "/auth/login" },
    { text: "Registro", icon: "SignUpIcon", link: "/auth/signup" },
  ],
  private: [
    { text: "Dashboard", icon: "DashboardIcon", link: "/app/home" },
    { text: "Perfil", icon: "PersonIcon", link: "/app/perfil" },
  ],
};

export const searchConfig = {
  placeholder: "Buscar materia...",
  errorMessage: "Busca Una Materia",
};
