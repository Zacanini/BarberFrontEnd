// services/barberService.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}'/api`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`
  }
});

const BarberService = {
  criarBarber: async (dadosBarber) => {
    try {
      const response = await api.post('/barbers', dadosBarber);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao criar barbeiro');
    }
  },

  listarBarbers: async () => {
    try {
      const response = await api.get('/barbers');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao listar barbeiros');
    }
  },

  obterBarberPorId: async (id) => {
    try {
      const response = await api.get(`/barbers/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao obter barbeiro');
    }
  },

  atualizarBarber: async (id, dadosAtualizados) => {
    try {
      const response = await api.put(`/barbers/${id}`, dadosAtualizados);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao atualizar barbeiro');
    }
  },

  deletarBarber: async (id) => {
    try {
      await api.delete(`/barbers/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao deletar barbeiro');
    }
  }
};

export default BarberService;