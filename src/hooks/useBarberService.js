import { useContext , useMemo } from "react";
import { AuthContext } from "../app/context/AuthContext";
import BarberService from "../services/BarberService";

const useBarberService = () => {
    const { token } = useContext(AuthContext);
    
    return useMemo(() => ({
        criarBarber: async (dadosBarber) => await BarberService.criarBarber(dadosBarber, token),
        listarBarbers: async () => await BarberService.listarBarbers(token),
        obterBarberPorId: async (id) => await BarberService.obterBarberPorId(id, token),
        atualizarBarber: async (id, dadosAtualizados) => await BarberService.atualizarBarber(id, dadosAtualizados, token),
        deletarBarber: async (id) => await BarberService.deletarBarber(id, token),
    }), [token]); // Memoize com dependência do token
    };

export default useBarberService;