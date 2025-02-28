import { useContext, useMemo } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import UserService from '@/services/UserService';

const useUserService = () => {
    const { token } = useContext(AuthContext);

    return useMemo(() => ({
        // Correção dos nomes dos métodos para corresponder ao serviço
        listUsers: async () => await UserService.listarUsers(token),
        createUser: async (userData) => await UserService.criarUser(userData, token),
        updateUser: async (id, updatedData) => await UserService.atualizarUser(id, updatedData, token),
        deleteUser: async (id) => await UserService.deletarUser(id, token),
        getUserById: async (id) => await UserService.obterUserPorId(id, token)
    }), [token]);
}

export default useUserService;