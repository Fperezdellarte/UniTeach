import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/authProvider";
import LoadingSpinner from "../components/loading/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingSpinner fullPage />;

  return isAuthenticated ? children : <Navigate to="auth/login" replace />;
};

export default ProtectedRoute;
