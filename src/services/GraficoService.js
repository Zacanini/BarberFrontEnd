// services/graficosService.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  }
});

const GraficosService = {
  buscarAgendasPorBarberEMes: async (idBarber, mes , token) => {
    try {
      const response = await api.get(`/agendas/barber/${idBarber}/${mes}` , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar agendas do barbeiro');
    }
  },

  calcularVariacaoAgendas: async (idBarber , token) => {
    try {
      const response = await api.get(`/comparar/agendas/${idBarber}` , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao calcular variação de agendas');
    }
  },

  buscarServicoMaisEfetuado: async (idBarber, mes , token) => {
    try {
      const response = await api.get(`/servico/mais-efetuado/${idBarber}/${mes}` , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar serviço mais efetuado');
    }
  },

  buscarAgendasPorShopEMes: async (idShop, mes , token) => {
    try {
      const response = await api.get(`/agendas/shop/${idShop}/${mes}` , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar agendas da barbearia');
    }
  },

  compararServicosBarbeiros: async (idShop, mes , token) => {
    try {
      const response = await api.get(`/comparar/servicos/${idShop}/${mes}` , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao comparar serviços dos barbeiros');
    }
  },

  buscarServicoMaisVendidoPorShop: async (idShop , token) => {
    try {
      const response = await api.get(`/servico/mais-vendido/${idShop}` , {
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar serviço mais vendido');
    }
  },

  buscarServicosMarcadosPorUsuario: async (idUser , token) => {
    try {
      const response = await api.get(`/servicos/marcados/${idUser}` , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar serviços do usuário');
    }
  }
};

export default GraficosService;