// src/services/authService.js
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AuthService = {
  // Função para iniciar o login com Google
  loginWithGoogle: (role) => {
    window.location.href = `${API_URL}/auth/google?role=${role}`;
  },

// Função para extrair o token e as informações do usuário da URL
handleLoginRedirect: () => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get('token');

    const user = JSON.parse(decodeURIComponent(params.get('user') || '{}'));

    if (token && user) {
        localStorage.setItem('jwt', token); // Armazena o token no localStorage
        localStorage.setItem('user', JSON.stringify(user)); // Armazena as informações do usuário
        return { token, user };
    }

    return null;
},

  // Função para fazer logout
  logout: () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redireciona para a página de login
  },
};

export default AuthService;