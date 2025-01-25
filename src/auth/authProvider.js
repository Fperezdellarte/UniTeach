import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  handleLogin: () => {},
  handleLogout: () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedAuth = sessionStorage.getItem("authData");
        if (storedAuth) {
          const { token, user } = JSON.parse(storedAuth);
          setToken(token);
          setUser(user);
          setIsAuthenticated(!!token);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        sessionStorage.removeItem("authData");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleLogin = (authData) => {
    sessionStorage.setItem("authData", JSON.stringify(authData));
    setToken(authData.token);
    setUser(authData.user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authData");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        loading,
        handleLogin,
        handleLogout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
