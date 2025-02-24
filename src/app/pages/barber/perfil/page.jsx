'use client';

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Loading from '../../../components/Loading';
import styles from '../../../styles/Profile.module.css';
import { FiEdit, FiClock, FiMapPin, FiPhone, FiX, FiPackage, FiDollarSign, FiCalendar } from 'react-icons/fi';
import useShopService from '@/hooks/useShopService';
import NavBar from '../../../components/NavBar';
import ReactDOM from 'react-dom';

const Modal = ({ children, title, onClose }) => {
    return ReactDOM.createPortal(
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h3>{title}</h3>
                    <button onClick={onClose} className={styles.closeButton}>
                        <FiX size={20} />
                    </button>
                </div>
                <div className={styles.modalContent}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

const BarberShopProfile = () => {
    const shopService = useShopService();
    const [shopData, setShopData] = useState({});
    const [loading, setLoading] = useState(true);
    const [editingField, setEditingField] = useState(null);
    const [formData, setFormData] = useState({});
    const { token, isAuthReady, user, isTokenExpired } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        const fetchShopData = async () => {
            if (user && user.role === 'shop') {
                try {
                    const data = await shopService.obterShopPorId(user.id);
                    console.log('Dados recebidos:', data)
                    setShopData(data);
                } catch (error) {
                    console.error('Erro ao carregar dados da barbearia:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (!isAuthReady) return;
        if (!token || isTokenExpired(token)) {
            router.push('/signin'); // Redireciona para a página de login
            return;
        }

        fetchShopData();
    }, [token, isAuthReady, router, user, shopService]);

    const handleEditClick = (field) => {
        setEditingField(field);
        setFormData({
            ...shopData,
            horaAbertura: shopData.horaAbertura?.split(':').slice(0, 2).join(':') || '',
            horaDeFechamento: shopData.horaDeFechamento?.split(':').slice(0, 2).join(':') || ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedShop = await shopService.atualizarShop(user.id, formData);
            setShopData(updatedShop);
            setEditingField(null);
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                img: URL.createObjectURL(file) // Pré-visualização
            });
        }
    };

    const formatarData = (dataString) => {
        if (!dataString) return "sem plano"; // Adicione esta linha

        try {
            return new Date(dataString).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (error) {
            console.error('Erro ao formatar data:', error);
            return 'Data inválida';
        }
    };

    if (!isAuthReady || loading) {
        return <Loading />;
    }

    return (
        <div className={styles.profileContainer}>
            <NavBar />

            <div className={styles.profileContent}>
                {/* Modal de Edição */}
                {editingField === 'contato' && (
                    <Modal title="Editar Contato" onClose={() => setEditingField(null)}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label>WhatsApp:</label>
                                <input
                                    type="text"
                                    name="whatsapp"
                                    value={formData.whatsapp || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className={styles.saveButton}>
                                Salvar Alterações
                            </button>
                        </form>
                    </Modal>
                )}


                {editingField === 'informacoes' && (
                    <Modal title="Editar Informações" onClose={() => setEditingField(null)}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label>Descrição:</label>
                                <textarea
                                    name="informacoes"
                                    value={formData.informacoes || ''}
                                    onChange={handleChange}
                                    rows="5"
                                    required
                                />
                            </div>
                            <button type="submit" className={styles.saveButton}>
                                Salvar Alterações
                            </button>
                        </form>
                    </Modal>
                )}
                {editingField === 'imagem' && (
                    <Modal title="Editar Imagem" onClose={() => setEditingField(null)}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label>Nova Imagem:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <button type="submit" className={styles.saveButton}>
                                Salvar Alterações
                            </button>
                        </form>
                    </Modal>
                )}

                {editingField === 'horario' && (
                    <Modal title="Editar Horário" onClose={() => setEditingField(null)}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label>Abertura:</label>
                                <input
                                    type="time"
                                    name="horaAbertura"
                                    value={formData.horaAbertura || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Fechamento:</label>
                                <input
                                    type="time"
                                    name="horaDeFechamento"
                                    value={formData.horaDeFechamento || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className={styles.saveButton}>
                                Salvar Alterações
                            </button>
                        </form>
                    </Modal>
                )}

                {editingField === 'localizacao' && (
                    <Modal title="Editar Localização" onClose={() => setEditingField(null)}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label>Endereço:</label>
                                <input
                                    type="text"
                                    name="localizacao"
                                    value={formData.localizacao || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className={styles.saveButton}>
                                Salvar Alterações
                            </button>
                        </form>
                    </Modal>
                )}

                {/* Cabeçalho do Perfil */}
                <div className={styles.profileHeader}>
                    <div className={styles.coverPhoto}>
                        <div className={styles.profileImageContainer}>
                            <img
                                src={shopData.img || '/default-barbershop.jpg'}
                                alt={shopData.nome}
                                className={styles.profileImage}
                            />
                            <button
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '5px', borderRadius: '50%' }}
                                onClick={() => handleEditClick('imagem')}
                                aria-label="Editar imagem"
                            >
                                <FiEdit size={18} color="#333" />
                            </button>
                        </div>
                    </div>
                    <h1 className={styles.shopName}>{shopData.nome}</h1>
                </div>

                {/* Seção de Informações */}
                <div className={styles.infoSection}>
                    <div className={styles.infoCard}>
                        <button
                            className={styles.cardEditButton}
                            onClick={() => handleEditClick('horario')}
                        >
                            <FiEdit size={16} />
                        </button>
                        <h2 className={styles.sectionTitle}>
                            <FiClock className={styles.icon} /> Horário de Funcionamento
                        </h2>
                        <div className={styles.timeContainer}>
                            <div className={styles.timeItem}>
                                <span>Abertura:</span>
                                <time>{shopData.horaAbertura || '08:00'}</time>
                            </div>
                            <div className={styles.timeItem}>
                                <span>Fechamento:</span>
                                <time>{shopData.horaDeFechamento || '20:00'}</time>
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <button
                            className={styles.cardEditButton}
                            onClick={() => handleEditClick('localizacao')}
                        >
                            <FiEdit size={16} />
                        </button>
                        <h2 className={styles.sectionTitle}>
                            <FiMapPin className={styles.icon} /> Localização
                        </h2>
                        <p className={styles.address}>
                            {shopData.localizacao || 'Endereço não cadastrado'}
                        </p>
                    </div>

                    <div className={styles.infoCard}>
                        <button
                            className={styles.cardEditButton}
                            onClick={() => handleEditClick('contato')}
                        >
                            <FiEdit size={16} />
                        </button>
                        <h2 className={styles.sectionTitle}>
                            <FiPhone className={styles.icon} /> Contato
                        </h2>
                        <div className={styles.contactInfo}>
                            <p>WhatsApp: {shopData.whatsapp || 'Não informado'}</p>
                            <p>Email: {shopData.email || 'Não informado'}</p>
                        </div>
                    </div>
                </div>
                {/* Descrição */}
                <div style={{ marginBottom: '20px' }} className={styles.descriptionCard}>
                    <button
                        className={styles.cardEditButton}
                        onClick={() => handleEditClick('informacoes')}
                    >
                        <FiEdit size={16} />
                    </button>
                    <h2 className={styles.sectionTitle}>Sobre Nós</h2>
                    <p className={styles.descriptionText}>
                        {shopData.informacoes || 'Nenhuma descrição fornecida.'}
                    </p>
                </div>
                {/* Novo Card de Assinatura (Dentro do grid) */}
                {shopData.subscription_status && (
                    <div className={styles.infoCard}>
                        <h2 className={styles.sectionTitle}>
                            <FiPackage className={styles.icon} /> Assinatura
                        </h2>
                        <div className={styles.subscriptionInfo}>
                            <div className={styles.infoItem}>
                                <span style={{ color: 'black' }}>Status:</span>
                                <span className={`${styles.status} ${styles[shopData.subscription_status] || styles.inactive}`}>
                                    {shopData.subscription_status || "não cadastrado"}
                                </span>
                            </div>

                            <div className={styles.infoItem}>
                                <FiCalendar className={styles.smallIcon} />
                                <span style={{ color: 'black' }}>Início:</span>
                                <span style={{ color: '#808080' }}>
                                    {shopData.subscription_start_date ? formatarData(shopData.subscription_start_date) : "sem plano"}
                                </span>
                            </div>

                            <div className={styles.infoItem}>
                                <FiCalendar className={styles.smallIcon} />
                                <span style={{ color: 'black' }}>Vencimento:</span>
                                <span style={{ color: '#808080' }}>
                                    {shopData.subscription_end_date ? formatarData(shopData.subscription_end_date) : "sem plano"}
                                </span>
                            </div>

                            {shopData.trial_end_date && (
                                <div className={styles.trialInfo}>
                                    <FiDollarSign className={styles.smallIcon} />
                                    <span>Trial até:</span>
                                    <span>
                                        {new Date(shopData.trial_end_date).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BarberShopProfile;