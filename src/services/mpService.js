// services/mpService.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/mp`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`
  }
});

const MercadoPagoService = {
  criarPreferenciaBasic: async () => {
    try {
      const response = await api.post('/create-preference-basic');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar pagamento do plano Basic');
    }
  },

  criarPreferenciaMedium: async () => {
    try {
      const response = await api.post('/create-preference-medio');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar pagamento do plano Medium');
    }
  },

  criarPreferenciaPremium: async () => {
    try {
      const response = await api.post('/create-preference-premium');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar pagamento do plano Premium');
    }
  }
};

export default MercadoPagoService;