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
        if (isTokenExpired(authToken)) {
          console.log("Token expirado. Fazendo logout...");
          AuthService.logout(); // Faz logout se o token expirou
          return;
        }
        try {
          const decodedToken = jwtDecode(authToken);
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

  // Função para verificar se o token expirou
  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Tempo atual em segundos
      return decodedToken.exp < currentTime; // Token expirou se `exp` < tempo atual
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return true; // Considera o token inválido em caso de erro
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthReady,
    isTokenExpired
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};