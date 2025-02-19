"use client";

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Loading from '../../components/Loading';
import styles from '../../styles/DashBoard.module.css';
import { FiLogOut } from 'react-icons/fi';
import useUserService from '@/hooks/useUserService';
import useShopService from '@/hooks/useShopService';
import BarberAdd from '../../components/dashBoard/BarberAdd';
import NavBar from '../../components/NavBar';

const DashBoard = () => {
    const userService = useUserService();
    const shopService = useShopService();
    const [userLoged, setUserLoged] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token, isAuthReady, user, logout, isTokenExpired } = useContext(AuthContext);
    const router = useRouter();

    const getUser = useCallback(async () => {
        if (user.role === 'shop') {
            try {
                const data = await shopService.obterShopPorId(user.id);
                setUserLoged(data);
            } catch (error) {
                setError(error.message);
            }
        }
        if (user.role === 'user') {
            try {
                const data = await userService.getUserById(user.id);
                setUserLoged(data);
            } catch (error) {
                setError(error.message);
            }
        }
    }, [user, shopService, userService]);

    useEffect(() => {
        if (!isAuthReady) return;
      
        // Verifica se o token existe e não está expirado
        if (!token || isTokenExpired(token)) {
          router.push('/signin'); // Redireciona para a página de login
          return;
        }
        // Se o token for válido, busca os dados do usuário
        getUser();
      }, [token, isAuthReady, router, getUser]);

    const handleLogout = () => {
        logout();
        router.push('/pages/signin');
    };

    if (!isAuthReady) {
        return <Loading />;
    }

    return (
        <div className={styles.dashboardContainer}>
            <NavBar />
            {loading && (
                <div className={styles.loadingOverlay}>
                    <Loading />
                </div>
            )}

            <div className={styles.header}>
                <h1 className={styles.welcomeMessage}>
                    Bem-vindo, {userLoged.nome}!
                </h1>
                <div className={styles.controls}>
                    <button
                        className={styles.logoutButton}
                        onClick={handleLogout}
                    >
                        <FiLogOut size={18} />
                        Sair
                    </button>
                </div>
            </div>

            <BarberAdd userLoged={userLoged} />
        </div>
    );
};

export default DashBoard;