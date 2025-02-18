import { useContext , useMemo } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import ServicoService from "../services/ServicoService";

const useServicoService = () => {
    const {token} = useContext(AuthContext);

    return useMemo(() => ({
        listarServicos: async () => await ServicoService.listarServicos(token),
        criarServico: async (dadosServico) => await ServicoService.criarServico(dadosServico, token),
        atualizarServico: async (id, dadosAtualizados) => await ServicoService.atualizarServico(id, dadosAtualizados, token),
        deletarServico: async (id) => await ServicoService.deletarServico(id, token),
        obterServicoPorId: async (id) => await ServicoService.obterServicoPorId(id, token)
    }), [token]);
}

export default useServicoService;