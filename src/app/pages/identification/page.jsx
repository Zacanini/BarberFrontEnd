"use client"
import { useContext, useEffect } from 'react';
import AOS from 'aos';
import '@fontsource/oswald';
import 'aos/dist/aos.css';
import { FcGoogle } from 'react-icons/fc';
import AuthService from '../../../services/AuthService';
import { AuthContext } from '@/app/context/AuthContext';

export default function IdentificationPage() {
    const { isAuthReady, token ,isTokenExpired} = useContext(AuthContext);
    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: true,
          offset: 30,
        });
    
       
        if (!token || isTokenExpired(token)) {
          window.location.href = '/pages/signin'; // Redireciona para a página de login
        }
      }, []);
    
      const buttonStyle = {
        color: '#030303',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        padding: '12px 24px',
        cursor: 'pointer',
        fontSize: '1.2rem',
        fontFamily: 'Oswald, sans-serif',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        width: '100%',
        justifyContent: 'center',
        position: 'relative', // para posicionamento do pseudo-elemento
        overflow: 'hidden',   // garante que o contorno animado não extrapole os limites
      };
    
      const buttonHoverStyle = {
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        transform: 'scale(1.05)',
      };
      
    return(
        <div>
            ola 
        </div>
    )
}