import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/authProvider';

export default function ProtectedRoute() {
  const { isAuthenticated, token } = useAuth();
  return isAuthenticated && token ? <Outlet /> : <Navigate to="/login" />;
}
