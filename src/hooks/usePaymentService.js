import { useContext , useMemo } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import PaymentService from "../services/PaymentService";

const usePaymentService = () => {
    const { token } = useContext(AuthContext);

    return useMemo(() => ({
        createPayment: async (data) => await PaymentService.criarPayment(data, token),
        listPayments: async () => await PaymentService.listarPayments(token),
        getPaymentById: async (id) => await PaymentService.obterPaymentPorId(id, token),
        updatePayment: async (id, data) => await PaymentService.atualizarPayment(id, data, token),
        deletePayment: async (id) => await PaymentService.deletarPayment(id, token)
    }), [token]);
}
export default usePaymentService;