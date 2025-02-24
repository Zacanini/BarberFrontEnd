// services/barberService.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  }
});

const BarberService = {
  criarBarber: async (dadosBarber,token) => {
    try {
      const response = await api.post('/barbers', dadosBarber, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao criar barbeiro');
    }
  },

  listarBarbers: async (token) => {
    try {
      const response = await api.get('/barbers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao listar barbeiros');
    }
  },

  obterBarberPorId: async (id , token) => {
    try {
      const response = await api.get(`/barbers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao obter barbeiro');
    }
  },
  obterBarberPorIdShop: async (idShop , token) => {
    try {
      const response = await api.get(`barbers/shop/${idShop}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao obter barbeiro');
    }
  },

  atualizarBarber: async (id, dadosAtualizados , token) => {
    try {
      const response = await api.put(`/barbers/${id}`, dadosAtualizados , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao atualizar barbeiro');
    }
  },

  deletarBarber: async (id , token) => {
    try {
      await api.delete(`/barbers/${id}` , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao deletar barbeiro');
    }
  }
};

export default BarberService;