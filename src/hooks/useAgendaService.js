// src/hooks/useAgendaService.js
import { useContext, useMemo } from 'react';
import { AuthContext } from '../app/context/AuthContext';
import AgendaService from '../services/AgendaService';

const useAgendaService = () => {
  const { token } = useContext(AuthContext);

  return useMemo(() => ({
    criarAgenda: async (dadosAgenda) => await AgendaService.criarAgenda(dadosAgenda, token),
    listarAgendas: async () => await AgendaService.listarAgendas(token),
    obterAgendaPorId: async (id) => await AgendaService.obterAgendaPorId(id, token),
    atualizarAgenda: async (id, dadosAtualizados) => await AgendaService.atualizarAgenda(id, dadosAtualizados, token),
    deletarAgenda: async (id) => await AgendaService.deletarAgenda(id, token),
  }), [token]); // Memoize com dependência do token
};

export default useAgendaService;