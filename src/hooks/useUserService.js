import {useContext , useMemo} from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import UserService from '@/services/UserService';

const useUserService = () => {

    const {token} = useContext(AuthContext);

    return useMemo(() =>({
        listUsers: async () => await UserService.listUsers(token),
        createUser: async (userData) => await UserService.createUser(userData, token),
        updateUser: async (id, updatedData) => await UserService.updateUser(id, updatedData, token),
        deleteUser: async (id) => await UserService.deleteUser(id, token),
        getUserById: async (id) => await UserService.getUserById(id, token)
    }), [token]);
}

export default useUserService;