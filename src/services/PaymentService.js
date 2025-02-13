// services/paymentService.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`
  }
});

const PaymentService = {
  criarPayment: async (dadosPayment) => {
    try {
      const response = await api.post('/payments', dadosPayment);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao criar pagamento');
    }
  },

  listarPayments: async () => {
    try {
      const response = await api.get('/payments');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao listar pagamentos');
    }
  },

  obterPaymentPorId: async (id) => {
    try {
      const response = await api.get(`/payments/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Pagamento não encontrado');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao obter pagamento');
    }
  },

  atualizarPayment: async (id, dadosAtualizados) => {
    try {
      const response = await api.put(`/payments/${id}`, dadosAtualizados);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Pagamento não encontrado para atualização');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao atualizar pagamento');
    }
  },

  deletarPayment: async (id) => {
    try {
      await api.delete(`/payments/${id}`);
      return true;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Pagamento não encontrado para exclusão');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao deletar pagamento');
    }
  }
};

export default PaymentService;