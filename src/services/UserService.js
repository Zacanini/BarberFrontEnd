// services/userService.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`
  }
});

const UserService = {
  criarUser: async (dadosUser) => {
    try {
      const response = await api.post('/users', dadosUser);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao criar usuário');
    }
  },

  listarUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao listar usuários');
    }
  },

  obterUserPorId: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Usuário não encontrado');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao obter usuário');
    }
  },

  atualizarUser: async (id, dadosAtualizados) => {
    try {
      const response = await api.put(`/users/${id}`, dadosAtualizados);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Usuário não encontrado para atualização');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao atualizar usuário');
    }
  },

  deletarUser: async (id) => {
    try {
      await api.delete(`/users/${id}`);
      return true;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Usuário não encontrado para exclusão');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao deletar usuário');
    }
  }
};

export default UserService;