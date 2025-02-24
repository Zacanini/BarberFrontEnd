"use client";

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import useBarberService from '@/hooks/useBarberService';
import useAgendaService from '@/hooks/useAgendaService';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from '@/app/styles/AgendamentosPage.module.css';
import Loading from '@/app/components/Loading';
import NavBar from '@/app/components/NavBar';
import { format, startOfWeek, addDays, parseISO, isToday } from 'date-fns';
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
  };

  const weekDays = Array.from({ length: 7 }).map((_, i) => 
    addDays(startOfWeek(currentWeek), i)
  );

  const handleWeekNavigation = (direction) => {
    setCurrentWeek(prev => addDays(prev, direction * 7));
  };

  if (!isAuthReady || loading) return <Loading />;

  return (
    <div className={styles.container}>
      <NavBar />
      <h1 style={{color:'#ff7c20', textAlign:'center', fontWeight:"bold", textTransform: "uppercase" , fontSize:'2rem' }}>agendamentos</h1>
      
      <div className={styles.barbeirosGrid}>
        {barbeiros.map(barber => (
          <div 
            key={barber.id} 
            className={styles.barbeiroCard}
            onClick={() => handleBarberClick(barber)}
          >
            <FiCalendar className={styles.calendarIcon} />
            <h3 style={{color:"black"}}>{barber.nome}</h3>
            <p style={{color:"black"}}>{barber.tipoBarber}</p>
          </div>
        ))}
      </div>

      {selectedBarber && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 style={{color:"black"}}>Agenda de {selectedBarber.nome}</h2>
              <button 
                onClick={() => setSelectedBarber(null)}
                className={styles.closeButton}
              >
                &times;
              </button>
            </div>

            <div className={styles.weekNavigation}>
              <button onClick={() => handleWeekNavigation(-1)}>
                <FiChevronLeft />
              </button>
              <span style={{color:"black"}}>
                {format(currentWeek, 'MMMM yyyy', { locale: ptBR })}
              </span>
              <button  onClick={() => handleWeekNavigation(1)}>
                <FiChevronRight />
              </button>
            </div>

            <div className={styles.calendario}>
              {weekDays.map((day, index) => (
                <div 
                  key={index}
                  className={`${styles.dia} ${isToday(day) ? styles.hoje : ''}`}
                >
                  <div className={styles.cabecalhoDia}>
                    <span>{format(day, 'EEEE', { locale: ptBR })}</span>
                    <strong>{format(day, 'dd/MM')}</strong>
                  </div>
                  
                  <div className={styles.agendamentos}>
                    {agendas
                      .filter(a => format(parseISO(a.dataMarcada), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
                      .map(agenda => (
                        <div key={agenda.id} className={styles.agendamento}>
                          <div className={styles.info}>
                            <span className={styles.horario}>
                              {agenda.horario}
                            </span>
                            <span className={styles.servico}>
                              {agenda.nomeServico}
                            </span>
                          </div>
                          <div className={styles.detalhes}>
                            <span className={styles.valor}>
                              R$ {agenda.valorDoServico}
                            </span>
                            <span className={styles.pagamento}>
                              {agenda.formaDePagamento}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendamentosPage;