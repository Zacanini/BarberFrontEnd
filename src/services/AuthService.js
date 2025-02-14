// src/services/authService.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AuthService = {
  loginWithGoogle: (role) => {
    window.location.href = `${API_URL}/auth/google?role=${role}`;
  },

  checkAuthToken: () => {
    if (typeof window === 'undefined') return null;
    
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(c => c.trim().startsWith('authToken='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  },

  logout: () => {
    window.location.href = `${API_URL}/logout`;
  },
};

export default AuthService;