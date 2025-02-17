// services/agendaService.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  }
});

const AgendaService = {
  criarAgenda: async (dadosAgenda, token) => {
    try {
      const response = await api.post('/agendas', dadosAgenda, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao criar agenda');
    }
  },

  listarAgendas: async (token) => {
    try {
      const response = await api.get('/agendas', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao listar agendas');
    }
  },

  obterAgendaPorId: async (id, token) => {
    try {
      const response = await api.get(`/agendas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao obter agenda');
    }
  },

  atualizarAgenda: async (id, dadosAtualizados, token) => {
    try {
      const response = await api.put(`/agendas/${id}`, dadosAtualizados, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao atualizar agenda');
    }
  },

  deletarAgenda: async (id, token) => {
    try {
      await api.delete(`/agendas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao deletar agenda');
    }
  }
};

export default AgendaService;