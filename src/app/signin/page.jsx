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

    const loginData = AuthService.handleLoginRedirect();
    if (loginData) {
      console.log('Login realizado com sucesso:', loginData.user);
      window.location.href = '/login-sucess';
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
    position: 'relative', // para posicionamento relativo do ponto
    overflow: 'hidden',   // evita que a animação extrapole os limites
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

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        width: '100%',
        maxWidth: '500px',
        alignItems: 'center'
      }}>
        <button
          onClick={() => AuthService.loginWithGoogle('shop')}
          style={buttonStyle}
          className="animated-button"
          data-aos="zoom-in"
        >
          <FcGoogle size={24} style={{ marginRight: '12px' }} />
          Entrar como Barbeiro
          <span className="moving-dot"></span>
        </button>

        <button
          onClick={() => AuthService.loginWithGoogle('user')}
          style={buttonStyle}
          className="animated-button"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <FcGoogle size={24} style={{ marginRight: '12px' }} />
          Entrar como Cliente
          <span className="moving-dot"></span>
        </button>
      </div>

      <style jsx>{`
        /* O ponto (e seu rastro) ficam invisíveis até o hover */
        .animated-button .moving-dot {
          position: absolute;
          width: 13px;
          height: 10px;
          border-radius: 50%;
          background: black;
          opacity: 0;
          /* Garantir que o ponto fique com o centro na posição definida */
          transform: translate(-50%, -50%);
          /* Animação com duração total de 4s */
          animation: moveDot 4s linear infinite;
        }
        .animated-button:hover .moving-dot {
          opacity: 1;
        }
        /* Pseudo-elemento para o rastro com blur e leve atraso */
        .animated-button .moving-dot::after {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: black;
          filter: blur(3px);
          opacity: 0.8;
          transform: translate(-50%, -50%);
          animation: moveDot 4s linear infinite;
          animation-delay: 0.3s;
        }
        /* 
          Animação para mover o ponto:
          - Os trechos horizontais (topo e base) duram 37,5% do ciclo cada (1,5s)
          - Os trechos verticais (direita e esquerda) duram 12,5% cada (0,5s)
          As posições definem o centro do ponto exatamente nos cantos.
        */
        @keyframes moveDot {
          0% {
            left: 0;
            top: 0;
          }
          37.5% {
            left: 100%;
            top: 0;
          }
          50% {
            left: 100%;
            top: 100%;
          }
          87.5% {
            left: 0;
            top: 100%;
          }
          100% {
            left: 0;
            top: 0;
          }
        }
      `}</style>
    </div>
  );
}
