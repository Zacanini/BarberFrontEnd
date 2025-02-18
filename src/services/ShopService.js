// services/shopService.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  }
});

const ShopService = {
  criarShop: async (dadosShop , token) => {
    try {
      const response = await api.post('/shops', dadosShop , {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao criar barbearia');
    }
  },

  listarShops: async (token) => {
    try {
      const response = await api.get('/shops' , {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao listar barbearias');
    }
  },

  obterShopPorId: async (id , token) => {
    try {
      const response = await api.get(`/shops/${id}` , {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Barbearia não encontrada');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao obter barbearia');
    }
  },

  atualizarShop: async (id, dadosAtualizados , token) => {
    try {
      const response = await api.put(`/shops/${id}`, dadosAtualizados , {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Barbearia não encontrada para atualização');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao atualizar barbearia');
    }
  },

  deletarShop: async (id , token) => {
    try {
      await api.delete(`/shops/${id}` , {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
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