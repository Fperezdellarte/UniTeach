import React, { useEffect } from 'react';
import { FormularioLogin } from '../components/formularioLogin';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/authProvider';
import Navbar from '../components/navbar';

export const Login = () => {
  const auth = useAuth();

  useEffect(() => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      const parsedAuthData = JSON.parse(storedAuthData);
      auth.setIsAuthenticated(!!parsedAuthData.token); // Check if token exists
      auth.setUser(parsedAuthData.user || null);
      auth.setToken(parsedAuthData.token || null);
    }
  }, [auth]);

  const handleLoginSuccess = () => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      const parsedAuthData = JSON.parse(storedAuthData);
      auth.setIsAuthenticated(!!parsedAuthData.token);
      auth.setUser(parsedAuthData.user || null);
      auth.setToken(parsedAuthData.token || null);
    }
  };

  if (auth.isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <Navbar />
      <div className='formularioLogin'>
        <FormularioLogin onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
};

export default Login;
