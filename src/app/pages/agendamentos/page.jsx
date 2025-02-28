"use client";

import React, { useState, useEffect, useContext, useMemo } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import useBarberService from '@/hooks/useBarberService';
import useAgendaService from '@/hooks/useAgendaService';
import { 
  FiCalendar, 
  FiChevronLeft, 
  FiChevronRight, 
  FiSearch, 
  FiFilter, 
  FiClock, 
  FiDollarSign, 
  FiUser,
  FiPhone,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle
} from 'react-icons/fi';
import styles from '@/app/styles/AgendamentosPage.module.css';
import Loading from '@/app/components/Loading';
import NavBar from '@/app/components/NavBar';
import { 
  format, 
  startOfWeek, 
  addDays, 
  parseISO, 
  isToday,
  isSameDay,
  startOfDay
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const AgendamentosPage = () => {
  const { token, isAuthReady, user } = useContext(AuthContext);
  const barberService = useBarberService();
  const agendaService = useAgendaService();
  const [barbeiros, setBarbeiros] = useState([]);
  const [agendas, setAgendas] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);
  const [animationDirection, setAnimationDirection] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchBarbeiros();
    }
  }, [user]);

  const fetchBarbeiros = async () => {
    setLoading(true);
    try {
      const data = await barberService.listarBarbers();
      setBarbeiros(data.filter(b => b.idShop === user.id));
    } catch (error) {
      console.error('Erro ao buscar barbeiros:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgendas = async (barberId) => {
    setLoading(true);
    try {
      const data = await agendaService.listarAgendas();
      setAgendas(data.filter(a => a.idBarber === barberId));
    } catch (error) {
      console.error('Erro ao buscar agendas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBarberClick = (barber) => {
    setSelectedBarber(barber);
    fetchAgendas(barber.id);
    setSelectedAgendamento(null);
  };

  const weekDays = Array.from({ length: 7 }).map((_, i) => 
    addDays(startOfWeek(currentWeek), i)
  );

  const handleWeekNavigation = (direction) => {
    setIsTransitioning(true);
    setAnimationDirection(direction > 0 ? 'right' : 'left');
    setTimeout(() => {
      setCurrentWeek(prev => addDays(prev, direction * 7));
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const filteredAgendas = useMemo(() => {
    return agendas.filter(agenda => {
      const matchesSearch = searchTerm.trim() === "" || 
        agenda.nomeServico.toLowerCase().includes(searchTerm.toLowerCase()) || 
        agenda.nomeCliente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agenda.horario.includes(searchTerm);
      
      const matchesStatus = statusFilter === "todos" || agenda.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [agendas, searchTerm, statusFilter]);

  const estatisticas = useMemo(() => {
    if (!agendas.length) return { total: 0, hoje: 0, valorTotal: 0 };
    
    const hoje = new Date();
    const agendasHoje = agendas.filter(a => 
      isSameDay(parseISO(a.dataMarcada), hoje)
    );
    
    const valorTotal = agendas.reduce(
      (sum, agenda) => sum + Number(agenda.valorDoServico || 0), 
      0
    );
    
    return {
      total: agendas.length,
      hoje: agendasHoje.length,
      valorTotal: valorTotal
    };
  }, [agendas]);

  const getStatusInfo = (agenda) => {
    const status = agenda.status || "pendente";
    
    switch(status) {
      case "concluido":
        return { 
          icon: <FiCheckCircle style={{color: "#27ae60"}} />, 
          color: "#27ae60", 
          label: "Concluído" 
        };
      case "cancelado":
        return { 
          icon: <FiXCircle style={{color: "#e74c3c"}} />, 
          color: "#e74c3c", 
          label: "Cancelado" 
        };
      default:
        return { 
          icon: <FiAlertCircle style={{color: "#f39c12"}} />, 
          color: "#f39c12", 
          label: "Pendente" 
        };
    }
  };

  const handleStatusChange = async (agendaId, novoStatus) => {
    try {
      setLoading(true);
      const agendaParaAtualizar = agendas.find(a => a.id === agendaId);
      if (agendaParaAtualizar) {
        const dadosAtualizados = { ...agendaParaAtualizar, status: novoStatus };
        await agendaService.atualizarAgenda(agendaId, dadosAtualizados);
        await fetchAgendas(selectedBarber.id);
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthReady || loading) return <Loading />;

  return (
    <div className={styles.container}>
      <NavBar />
      <h1 className={styles.containerTitle}>Agendamentos</h1>
      
      <div className={styles.dashboard}>
        <div className={styles.dashboardCard}>
          <FiCalendar className={styles.dashboardIcon} />
          <h3 className={styles.dashboardTitle}>Total de Agendamentos</h3>
          <p className={styles.dashboardValue}>{selectedBarber ? estatisticas.total : '-'}</p>
        </div>
        
        <div className={styles.dashboardCard}>
          <FiClock className={styles.dashboardIcon} />
          <h3 className={styles.dashboardTitle}>Agendamentos Hoje</h3>
          <p className={styles.dashboardValue}>{selectedBarber ? estatisticas.hoje : '-'}</p>
        </div>
        
        <div className={styles.dashboardCard}>
          <FiDollarSign className={styles.dashboardIcon} />
          <h3 className={styles.dashboardTitle}>Valor Total</h3>
          <p className={styles.dashboardValue}>
            {selectedBarber ? `R$ ${estatisticas.valorTotal.toFixed(2)}` : '-'}
          </p>
        </div>
      </div>
      
      <h2 style={{color:'#2c3e50', marginBottom: '1rem',textAlign:'center'}}>Selecione um barbeiro para ver a agenda</h2>
      <div className={styles.barbeirosGrid}>
        {barbeiros.map(barber => (
          <div 
            key={barber.id} 
            className={styles.barbeiroCard}
            onClick={() => handleBarberClick(barber)}
            style={{
              border: selectedBarber?.id === barber.id ? '2px solid #ff7c20' : '1px solid #e2e8f0'
            }}
          >
            <div className={styles.barbeiroImage}>
              {barber.imagemUrl ? 
                <img 
                  src={barber.imagemUrl} 
                  alt={barber.nome}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                /> :
                <FiUser style={{ fontSize: '2.5rem', color: '#ff7c20' }} />
              }
            </div>
            <h3 className={styles.barbeiroName}>{barber.nome}</h3>
            <p className={styles.barbeiroType}>{barber.tipoBarber}</p>
            <div className={styles.barbeiroButton}>
              <FiCalendar style={{marginRight: '5px', display: 'inline'}} />
              <span>Ver Agenda</span>
            </div>
          </div>
        ))}
      </div>

      {selectedBarber && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 style={{color:"black"}}>Agenda de {selectedBarber.nome}</h2>
              <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                <div className={styles.searchInput}>
                  <FiSearch className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Buscar cliente ou serviço..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchField}
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={styles.statusFilter}
                >
                  <option value="todos">Todos os status</option>
                  <option value="pendente">Pendente</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
                
                <button 
                  onClick={() => setSelectedBarber(null)}
                  className={styles.closeButton}
                >
                  &times;
                </button>
              </div>
            </div>

            <div className={styles.weekNavigation}>
              <button 
                onClick={() => handleWeekNavigation(-1)}
                className={styles.weekButton}
                disabled={isTransitioning}
              >
                <FiChevronLeft />
              </button>
              <span className={styles.weekText}>
                {format(currentWeek, 'MMMM yyyy', { locale: ptBR })}
              </span>
              <button  
                onClick={() => handleWeekNavigation(1)}
                className={styles.weekButton}
                disabled={isTransitioning}
              >
                <FiChevronRight />
              </button>
            </div>

            <div className={styles.flexContainer}>
              <div className={styles.calendarioContainer}>
                <div 
                  className={`
                    ${styles.calendario} 
                    ${styles.calendarioGrid} 
                    ${styles.calendarioFade}
                    ${isTransitioning ? styles.calendarioHidden : styles.calendarioVisible}
                    ${animationDirection === 'right' ? styles.slideRight : ''}
                    ${animationDirection === 'left' ? styles.slideLeft : ''}
                  `}
                >
                  {weekDays.map((day, index) => {
                    const dayAgendas = filteredAgendas.filter(a => 
                      format(parseISO(a.dataMarcada), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                    );
                    
                    const ocupacaoStatus = dayAgendas.length === 0 
                      ? { text: "Livre", color: "#27ae60" }
                      : dayAgendas.length > 5 
                        ? { text: "Lotado", color: "#e74c3c" } 
                        : { text: `${dayAgendas.length} horários`, color: "#f39c12" };
                        
                    return (
                      <div 
                        key={index}
                        className={`${styles.dia} ${isToday(day) ? styles.hoje : ''}`}
                      >
                        <div className={`${styles.cabecalhoDia} ${isToday(day) ? styles.cabecalhoDiaHoje : ''}`}>
                          <span className={isToday(day) ? styles.diaTextHoje : ''}>
                            {format(day, 'EEEE', { locale: ptBR })}
                          </span>
                          <strong>
                            {format(day, 'dd/MM')}
                          </strong>
                          <div className={styles.ocupacaoStatus} style={{color: ocupacaoStatus.color}}>
                            {ocupacaoStatus.text}
                          </div>
                        </div>
                        
                        <div className={styles.agendamentos}>
                          {dayAgendas.length > 0 ? dayAgendas
                            .sort((a, b) => a.horario.localeCompare(b.horario))
                            .map(agenda => {
                              const statusInfo = getStatusInfo(agenda);
                              
                              return (
                                <div 
                                  key={agenda.id} 
                                  className={`${styles.agendamento} ${selectedAgendamento?.id === agenda.id ? styles.agendamentoSelecionado : ''}`}
                                  onClick={() => setSelectedAgendamento(agenda)}
                                  style={{borderLeft: `4px solid ${statusInfo.color}`}}
                                >
                                  <div className={styles.statusContainer}>
                                    <span className={styles.horario}>
                                      {agenda.horario}
                                    </span>
                                    <div className={styles.statusIcon}>
                                      {statusInfo.icon}
                                    </div>
                                  </div>
                                  <div className={styles.agendamentoInfo}>
                                    <p className={styles.clientName}>{agenda.nomeCliente}</p>
                                    <p className={styles.serviceName}>{agenda.nomeServico}</p>
                                  </div>
                                </div>
                              );
                            })
                          : <p className={styles.emptyMessage}>Nenhum agendamento para este dia</p>
                          }
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedAgendamento && (
                <div className={styles.detalhesContainer}>
                  <h3 className={styles.detalhesTitle}>Detalhes do Agendamento</h3>
                  <div className={styles.detalhesItem}>
                    <FiUser className={styles.detalhesIcon} />
                    <div>
                      <strong>Cliente</strong>
                      <p>{selectedAgendamento.nomeCliente}</p>
                    </div>
                  </div>
                  <div className={styles.detalhesItem}>
                    <FiPhone className={styles.detalhesIcon} />
                    <div>
                      <strong>Telefone</strong>
                      <p>{selectedAgendamento.telefoneCliente || "Não informado"}</p>
                    </div>
                  </div>
                  <div className={styles.detalhesItem}>
                    <FiCalendar className={styles.detalhesIcon} />
                    <div>
                      <strong>Data e Hora</strong>
                      <p>
                        {format(parseISO(selectedAgendamento.dataMarcada), 'dd/MM/yyyy')} às {selectedAgendamento.horario}
                      </p>
                    </div>
                  </div>
                  <div className={styles.detalhesItem}>
                    <FiClock className={styles.detalhesIcon} />
                    <div>
                      <strong>Serviço</strong>
                      <p>{selectedAgendamento.nomeServico}</p>
                    </div>
                  </div>
                  <div className={styles.detalhesItem}>
                    <FiDollarSign className={styles.detalhesIcon} />
                    <div>
                      <strong>Valor</strong>
                      <p>R$ {Number(selectedAgendamento.valorDoServico).toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className={styles.statusActions}>
                    <h4>Alterar Status</h4>
                    <div className={styles.statusButtons}>
                      <button 
                        className={`${styles.statusButton} ${styles.statusButtonPendente}`}
                        onClick={() => handleStatusChange(selectedAgendamento.id, "pendente")}
                        disabled={selectedAgendamento.status === "pendente"}
                      >
                        <FiAlertCircle /> Pendente
                      </button>
                      <button 
                        className={`${styles.statusButton} ${styles.statusButtonConcluido}`}
                        onClick={() => handleStatusChange(selectedAgendamento.id, "concluido")}
                        disabled={selectedAgendamento.status === "concluido"}
                      >
                        <FiCheckCircle /> Concluído
                      </button>
                      <button 
                        className={`${styles.statusButton} ${styles.statusButtonCancelado}`}
                        onClick={() => handleStatusChange(selectedAgendamento.id, "cancelado")}
                        disabled={selectedAgendamento.status === "cancelado"}
                      >
                        <FiXCircle /> Cancelado
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendamentosPage;
