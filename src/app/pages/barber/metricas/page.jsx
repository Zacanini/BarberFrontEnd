"use client"

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import useGraficoService from '@/hooks/useGraficoService';
import useBarberService from '@/hooks/useBarberService';
import NavBar from '@/app/components/NavBar';
import Loading from '@/app/components/Loading';
import { 
  Chart as ChartJS, 
  ArcElement, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import styles from '@/app/styles/Metricas.module.css';
import { FiBarChart2, FiPieChart, FiTrendingUp, FiCalendar, FiAward, FiUsers, FiScissors } from 'react-icons/fi';

// Registrar componentes do Chart.js
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MetricasPage = () => {
  // Estado e contexto
  const { token, isAuthReady, user, isTokenExpired } = useContext(AuthContext);
  const router = useRouter();
  const graficoService = useGraficoService();
  const barberService = useBarberService();
  
  const [loading, setLoading] = useState(true);
  const [barbeirosLoading, setBarbeirosLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth() + 1);
  
  // Lista de barbeiros e seleção
  const [barbeiros, setBarbeiros] = useState([]);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState(null);

  // Estados para os dados dos gráficos
  const [variacaoAgendas, setVariacaoAgendas] = useState(0);
  const [servicoMaisEfetuado, setServicoMaisEfetuado] = useState('');
  const [servicoMaisVendido, setServicoMaisVendido] = useState('');
  const [servicosPorBarbeiro, setServicosPorBarbeiro] = useState({});
  const [agendasPorDia, setAgendasPorDia] = useState([]);
  const [agendasPorServico, setAgendasPorServico] = useState({});
  
  // Dados específicos do barbeiro selecionado
  const [agendasBarbeiroSelecionado, setAgendasBarbeiroSelecionado] = useState([]);
  const [servicoMaisEfetuadoBarbeiroSelecionado, setServicoMaisEfetuadoBarbeiroSelecionado] = useState('');
  const [variacaoAgendasBarbeiroSelecionado, setVariacaoAgendasBarbeiroSelecionado] = useState(0);

  // Cores para os gráficos
  const coresGraficos = [
    'rgba(255, 124, 32, 0.8)',   // Laranja principal
    'rgba(218, 165, 32, 0.8)',   // Dourado
    'rgba(45, 52, 54, 0.8)',     // Preto
    'rgba(75, 192, 192, 0.8)',   // Verde água
    'rgba(153, 102, 255, 0.8)',  // Roxo
    'rgba(255, 159, 64, 0.8)'    // Laranja claro
  ];
  
  const borderColors = coresGraficos.map(cor => cor.replace('0.8', '1'));

  // Verificar autenticação - CORRIGIDO
  useEffect(() => {
    if (!isAuthReady) return; // Esperar isAuthReady
    
    // Verificação mais segura
    const isAuthenticated = user && token && typeof token === 'string' && token !== '';
    
    if (!isAuthenticated) {
      console.log("Usuário não autenticado, redirecionando...");
      router.push('/pages/signin');
      return;
    }
    
    // Só verificar expiração se tiver um token válido
    if (isTokenExpired && isAuthenticated && isTokenExpired(token)) {
      console.log("Token expirado, redirecionando...");
      router.push('/pages/signin');
      return;
    }
    
  }, [isAuthReady, user, token, router, isTokenExpired]); // Adicionar isTokenExpired como dependência

  // Carregar lista de barbeiros - somente após autenticação confirmada
  useEffect(() => {
    const carregarBarbeiros = async () => {
      // Verificação extra para garantir que só carrega dados se autenticado
      if (!isAuthReady || !user || !token) return;
      
      setBarbeirosLoading(true);
      try {
        const idShop = user.role === 'shop' ? user.id : localStorage.getItem('idShop');
        if (!idShop) {
          setError('ID da barbearia não encontrado');
          return;
        }
        
        const listaBarbeiros = await barberService.obterBarberPorIdShop(idShop);
        
        if (listaBarbeiros && listaBarbeiros.length > 0) {
          setBarbeiros(listaBarbeiros);
          setBarbeiroSelecionado(listaBarbeiros[0].id);
        } else {
          setError('Nenhum barbeiro encontrado para esta barbearia');
        }
      } catch (err) {
        console.error('Erro ao carregar barbeiros:', err);
        setError('Falha ao carregar a lista de barbeiros');
      } finally {
        setBarbeirosLoading(false);
      }
    };
    
    carregarBarbeiros();
  }, [isAuthReady, user, token, barberService]);

  // Carregar dados da barbearia
  useEffect(() => {
    const carregarDadosBarbearia = async () => {
      if (!isAuthReady || !user || !token) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const idShop = user.role === 'shop' ? user.id : localStorage.getItem('idShop');
        
        if (!idShop) {
          setError('ID da barbearia não encontrado');
          return;
        }
        
        // Dados da barbearia
        const [servicoPopular, agendas, comparativo] = await Promise.all([
          graficoService.buscarServicoMaisVendidoPorShop(idShop),
          graficoService.buscarAgendasPorShopEMes(idShop, mesSelecionado),
          graficoService.compararServicosBarbeiros(idShop, mesSelecionado)
        ]);
        
        setServicoMaisVendido(servicoPopular);
        setAgendasPorDia(processarAgendasPorDia(agendas));
        setAgendasPorServico(processarAgendasPorServico(agendas));
        setServicosPorBarbeiro(comparativo);
        
      } catch (err) {
        console.error('Erro ao carregar métricas da barbearia:', err);
        setError('Falha ao carregar dados da barbearia');
      } finally {
        setLoading(false);
      }
    };
    
    carregarDadosBarbearia();
  }, [mesSelecionado, user, graficoService, isAuthReady, token]);

  // Carregar dados do barbeiro selecionado
  useEffect(() => {
    const carregarDadosBarbeiro = async () => {
      if (!barbeiroSelecionado) return;
      
      setLoading(true);
      
      try {
        // Dados específicos do barbeiro selecionado
        const [variacao, servicoMaisPopular, agendas] = await Promise.all([
          graficoService.calcularVariacaoAgendas(barbeiroSelecionado),
          graficoService.buscarServicoMaisEfetuado(barbeiroSelecionado, mesSelecionado),
          graficoService.buscarAgendasPorBarberEMes(barbeiroSelecionado, mesSelecionado)
        ]);
        
        setVariacaoAgendasBarbeiroSelecionado(variacao);
        setServicoMaisEfetuadoBarbeiroSelecionado(servicoMaisPopular);
        setAgendasBarbeiroSelecionado(agendas);
        
      } catch (err) {
        console.error('Erro ao carregar métricas do barbeiro:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (barbeiroSelecionado) {
      carregarDadosBarbeiro();
    }
  }, [barbeiroSelecionado, mesSelecionado, graficoService]);

  // Função para processar agendas por dia da semana
  const processarAgendasPorDia = (agendas) => {
    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const contagem = new Array(7).fill(0);
    
    if (agendas && agendas.length > 0) {
      agendas.forEach(agenda => {
        const data = new Date(agenda.dataMarcada);
        const diaSemana = data.getDay();
        contagem[diaSemana]++;
      });
    }
    
    return {
      labels: diasDaSemana,
      datasets: [{
        label: 'Agendamentos por Dia',
        data: contagem,
        backgroundColor: coresGraficos[0],
        borderColor: borderColors[0],
        borderWidth: 1,
      }]
    };
  };

  // Função para processar agendas por serviço
  const processarAgendasPorServico = (agendas) => {
    const servicosContagem = {};
    
    if (agendas && agendas.length > 0) {
      agendas.forEach(agenda => {
        const servico = agenda.nomeServico || 'Não especificado';
        if (!servicosContagem[servico]) servicosContagem[servico] = 0;
        servicosContagem[servico]++;
      });
    }
    
    return {
      labels: Object.keys(servicosContagem),
      datasets: [{
        label: 'Agendamentos por Serviço',
        data: Object.values(servicosContagem),
        backgroundColor: coresGraficos,
        borderColor: borderColors,
        borderWidth: 1,
      }]
    };
  };
  
  // Processa os dados do barbeiro selecionado
  const processarAgendasBarbeiroSelecionado = () => {
    const servicosContagem = {};
    
    if (agendasBarbeiroSelecionado && agendasBarbeiroSelecionado.length > 0) {
      agendasBarbeiroSelecionado.forEach(agenda => {
        const servico = agenda.nomeServico || 'Não especificado';
        if (!servicosContagem[servico]) servicosContagem[servico] = 0;
        servicosContagem[servico]++;
      });
    }
    
    return {
      labels: Object.keys(servicosContagem),
      datasets: [{
        label: 'Serviços Realizados',
        data: Object.values(servicosContagem),
        backgroundColor: coresGraficos,
        borderColor: borderColors,
        borderWidth: 1,
      }]
    };
  };

  // Opções dos gráficos
  const opcoes = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }
    }
  };

  // Dados para o gráfico de barbeiros
  const dadosBarbeiros = {
    labels: Object.keys(servicosPorBarbeiro),
    datasets: [{
      label: 'Agendamentos por Barbeiro',
      data: Object.values(servicosPorBarbeiro),
      backgroundColor: coresGraficos,
      borderColor: borderColors,
      borderWidth: 1,
    }]
  };

  // Função para encontrar nome do barbeiro pelo ID
  const getNomeBarbeiro = (id) => {
    const barbeiro = barbeiros.find(b => b.id === id);
    return barbeiro ? barbeiro.nome : 'Barbeiro';
  };

  // Função para formatar o nome do mês
  const getNomeMes = (mes) => {
    return new Date(2000, mes - 1, 1).toLocaleString('pt-BR', { month: 'long' });
  };

  if (!isAuthReady) {
    return <Loading />;
  }

  // Não renderizar nada se não estiver autenticado
  if (!user || !token) {
    return null;
  }

  return (
    <div className={styles.metricasContainer}>
      <NavBar />
      
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <div className={styles.titulo}>
            <h1>Métricas e Analytics</h1>
            <p>Visualize o desempenho do seu negócio em números</p>
          </div>
          
          <div className={styles.controles}>
            {/* Seletor de Mês */}
            <div className={styles.seletorMes}>
              <div className={styles.iconLabel}>
                <FiCalendar />
                <span>Período:</span>
              </div>
              <select 
                value={mesSelecionado} 
                onChange={(e) => setMesSelecionado(Number(e.target.value))}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {getNomeMes(i + 1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Seletor de Barbeiro */}
            <div className={styles.seletorBarbeiro}>
              <div className={styles.iconLabel}>
                <FiScissors />
                <span>Barbeiro:</span>
              </div>
              <select 
                value={barbeiroSelecionado || ''} 
                onChange={(e) => setBarbeiroSelecionado(e.target.value)}
                disabled={barbeirosLoading || barbeiros.length === 0}
              >
                {barbeirosLoading ? (
                  <option>Carregando...</option>
                ) : barbeiros.length === 0 ? (
                  <option>Sem barbeiros</option>
                ) : (
                  barbeiros.map(barbeiro => (
                    <option key={barbeiro.id} value={barbeiro.id}>
                      {barbeiro.nome}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <Loading />
          </div>
        ) : error ? (
          <div className={styles.erro}>
            <p>{error}</p>
          </div>
        ) : (
          <div className={styles.metricas}>
            {/* Seção: Visão Geral da Barbearia */}
            <div className={styles.secaoTitulo}>
              <h2>Visão Geral da Barbearia</h2>
            </div>
            
            {/* Grid de Cartões de Métricas da Barbearia */}
            <div className={styles.metricasGrid}>
              {/* Cartão de Serviço Mais Popular da Barbearia */}
              <div className={styles.metricaCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitulo}>
                    <FiAward className={styles.cardIcon} />
                    <h2>Serviço Mais Popular</h2>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.servicoDestaque}>
                    <span className={styles.servicoNome}>
                      {servicoMaisVendido || "Sem dados"}
                    </span>
                    <span className={styles.descricao}>
                      mais solicitado na barbearia em {getNomeMes(mesSelecionado)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Outro card para métricas da barbearia se necessário */}
            </div>

            {/* Gráficos da Barbearia */}
            <div className={styles.graficosGrid}>
              {/* Gráfico de Agendamentos por Dia da Semana */}
              <div className={styles.graficoCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitulo}>
                    <FiBarChart2 className={styles.cardIcon} />
                    <h2>Agendamentos por Dia da Semana</h2>
                  </div>
                </div>
                <div className={styles.graficoContainer}>
                  {agendasPorDia.labels?.length > 0 ? (
                    <Bar data={agendasPorDia} options={opcoes} />
                  ) : (
                    <div className={styles.semDados}>
                      <p>Sem dados para exibir neste período</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Gráfico de Agendamentos por Serviço */}
              <div className={styles.graficoCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitulo}>
                    <FiPieChart className={styles.cardIcon} />
                    <h2>Distribuição por Serviço</h2>
                  </div>
                </div>
                <div className={styles.graficoContainer}>
                  {agendasPorServico.labels?.length > 0 ? (
                    <Doughnut data={agendasPorServico} options={opcoes} />
                  ) : (
                    <div className={styles.semDados}>
                      <p>Sem dados para exibir neste período</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Gráfico de Barbeiros */}
              <div className={`${styles.graficoCard} ${styles.fullWidth}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitulo}>
                    <FiUsers className={styles.cardIcon} />
                    <h2>Desempenho dos Barbeiros</h2>
                  </div>
                </div>
                <div className={styles.graficoContainer}>
                  {Object.keys(servicosPorBarbeiro).length > 0 ? (
                    <Bar data={dadosBarbeiros} options={opcoes} />
                  ) : (
                    <div className={styles.semDados}>
                      <p>Sem dados para exibir neste período</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Seção: Métricas do Barbeiro Selecionado */}
            {barbeiroSelecionado && (
              <>
                <div className={styles.secaoTitulo}>
                  <h2>Métricas de {getNomeBarbeiro(barbeiroSelecionado)}</h2>
                </div>
                
                {/* Grid de Cartões de Métricas do Barbeiro */}
                <div className={styles.metricasGrid}>
                  {/* Cartão de Variação de Agendamentos */}
                  <div className={styles.metricaCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardTitulo}>
                        <FiTrendingUp className={styles.cardIcon} />
                        <h2>Variação de Agendamentos</h2>
                      </div>
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.variacaoValor}>
                        <span className={`${styles.valor} ${variacaoAgendasBarbeiroSelecionado >= 0 ? styles.positivo : styles.negativo}`}>
                          {variacaoAgendasBarbeiroSelecionado >= 0 ? '+' : ''}{Number(variacaoAgendasBarbeiroSelecionado).toFixed(1)}%
                        </span>
                        <span className={styles.descricao}>comparado ao mês anterior</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Cartão de Serviço Mais Popular do Barbeiro */}
                  <div className={styles.metricaCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardTitulo}>
                        <FiAward className={styles.cardIcon} />
                        <h2>Serviço Mais Realizado</h2>
                      </div>
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.servicoDestaque}>
                        <span className={styles.servicoNome}>
                          {servicoMaisEfetuadoBarbeiroSelecionado || "Sem dados"}
                        </span>
                        <span className={styles.descricao}>
                          mais realizado em {getNomeMes(mesSelecionado)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Gráfico específico do barbeiro selecionado */}
                <div className={`${styles.graficoCard} ${styles.fullWidth}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitulo}>
                      <FiPieChart className={styles.cardIcon} />
                      <h2>Serviços Realizados por {getNomeBarbeiro(barbeiroSelecionado)}</h2>
                    </div>
                  </div>
                  <div className={styles.graficoContainer}>
                    {agendasBarbeiroSelecionado && agendasBarbeiroSelecionado.length > 0 ? (
                      <Pie data={processarAgendasBarbeiroSelecionado()} options={opcoes} />
                    ) : (
                      <div className={styles.semDados}>
                        <p>Sem dados para exibir neste período</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricasPage;