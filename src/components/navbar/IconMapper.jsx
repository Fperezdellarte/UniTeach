import {
  Home,
  Info,
  Login,
  PersonAdd,
  Dashboard,
  Person,
} from "@mui/icons-material";

const IconMapper = ({ name }) => {
  const icons = {
    HomeIcon: <Home />,
    InfoIcon: <Info />,
    LoginIcon: <Login />,
    SignUpIcon: <PersonAdd />,
    DashboardIcon: <Dashboard />,
    PersonIcon: <Person />,
  };

  return icons[name] || null;
};

export default IconMapper;
