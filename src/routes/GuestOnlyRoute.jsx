import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const GuestOnlyRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/app/home" replace />;
  }

  return <Outlet />;
};

export default GuestOnlyRoute;
