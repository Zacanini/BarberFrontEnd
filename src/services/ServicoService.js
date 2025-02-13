// services/servicoService.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`
  }
});

const ServicoService = {
  criarServico: async (dadosServico) => {
    try {
      const response = await api.post('/servicos', dadosServico);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao criar serviço');
    }
  },

  listarServicos: async () => {
    try {
      const response = await api.get('/servicos');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao listar serviços');
    }
  },

  obterServicoPorId: async (id) => {
    try {
      const response = await api.get(`/servicos/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Serviço não encontrado');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao obter serviço');
    }
  },

  atualizarServico: async (id, dadosAtualizados) => {
    try {
      const response = await api.put(`/servicos/${id}`, dadosAtualizados);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Serviço não encontrado para atualização');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao atualizar serviço');
    }
  },

  deletarServico: async (id) => {
    try {
      await api.delete(`/servicos/${id}`);
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