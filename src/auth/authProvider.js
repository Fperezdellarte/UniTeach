import { useContext, createContext, useState } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  token: null,
  setIsAuthenticated: () => {},
  setUser: () => {},
  setToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, setIsAuthenticated, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export const useAuth = () => useContext(AuthContext);
