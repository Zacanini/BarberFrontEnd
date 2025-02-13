// services/graficosService.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`
  }
});

const GraficosService = {
  buscarAgendasPorBarberEMes: async (idBarber, mes) => {
    try {
      const response = await api.get(`/agendas/barber/${idBarber}/${mes}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar agendas do barbeiro');
    }
  },

  calcularVariacaoAgendas: async (idBarber) => {
    try {
      const response = await api.get(`/comparar/agendas/${idBarber}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao calcular variação de agendas');
    }
  },

  buscarServicoMaisEfetuado: async (idBarber, mes) => {
    try {
      const response = await api.get(`/servico/mais-efetuado/${idBarber}/${mes}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar serviço mais efetuado');
    }
  },

  buscarAgendasPorShopEMes: async (idShop, mes) => {
    try {
      const response = await api.get(`/agendas/shop/${idShop}/${mes}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar agendas da barbearia');
    }
  },

  compararServicosBarbeiros: async (idShop, mes) => {
    try {
      const response = await api.get(`/comparar/servicos/${idShop}/${mes}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao comparar serviços dos barbeiros');
    }
  },

  buscarServicoMaisVendidoPorShop: async (idShop) => {
    try {
      const response = await api.get(`/servico/mais-vendido/${idShop}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar serviço mais vendido');
    }
  },

  buscarServicosMarcadosPorUsuario: async (idUser) => {
    try {
      const response = await api.get(`/servicos/marcados/${idUser}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar serviços do usuário');
    }
  }
};

export default GraficosService;