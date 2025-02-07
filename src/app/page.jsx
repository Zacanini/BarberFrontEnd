"use client";

import { useEffect } from 'react';
import AOS from 'aos';
import '@fontsource/oswald';
import 'aos/dist/aos.css';
import { FcGoogle } from 'react-icons/fc';
import AuthService from '../services/AuthService';
import auth from '../auth/auth';

export default function Page() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 30,
        });
    }, []);

    useEffect(() => {
        const loginData = AuthService.handleLoginRedirect();
        if (loginData) {
            console.log('Login realizado com sucesso:', loginData.user);
            window.location.href = '/dashboard';
        }
    }, []);

    const handleLogin = () => {
        AuthService.loginWithGoogle('shop');
    };

    const handleScroll = () => {
        const nextSection = document.getElementById('content-section');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div style={{ minHeight: '100vh', fontFamily: 'Oswald, sans-serif' }}>
            <div style={{
                backgroundColor: '#daa520',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                position: 'relative'
            }}>
                <img
                    style={{ width: '600px' }}
                    src="/logo.svg"
                    alt="Logo"
                    data-aos="fade-down"
                    data-aos-delay="150"
                />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: '5px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        animation: 'bounce 2s infinite',
                        fontSize: '3rem',
                        cursor: 'pointer',
                        textAlign: 'center'
                    }}
                    data-aos="fade-down"
                    data-aos-delay="150"
                    onClick={handleScroll}
                >
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#030303"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                    <div style={{
                        fontSize: '1rem',
                        color: '#030303',
                        marginTop: '10px',
                        fontWeight: 'bold',
                        textTransform: 'none'
                    }}>
                        Clique para ver mais
                    </div>
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#030303"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            <div
                id="content-section"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    backgroundColor: '#0D0907',
                    padding: '20px 0'
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '0 2%',
                    textAlign: 'center',
                    width: '100%'
                }}>
                    <h1 style={textStyle} data-aos="fade-right" data-aos-delay="300">
                        <span style={titleStyle}>
                            TRANSFORME SUA BARBEARIA EM UMA EXPERIÊNCIA DIGITAL ÚNICA !
                        </span>
                        Já imaginou oferecer aos seus clientes uma experiência personalizada,
                        prática e profissional, tudo em poucos cliques? Com a BARBERS.BR,
                        você cria sua própria barbearia virtual em minutos!
                        Apresente seus serviços, gerencie sua agenda sem complicações e
                        conquiste novos clientes de forma eficiente.
                    </h1>

                    <h1 style={textStyle} data-aos="fade-left" data-aos-delay="300">
                        <span style={titleStyle}>
                            SEU PERFIL EXCLUSIVO COM LINK COMPARTILHAVEL !
                        </span>
                        Seus clientes acessam sua barbearia com um único clique!
                        Agendamentos de cortes, conhecimento da sua marca e acompanhamento
                        de novidades ficam mais fáceis do que nunca. Além disso, você terá
                        acesso a métricas avançadas para entender seu negócio como nunca antes:
                        visualize seu crescimento, otimize estratégias e fique sempre à frente
                        da concorrência.
                    </h1>

                    <h1 style={textStyle} data-aos="fade-right" data-aos-delay="300">
                        <span style={titleStyle}>
                            AGENDA ONLINE: PRATICIDADE E ORGANIZAÇÃO
                        </span>
                        Diga adeus à confusão e ao improviso! Com nossa agenda online, seus clientes visualizam horários disponíveis, escolhem serviços e agendam com facilidade. Para você, barbeiro, é mais clareza e controle: veja todos os compromissos do dia, acompanhe sua carga de trabalho e receba notificações para não perder nada. É praticidade para os clientes e eficiência para o seu negócio.
                    </h1>

                    <h1 style={textStyle} data-aos="fade-left" data-aos-delay="300">
                        <span style={titleStyle}>
                            UM SISTEMA PARA TODA A EQUIPE
                        </span>
                        Para barbearias com mais de um barbeiro, a BARBERS.BR é a solução perfeita! Adicione sua equipe à plataforma e cada um terá sua agenda personalizada, mantendo a organização completa em um único lugar. Mais controle para a equipe, mais clareza para os clientes e a certeza de uma experiência incrível para todos.
                    </h1>

                    <h1 style={textStyle} data-aos="fade-right" data-aos-delay="300">
                        <span style={titleStyle}>
                            CONHEÇA SEU NEGÓCIO COMO NUNCA ANTES
                        </span>
                        Descubra o poder das métricas avançadas e leve sua gestão a outro patamar! Acompanhe o desempenho da sua barbearia em detalhes: faturamento semanal, mensal e anual, clientes mais frequentes, taxa de cancelamentos e serviços mais procurados. Tome decisões estratégicas com base em dados reais e cresça com confiança.
                    </h1>

                    <h1 style={textStyle} data-aos="fade-left" data-aos-delay="300">
                        <span style={titleStyle}>
                            SUA BARBEARIA DIGITAL COMEÇA AQUI
                        </span>
                        Está na hora de dar o próximo passo! Crie agora mesmo seu perfil personalizado, organize sua agenda, acompanhe métricas detalhadas e ofereça uma experiência incrível aos seus clientes. Tudo isso de forma simples e em poucos cliques. Não fique para trás – escolha um dos planos abaixo e tenha acesso à sua barbearia online personalizada!
                    </h1>
                </div>
            </div>

            <div style={{
                backgroundColor: '#0D0907',
                padding: '50px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }} data-aos="fade-up">
                <h1 style={{
                    ...titleStyle,
                    fontSize: '3rem',
                    maxWidth: '80%',
                    margin: '0 auto 40px'
                }}>
                    CADASTRE-SE AGORA EM NOSSO APLICATIVO E APROVEITE <span style={{ fontSize: '3.2rem', color: 'white' }}> 7 DIAS GRÁTIS</span> SEM COMPROMISSO!
                </h1>

                <button
                    onClick={handleLogin}
                    style={{
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
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    data-aos="zoom-in"
                    data-aos-delay="200"
                >
                    <FcGoogle size={24} style={{ marginRight: '12px', }} />
                    Cadastre-se com Google
                </button>
            </div>

            <style>
                {`
                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% {
                            transform: translateY(0) translateX(-50%);
                        }
                        40% {
                            transform: translateY(-20px) translateX(-50%);
                        }
                        60% {
                            transform: translateY(-10px) translateX(-50%);
                        }
                    }
                `}
            </style>
        </div>
    );
}

const textStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0 0 4% 0',
    textAlign: 'justify',
    width: '87%',
    color: '#ffffff',
    lineHeight: '1.6',
    textTransform: 'uppercase',
};

const titleStyle = {
    color: '#daa520',
    fontSize: '3.2rem',
    display: 'block',
    marginBottom: '2%'
};