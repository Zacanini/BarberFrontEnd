// services/servicoService.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  }
});

const ServicoService = {
  criarServico: async (dadosServico, token) => {
    try {
      const response = await api.post('/servicos', dadosServico, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao criar serviço');
    }
  },

  listarServicos: async (token) => {
    try {
      const response = await api.get('/servicos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao listar serviços');
    }
  },

  obterServicoPorId: async (id, token) => {
    try {
      const response = await api.get(`/servicos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Serviço não encontrado');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao obter serviço');
    }
  },

  obterServicoPorIdShop: async (idBarber, token) => {
    try {
      const response = await api.get(`/servicos/shop/${idBarber}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Serviço de barbearia não encontrado');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao obter serviço da barbearia');
    }
  },

  atualizarServico: async (id, dadosAtualizados, token) => {
    try {
      const response = await api.put(`/servicos/${id}`, dadosAtualizados, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Serviço não encontrado para atualização');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao atualizar serviço');
    }
  },

  deletarServico: async (id, token) => {
    try {
      await api.delete(`/servicos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return true;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Serviço não encontrado para exclusão');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao deletar serviço');
    }
  }
};

export default ServicoService;