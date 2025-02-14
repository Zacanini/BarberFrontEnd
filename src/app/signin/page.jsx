"use client";

import { useEffect } from 'react';
import AOS from 'aos';
import '@fontsource/oswald';
import 'aos/dist/aos.css';
import { FcGoogle } from 'react-icons/fc';
import AuthService from '../../services/AuthService';

export default function SignInPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 30,
    });

    // Verifica se já está autenticado
    const token = AuthService.checkAuthToken();
    if (token) {
      window.location.href = '/login-success';
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

  return (
    <div style={{ 
      minHeight: '100vh', 
      fontFamily: 'Oswald, sans-serif',
      backgroundColor: '#daa520',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '40px'
    }}>
      <div style={{ backgroundColor: '#ff7c20', borderRadius: '10px', padding: '20px', boxShadow: '0 18px 36px rgba(0,0,0,0.2)', marginBottom: '40px' }}>
        <img
          style={{ 
            width: '500px',
            marginBottom: '40px'
          }}
          src="/logo.svg"
          alt="Logo"
          data-aos="fade-down"
          data-aos-delay="150"
        />

        <div 
          style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          width: '100%',
          maxWidth: '500px',
          alignItems: 'center',
          }}>
          <button
            onClick={() => AuthService.loginWithGoogle('shop')}
            style={{...buttonStyle}}
            data-aos="zoom-in"
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = buttonHoverStyle.boxShadow;
              e.currentTarget.style.transform = buttonHoverStyle.transform;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = buttonStyle.boxShadow;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FcGoogle size={24} style={{ marginRight: '12px' }} />
            Entrar como Barbeiro
          </button>
          <button
            onClick={() => AuthService.loginWithGoogle('user')}
            style={{...buttonStyle}}
            data-aos="zoom-in"
            data-aos-delay="200"
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = buttonHoverStyle.boxShadow;
              e.currentTarget.style.transform = buttonHoverStyle.transform;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = buttonStyle.boxShadow;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FcGoogle size={24} style={{ marginRight: '12px' }} />
            Entrar como Cliente
          </button>

        </div>

      </div>

    </div>
  );
}
