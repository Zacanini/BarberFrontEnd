"use client";
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Loading from '../../components/Loading';
import styles from '../../styles/DashBoard.module.css';
import { FiLogOut, FiEdit } from 'react-icons/fi';
import useUserService from '@/hooks/useUserService';
import useShopService from '@/hooks/useShopService';
import useBarberService from '@/hooks/useBarberService'; // Adicionei esta importação
import BarberAdd from '../../components/dashBoard/BarberAdd';
import BarberList from '../../components/dashBoard/BarberList'; // Importe o componente BarberList
import NavBar from '../../components/NavBar';
import BarberEditModal from '../../components/dashBoard/BarberEditModal';

const DashBoard = () => {
    const userService = useUserService();
    const shopService = useShopService();
    const barberService = useBarberService(); // Inicialize o serviço
    const [userLoged, setUserLoged] = useState({});
    const [barbeiros, setBarbeiros] = useState([]); // Estado para os barbeiros
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingBarber, setEditingBarber] = useState(null); // Estado para o barbeiro em edição
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
    // Função para carregar barbeiros
    const fetchBarbeiros = useCallback(async () => {
        // Adicione verificação de user existe
        if (user && userLoged.id && user.role === 'shop') {
            try {
                const data = await barberService.obterBarberPorIdShop(userLoged.id);
                setBarbeiros(data);
            } catch (error) {
                setError(error.message);
            }
        }
    }, [userLoged.id, barberService, user]); // Mude para depender do user completo
    // Atualizar lista quando novo barbeiro for adicionado
    const handleNewBarber = async (novoBarber) => {
        try {
            setLoading(true);
            await fetchBarbeiros(); // Força a recarga da lista
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    // Função para deletar barbeiro
    const handleDeleteBarber = async (id) => {
        try {
            await barberService.deletarBarber(id);
            setBarbeiros(prev => prev.filter(b => b.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };
    const handleEditBarber = async (updatedBarber) => {
        try {
            setLoading(true);
            await barberService.atualizarBarber(updatedBarber.id, updatedBarber);
            setBarbeiros(prev =>
                prev.map(b => b.id === updatedBarber.id ? updatedBarber : b)
            );
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            setEditingBarber(null);
        }
    };
    const handleLogout = () => {
        logout();
        router.push('/pages/signin');
    };

    useEffect(() => {
        if (!isAuthReady || !user) return; // Adicione verificação de user

        if (!token || isTokenExpired(token)) {
            router.push('/signin');
            return;
        }

        const loadData = async () => {
            await getUser();
            if (user.role === 'shop') {
                await fetchBarbeiros();
            }
        };
        loadData();
    }, [token, isAuthReady, router, getUser, fetchBarbeiros, user]); // Mantenha user como dependência



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

            <BarberAdd userLoged={userLoged} onBarberCriado={handleNewBarber} />

            {/* Seção de Barbeiros */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Barbeiros Cadastrados</h2>
                <BarberList
                    barbeiros={barbeiros}
                    onDelete={handleDeleteBarber}
                    onEdit={setEditingBarber}
                />
            </div>
            {editingBarber && (
                <BarberEditModal
                    barber={editingBarber}
                    onClose={() => setEditingBarber(null)}
                    onUpdate={handleEditBarber}
                />
            )}
        </div>
    );
};

export default DashBoard;