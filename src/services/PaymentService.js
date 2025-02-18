// services/paymentService.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  }
});

const PaymentService = {
  criarPayment: async (dadosPayment, token) => {
    try {
      const response = await api.post('/payments', dadosPayment, {
        header: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao criar pagamento');
    }
  },

  listarPayments: async (token) => {
    try {
      const response = await api.get('/payments', {
        header: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Erro ao listar pagamentos');
    }
  },

  obterPaymentPorId: async (id, token) => {
    try {
      const response = await api.get(`/payments/${id}`, {
        header: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Pagamento não encontrado');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao obter pagamento');
    }
  },

  atualizarPayment: async (id, dadosAtualizados , token) => {
    try {
      const response = await api.put(`/payments/${id}`, dadosAtualizados , {
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Pagamento não encontrado para atualização');
      }
      throw new Error(error.response?.data?.mensagem || 'Erro ao atualizar pagamento');
    }
  },

  deletarPayment: async (id , token) => {
    try {
      await api.delete(`/payments/${id}` , {
        header:
        {
          Authorization: `Bearer ${token}`,
        }
      });
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