// services/agendaService.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`
  }
});

const AgendaService = {
  criarAgenda: async (dadosAgenda) => {
    try {
      const response = await api.post('/agendas', dadosAgenda);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao criar agenda');
    }
  },

  listarAgendas: async () => {
    try {
      const response = await api.get('/agendas');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao listar agendas');
    }
  },

  obterAgendaPorId: async (id) => {
    try {
      const response = await api.get(`/agendas/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao obter agenda');
    }
  },

  atualizarAgenda: async (id, dadosAtualizados) => {
    try {
      const response = await api.put(`/agendas/${id}`, dadosAtualizados);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao atualizar agenda');
    }
  },

  deletarAgenda: async (id) => {
    try {
      await api.delete(`/agendas/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao deletar agenda');
    }
  }
};

export default AgendaService;