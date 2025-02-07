import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = `${process.env.API_URL}/agendas`;

const AgendaService = {
  criarAgenda: async (agendaData) => {
    try {
      const response = await axios.post(API_URL, agendaData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar agenda:", error);
      throw error;
    }
  },

  listarAgendas: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar agendas:", error);
      throw error;
    }
  },

  obterAgendaPorId: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter agenda com ID ${id}:`, error);
      throw error;
    }
  },

  atualizarAgenda: async (id, agendaData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, agendaData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar agenda com ID ${id}:`, error);
      throw error;
    }
  },

  deletarAgenda: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error(`Erro ao deletar agenda com ID ${id}:`, error);
      throw error;
    }
  }
};

export default AgendaService;