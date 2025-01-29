"use client";

import { useEffect } from 'react';
import Container from '@/components/landing/ContainerLandingComTextoEimg';
import ContainerDois from '@/components/landing/ContainerLandingComTextoEimg2';
import 'aos/dist/aos.css';
import AOS from 'aos';

// Importando a fonte Oswald
import '@fontsource/oswald';

export default function Page() {
    useEffect(() => {
        AOS.init({ duration: 1500 });
    }, []);

    const description = `
        Já pensou em transformar sua barbearia em uma experiência <span style="color: #daa520;"> digital, 
        personalizada e irresistível</span> para seus clientes? 
        Com a <span style="color: #daa520;">BARBERS.BR</span>, você cria a 
        sua <span style="color: #daa520;"> própria barbearia virtual </span> em minutos! Apresente seus serviços e produtos, 
        gerencie sua agenda sem complicações e conquiste novos clientes de forma prática 
        e profissional.
        Seu perfil exclusivo vem com um link compartilhável, seu cliente terá 
        acesso a sua barbearia em <span style="color: #daa520;"> um clique </span>, tornando mais fácil agendar cortes,
        conhecer sua marca e até acompanhar novidades. Além disso, você terá 
        acesso a métricas avançadas para entender seu negócio como nunca antes: 
        visualize seu crescimento, otimize estratégias e esteja sempre à frente 
        da concorrência.
    `;

    return (
        <div style={{ backgroundColor: '#daa520', minHeight: '100vh', fontFamily: 'Oswald, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <img style={{ width: '600px' }} src="/logo.svg" alt="Logo" data-aos="fade-down" />
            </div>
            <Container
                imgSrc="/cilindroBarber.svg"
                title=""
                description={description}
            />
            <ContainerDois
                imgSrc="/agendaBarber.svg"
                title=""
                description={description}
            />
            <Container
                imgSrc="/barber.svg"
                title=""
                description={description}
            />
            <ContainerDois
                imgSrc="/lupa.svg"
                title=""
                description={description}
            />
        </div>
    );
}