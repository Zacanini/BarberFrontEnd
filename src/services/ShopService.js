// services/shopService.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`
  }
});

const ShopService = {
  criarShop: async (dadosShop) => {
    try {
      const response = await api.post('/shops', dadosShop);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao criar barbearia');
    }
  },

  listarShops: async () => {
    try {
      const response = await api.get('/shops');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao listar barbearias');
    }
  },

  obterShopPorId: async (id) => {
    try {
      const response = await api.get(`/shops/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Barbearia não encontrada');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao obter barbearia');
    }
  },

  atualizarShop: async (id, dadosAtualizados) => {
    try {
      const response = await api.put(`/shops/${id}`, dadosAtualizados);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Barbearia não encontrada para atualização');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao atualizar barbearia');
    }
  },

  deletarShop: async (id) => {
    try {
      await api.delete(`/shops/${id}`);
      return true;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Barbearia não encontrada para exclusão');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao deletar barbearia');
    }
  }
};

export default ShopService;