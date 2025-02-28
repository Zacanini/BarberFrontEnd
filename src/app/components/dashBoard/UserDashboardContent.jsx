import React, { useState, useEffect, useContext } from 'react';
import styles from '../../styles/DashBoard.module.css';
import { FaCalendar, FaHistory, FaClock } from 'react-icons/fa';
import { AuthContext } from '@/app/context/AuthContext';
import Loading from '../Loading';

const UserDashboardContent = ({ userLoged }) => {
    const [proximoAgendamento, setProximoAgendamento] = useState(null);
    const [historicoServicos, setHistoricoServicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        // Aqui você implementará a chamada à API para buscar os dados do usuário
        // Usando uma função simulada por enquanto
        const fetchUserData = async () => {
            try {
                setLoading(true);
                // Simulação de dados - substitua por chamadas reais à API
                
                // Simulação de próximo agendamento
                const agendamentoSimulado = {
                    id: "1",
                    servicoNome: "Corte e Barba",
                    data: new Date(Date.now() + 86400000).toISOString(), // amanhã
                    hora: "14:30",
                    barbeariaNome: "Barbearia Modelo",
                    barbeiroNome: "João Silva"
                };
                
                // Simulação de histórico
                const historicoSimulado = [
                    {
                        id: "7",
                        servicoNome: "Corte", 
                        data: "2024-02-20", 
                        hora: "10:00", 
                        barbeariaNome: "Barbearia Modelo", 
                        barbeiroNome: "Carlos"
                    },
                    {
                        id: "6",
                        servicoNome: "Barba", 
                        data: "2024-02-15", 
                        hora: "16:30", 
                        barbeariaNome: "Barbearia Modelo", 
                        barbeiroNome: "Pedro"
                    },
                    {
                        id: "5",
                        servicoNome: "Corte Degradê", 
                        data: "2024-02-08", 
                        hora: "14:00", 
                        barbeariaNome: "Barbearia Modelo", 
                        barbeiroNome: "João"
                    }
                ];
                
                setProximoAgendamento(agendamentoSimulado);
                setHistoricoServicos(historicoSimulado);
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userLoged?.id) {
            fetchUserData();
        }
    }, [userLoged, token]);

    if (loading) {
        return <Loading message="Carregando suas informações" />;
    }

    const formatarData = (dataString) => {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    };

    return (
        <div className={styles.userDashboardContainer}>
            {/* Próximo Agendamento */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <FaCalendar style={{ marginRight: '10px' }} />
                    Próximo Agendamento
                </h2>
                
                <div className={styles.proximoAgendamentoCard}>
                    {proximoAgendamento ? (
                        <div className={styles.agendamentoInfo}>
                            <h3>{proximoAgendamento.servicoNome}</h3>
                            <p>
                                <strong>Data:</strong> {formatarData(proximoAgendamento.data)} às {proximoAgendamento.hora}
                            </p>
                            <p>
                                <strong>Local:</strong> {proximoAgendamento.barbeariaNome}
                            </p>
                            <p>
                                <strong>Barbeiro:</strong> {proximoAgendamento.barbeiroNome}
                            </p>
                        </div>
                    ) : (
                        <div className={styles.semAgendamento}>
                            <FaClock size={30} />
                            <p>Você não possui agendamentos pendentes</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Últimos Serviços */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <FaHistory style={{ marginRight: '10px' }} />
                    Histórico Recente
                </h2>
                
                {historicoServicos.length > 0 ? (
                    <div className={styles.historicoGrid}>
                        {historicoServicos.map((servico) => (
                            <div key={servico.id} className={styles.historicoCard}>
                                <div className={styles.historicoHeader}>
                                    <h3>{servico.servicoNome}</h3>
                                    <span>{formatarData(servico.data)}</span>
                                </div>
                                <div className={styles.historicoDetalhes}>
                                    <p><strong>Horário:</strong> {servico.hora}</p>
                                    <p><strong>Barbearia:</strong> {servico.barbeariaNome}</p>
                                    <p><strong>Barbeiro:</strong> {servico.barbeiroNome}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.semHistorico}>
                        <p>Você ainda não realizou nenhum serviço</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboardContent;