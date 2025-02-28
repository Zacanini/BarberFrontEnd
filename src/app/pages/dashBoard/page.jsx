"use client";
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Loading from '../../components/Loading';
import styles from '../../styles/DashBoard.module.css';
import { FiLogOut } from 'react-icons/fi';
import useUserService from '@/hooks/useUserService';
import useShopService from '@/hooks/useShopService';
import useBarberService from '@/hooks/useBarberService';
import BarberAdd from '../../components/dashBoard/BarberAdd';
import BarberList from '../../components/dashBoard/BarberList';
import NavBar from '../../components/NavBar';
import BarberEditModal from '../../components/dashBoard/BarberEditModal';
import UserDashboardContent from '../../components/dashBoard/UserDashboardContent';

const DashBoard = () => {
    const userService = useUserService();
    const shopService = useShopService();
    const barberService = useBarberService();
    const [userLoged, setUserLoged] = useState({});
    const [barbeiros, setBarbeiros] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingBarber, setEditingBarber] = useState(null);
    const { token, isAuthReady, user, logout, isTokenExpired } = useContext(AuthContext);
    const router = useRouter();

    const getUser = useCallback(async () => {
        if (user?.role === 'shop') {
            try {
                const data = await shopService.obterShopPorId(user.id);
                setUserLoged(data);
            } catch (error) {
                setError(error.message);
            }
        }
        if (user?.role === 'user') {
            try {
                const data = await userService.getUserById(user.id);
                setUserLoged(data);
            } catch (error) {
                setError(error.message);
            }
        }
    }, [user, shopService, userService]);

    const fetchBarbeiros = useCallback(async () => {
        if (user && userLoged.id && user.role === 'shop') {
            try {
                const data = await barberService.obterBarberPorIdShop(userLoged.id);
                setBarbeiros(data);
            } catch (error) {
                setError(error.message);
            }
        }
    }, [userLoged.id, barberService, user]);

    const handleNewBarber = async (novoBarber) => {
        try {
            setLoading(true);
            await fetchBarbeiros();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBarber = async (id) => {
        try {
            setLoading(true);
            await barberService.deletarBarber(id);
            setBarbeiros(prev => prev.filter(b => b.id !== id));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
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
        if (!isAuthReady || !user) return;

        if (!token || isTokenExpired(token)) {
            router.push('/signin');
            return;
        }

        const loadData = async () => {
            setInitialLoading(true);
            try {
                await getUser();
                if (user.role === 'shop') {
                    await fetchBarbeiros();
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setInitialLoading(false);
            }
        };
        loadData();
    }, [token, isAuthReady, router, getUser, fetchBarbeiros, user, isTokenExpired]);

    // Loading em tela cheia quando isAuthReady é falso
    if (!isAuthReady) {
        return <Loading fullScreen={true} />;
    }

    const renderHeader = () => (
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
    );

    return (
        <div className={styles.dashboardContainer}>
            <NavBar />
            
            {initialLoading ? (
                <div className={styles.loadingContainer}>
                    <Loading message="Carregando dashboard" />
                </div>
            ) : error ? (
                <div className={styles.erro}>
                    <p>{error}</p>
                </div>
            ) : (
                <>
                    {loading && (
                        <div className={styles.loadingOverlay}>
                            <Loading message="Atualizando dados" />
                        </div>
                    )}

                    {renderHeader()}

                    {user?.role === 'user' ? (
                        // Dashboard para usuário comum
                        <UserDashboardContent userLoged={userLoged} />
                    ) : (
                        // Dashboard para barbearia
                        <>
                            <BarberAdd userLoged={userLoged} onBarberCriado={handleNewBarber} />

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
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default DashBoard;