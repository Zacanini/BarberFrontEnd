"use client";

import React, { useState, useEffect } from 'react';
import useBarberService from '@/hooks/useBarberService';
import styles from '../../styles/BarberAdd.module.css';
import { FiCopy } from 'react-icons/fi';

const BarberAdd = ({ userLoged , onBarberCriado  }) => {
    const barberService = useBarberService();
    const [nome, setNome] = useState('');
    const [tipoBarber, setTipoBarber] = useState('funcionario');
    const [whatsapp, setWhatsapp] = useState('');
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const dadosBarber = {
                nome,
                idShop: userLoged.id,
                oauthId: userLoged.oauthId || null,
                tipoBarber,
                whatsapp,
            };
            
            const response = await barberService.criarBarber(dadosBarber);
            onBarberCriado(response);
            
            // Fechar popup do formulário
            setShowPopup(false);
            
            // Mostrar modal de sucesso com senha
            setGeneratedPassword(response.senhaNaoCriptografada);
            setShowSuccessModal(true);

            // Resetar formulário
            setNome('');
            setTipoBarber('funcionario');
            setWhatsapp('');

        } catch (error) {
            setError(error.message);
            setTimeout(() => setError(null), 5000);
        }
    };

    const copyPassword = async () => {
        try {
            await navigator.clipboard.writeText(generatedPassword);
            alert('Senha copiada para a área de transferência!');
        } catch (err) {
            console.error('Erro ao copiar senha:', err);
        }
    };

    return (
        <div className={styles.container}>
            <button
                onClick={() => {
                    setShowPopup(true);
                    setError(null);
                }}
                className={styles.openButton}
            >
                Adicionar Barbeiro
            </button>

            {/* Modal do Formulário */}
            {showPopup && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popupContent}>
                        <div className={styles.header}>
                            <h2>Adicionar Barbeiro</h2>
                            <button
                                onClick={() => setShowPopup(false)}
                                className={styles.closeButton}
                            >
                                &times;
                            </button>
                        </div>

                        <div className={styles.formContainer}>
                            {error && <div className={styles.error}>{error}</div>}

                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="nome" className={styles.label}>Nome:</label>
                                    <input
                                        type="text"
                                        id="nome"
                                        className={styles.input}
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="tipoBarber" className={styles.label}>Tipo:</label>
                                    <select
                                        id="tipoBarber"
                                        className={styles.select}
                                        value={tipoBarber}
                                        onChange={(e) => setTipoBarber(e.target.value)}
                                        required
                                    >
                                        <option value="funcionario">Funcionário</option>
                                        <option value="gerente">Gerente</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="whatsapp" className={styles.label}>WhatsApp:</label>
                                    <input
                                        type="text"
                                        id="whatsapp"
                                        className={styles.input}
                                        value={whatsapp}
                                        onChange={(e) => setWhatsapp(e.target.value)}
                                    />
                                </div>
                                
                                <div className={styles.buttonGroup}>
                                    <button
                                        type="button"
                                        onClick={() => setShowPopup(false)}
                                        className={styles.cancelButton}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className={styles.button}>
                                        Adicionar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Sucesso com Senha */}
            {showSuccessModal && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popupContent}>
                        <div className={styles.header}>
                            <h2>Barbeiro Criado com Sucesso!</h2>
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className={styles.closeButton}
                            >
                                &times;
                            </button>
                        </div>

                        <div className={styles.formContainer}>
                            <div className={styles.passwordAlert}>
                                <p style={{ fontSize: '1.2rem' , letterSpacing: '1px' , color:'#080402' }}>
                                    Guarde esta senha de acesso com segurança:
                                </p>
                                
                                <div style={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
                                    <span style={{ fontSize: '1.4rem' , letterSpacing: '1px' , fontWeight:'800' , color:'#080402',marginRight: '10px', marginTop: '10px' }}>	
                                        {generatedPassword}
                                    </span>
                                    <button 
                                        onClick={copyPassword}
                                        style={{display:'flex', flexDirection:'row', fontSize: '1.2rem' , letterSpacing: '1px' ,  color:'#080402',marginTop: '10px', rowGap: '5px', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}
                                    >
                                      <FiCopy />  Copiar 
                                    </button>
                                    
                                </div>

                                <p style={{ fontSize: '1.2rem' , letterSpacing: '1px' , color:'#080402', marginTop: '10px' }}>
                                    Esta senha não poderá ser recuperada posteriormente
                                </p>
                            </div>

                            <div className={styles.buttonGroup}>
                                <button
                                    onClick={() => setShowSuccessModal(false)}
                                    className={styles.button}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BarberAdd;