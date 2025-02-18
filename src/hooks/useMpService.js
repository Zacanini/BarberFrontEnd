import {useContext , useMemo} from 'react';
import { AuthContext } from '@/app/context/AuthContext';  
import MpService from '../services/mpService';

const useMpService = () => {
    const {token} = useContext(AuthContext);

    return useMemo(() =>({
        basicPreference: async () => await MpService.criarPreferenciaBasic(token),
        mediumPreference: async () => await MpService.criarPreferenciaMedium(token),
        premiumPreference: async () => await MpService.criarPreferenciaPremium(token)
    }), [token]);
}
export default useMpService;