// src/utils/auth.js
const auth = {
  isAuthenticated: () => {
    const token = localStorage.getItem('jwt');
    return !!token; // Retorna true se o token existir
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default auth;