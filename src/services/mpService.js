// services/mpService.js
import axios from 'axios';
import { headers } from 'next/headers';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/mp`,
  headers: {
    'Content-Type': 'application/json',
  }
});

const MercadoPagoService = {
  criarPreferenciaBasic: async (token) => {
    try {
      const response = await api.post('/create-preference-basic' , {
        headers: {
          Authorization:`Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar pagamento do plano Basic');
    }
  },

  criarPreferenciaMedium: async (token) => {
    try {
      const response = await api.post('/create-preference-medio',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar pagamento do plano Medium');
    }
  },

  criarPreferenciaPremium: async (token) => {
    try {
      const response = await api.post('/create-preference-premium',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar pagamento do plano Premium');
    }
  }
};

export default MercadoPagoService;