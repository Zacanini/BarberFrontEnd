"use client";
import React, { useState } from 'react';
import styles from '@/app/styles/BarberAdd.module.css';
import useBarberService from '@/hooks/useBarberService';

const BarberEditModal = ({ barber, onClose, onUpdate }) => {
  const barberService = useBarberService();
  const [nome, setNome] = useState(barber.nome);
  const [whatsapp, setWhatsapp] = useState(barber.whatsapp);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const updatedBarber = await barberService.atualizarBarber(barber.id, {
        nome,
        whatsapp
      });
      onUpdate(updatedBarber);
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <div className={styles.header}>
          <h2>Editar Barbeiro</h2>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </div>

        <div className={styles.formContainer}>
          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label style={{color:'#000'}} htmlFor="nome">Nome:</label>
              <input
              style={{color:'#000' , width: '100%' , border: '1px solid #808080' , borderRadius: '5px' , padding: '5px'}}
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label style={{color:'#000'}} htmlFor="whatsapp">WhatsApp:</label>
              <input
              style={{color:'#000' , width: '100%' , border: '1px solid #808080' , borderRadius: '5px' , padding: '5px'}}
                type="text"
                id="whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>

            <div className={styles.buttonGroup}>
              <button type="button" onClick={onClose} className={styles.cancelButton}>
                Cancelar
              </button>
              <button type="submit" className={styles.button}>
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BarberEditModal;