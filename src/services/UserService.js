// services/userService.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  }
});

const UserService = {
  criarUser: async (dadosUser , token) => {
    try {
      const response = await api.post('/users', dadosUser , {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao criar usuário');
    }
  },

  listarUsers: async (token) => {
    try {
      const response = await api.get('/users' , {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao listar usuários');
    }
  },

  obterUserPorId: async (id , token) => {
    try {
      const response = await api.get(`/users/${id}` , {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Usuário não encontrado');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao obter usuário');
    }
  },

  atualizarUser: async (id, dadosAtualizados , token) => {
    try {
      const response = await api.put(`/users/${id}`, dadosAtualizados , {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Usuário não encontrado para atualização');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao atualizar usuário');
    }
  },

  deletarUser: async (id , token) => {
    try {
      await api.delete(`/users/${id}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
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