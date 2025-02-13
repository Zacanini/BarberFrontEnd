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
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      let user = {};
  
      try {
        user = JSON.parse(decodeURIComponent(params.get('user') || '{}'));
      } catch (error) {
        console.error('Erro ao converter o usuário:', error);
        return null;
      }
  
      // Verifica se o token existe e se o usuário tem as propriedades esperadas
      if (token && Object.keys(user).length > 0) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        console.log(`token: ${localStorage.getItem('token')}`);
        console.log(`user: ${localStorage.getItem('user')}`);
        
        return { token, user };
      }
      
      return null;
    } catch (error) {
      console.error('Erro durante o login redirect:', error);
      return null;
    }
  },
  

  // Função para fazer logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/signin'; // Redireciona para a página de login
  },
};

export default AuthService;