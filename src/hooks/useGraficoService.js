import { useContext, useMemo } from "react";
import { AuthContext } from "../app/context/AuthContext";
import GraficosService from "../services/GraficoService";

const useGraficoService = () => {
  const { token } = useContext(AuthContext);

  return useMemo(
    () => ({
      buscarAgendasPorBarberEMes: async (idBarber, mes) =>
        await GraficosService.buscarAgendasPorBarberEMes(idBarber, mes, token),
      calcularVariacaoAgendas: async (idBarber) =>
        await GraficosService.calcularVariacaoAgendas(idBarber, token),
      buscarServicoMaisEfetuado: async (idBarber, mes) =>
        await GraficosService.buscarServicoMaisEfetuado(idBarber, mes, token),
      buscarAgendasPorShopEMes: async (idShop, mes) =>
        await GraficosService.buscarAgendasPorShopEMes(idShop, mes, token),
      compararServicosBarbeiros: async (idShop, mes) =>
        await GraficosService.compararServicosBarbeiros(idShop, mes, token),
      buscarServicoMaisVendidoPorShop: async (idShop) =>
        await GraficosService.buscarServicoMaisVendidoPorShop(idShop, token),
      buscarServicosMarcadosPorUsuario: async (idUser) =>
        await GraficosService.buscarServicosMarcadosPorUsuario(idUser, token),
    }),
    [token]
  );
};

export default useGraficoService;