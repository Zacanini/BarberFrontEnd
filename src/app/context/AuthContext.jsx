import { createContext, useState, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import { jwtDecode } from 'jwt-decode'; // Import corrigido

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const loadUserFromToken = () => {
      const authToken = AuthService.checkAuthToken();
      if (authToken) {
        try {
          const decodedToken = jwtDecode(authToken); // Use jwtDecode aqui
          setUser(decodedToken);
          setToken(authToken);
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
          AuthService.logout();
        }
      }
      setIsAuthReady(true);
    };

    loadUserFromToken();
  }, []);

  const login = (authToken) => {
    try {
      const decodedToken = jwtDecode(authToken); // Use jwtDecode aqui
      setUser(decodedToken);
      setToken(authToken);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    AuthService.logout();
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthReady
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};