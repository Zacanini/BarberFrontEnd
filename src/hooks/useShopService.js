import { useContext , useMemo } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import ShopService from "@/services/ShopService";

const useShopService = () => {
    const {token} = useContext(AuthContext);

    return useMemo(() => ({
        listarShops: async () => await ShopService.listarShops(token),
        criarShop: async (dadosShop) => await ShopService.criarShop(dadosShop, token),
        atualizarShop: async (id, dadosAtualizados) => await ShopService.atualizarShop(id, dadosAtualizados, token),
        deletarShop: async (id) => await ShopService.deletarShop(id, token),
        obterShopPorId: async (id) => await ShopService.obterShopPorId(id, token)
    }), [token]);
}

export default useShopService;