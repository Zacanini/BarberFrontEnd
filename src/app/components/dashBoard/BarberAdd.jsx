"use client";

import React, { useState, useEffect } from 'react';
import useBarberService from '@/hooks/useBarberService';
import styles from '../../styles/BarberAdd.module.css';

const BarberAdd = ({ userLoged }) => {
    const barberService = useBarberService();
    const [nome, setNome] = useState('');
    const [tipoBarber, setTipoBarber] = useState('funcionario');
    const [whatsapp, setWhatsapp] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        try {
            const dadosBarber = {
                nome,
                idShop: userLoged.id,
                oauthId: userLoged.oauthId || null,
                tipoBarber,
                whatsapp,
            };
            await barberService.criarBarber(dadosBarber);
            setSuccessMessage('Barbeiro criado com sucesso!');

            // Resetar formulário e fechar popup após 5 segundos
            setTimeout(() => {
                setSuccessMessage(null);
                setShowPopup(false);
                setNome('');
                setTipoBarber('funcionario');
                setWhatsapp('');
            }, 5000);

        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    };

    return (
        <div className={styles.container}>
            <button
                onClick={() => {
                    setShowPopup(true);
                    setError(null);  // Resetar mensagens ao abrir
                    setSuccessMessage(null);
                }}
                className={styles.openButton}
            >
                Adicionar Barbeiro
            </button>

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
                            {successMessage && <div className={styles.success}>{successMessage}</div>}

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
        </div>
    );
};

export default BarberAdd;