"use client";

import React, { useState, useEffect, useContext, useCallback } from 'react';
import useAgendaService from '../../hooks/useAgendaService';
import { AuthContext } from '../../app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Loading from '../components/Loading';
import styles from '../styles/DashBoard.module.css';
import { FiRefreshCw, FiLogOut } from 'react-icons/fi';

const DashBoard = () => {
    const agendaService = useAgendaService();
    const [agendas, setAgendas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token, isAuthReady, user, logout } = useContext(AuthContext);
    const router = useRouter();

    const fetchAgendas = useCallback(async () => {
        setLoading(true);
        try {
            const data = await agendaService.listarAgendas();
            setAgendas(data);
            setError(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [token, agendaService]);

    useEffect(() => {
        if (!isAuthReady) return;
        if (!token) {
            router.push('/signin');
            return;
        }
        fetchAgendas();
    }, [token, isAuthReady, router, fetchAgendas]);

    const handleLogout = () => {
        logout();
        router.push('/signin');
    };

    if (!isAuthReady) {
        return <Loading />;
    }

    return (
        <div className={styles.dashboardContainer}>
            {loading && (
                <div className={styles.loadingOverlay}>
                    <Loading />
                </div>
            )}

            <div className={styles.header}>
                <h1 className={styles.welcomeMessage}>
                    Bem-vindo, {user?.email}!
                </h1>
                <div className={styles.controls}>
                    <button
                        className={styles.atualizarButton}
                        onClick={fetchAgendas}
                        disabled={loading}
                    >
                        <FiRefreshCw size={18} />
                        {loading ? 'Carregando...' : 'Atualizar'}
                    </button>
                    <button
                        className={styles.logoutButton}
                        onClick={handleLogout}
                    >
                        <FiLogOut size={18} />
                        Sair
                    </button>
                </div>
            </div>

            <div className={styles.tableContainer}>
                {error && (
                    <div className={styles.errorMessage}>
                        Erro ao carregar agendas: {error}
                    </div>
                )}

                <table>
                    <thead>
                        <tr>
                            <th>Serviço</th>
                            <th>Barbearia</th>
                            <th>Barbeiro</th>
                            <th>Cliente</th>
                            <th>Data</th>
                            <th>Horário</th>
                            <th>Valor</th>
                            <th>Pagamento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agendas.map((agenda) => (
                            <tr key={agenda.id}>
                                <td>{agenda.nomeServico}</td>
                                <td>{agenda.idShop}</td>
                                <td>{agenda.idBarber}</td>
                                <td>{agenda.idUser}</td>
                                <td>
                                    {new Date(agenda.dataMarcada).toLocaleDateString('pt-BR')}
                                </td>
                                <td>{agenda.horario}</td>
                                <td>
                                    R$ {agenda.valorDoServico.toFixed(2).replace('.', ',')}
                                </td>
                                <td>{agenda.formaDePagamento}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashBoard;