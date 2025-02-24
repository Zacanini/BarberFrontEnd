"use client";
import React from 'react';
import styles from '@/app/styles/ServicosPage.module.css';
import { FiTrash } from 'react-icons/fi';

const BarberList = ({ barbeiros, onDelete }) => {
  return (
    <div className={styles.servicosGrid}>
      {barbeiros.map((barbeiro) => (
        <div key={barbeiro.id} className={styles.servicoItem}>
          <div className={styles.servicoInfo}>
            <h3>{barbeiro.nome}</h3>
            <p>WhatsApp: {barbeiro.whatsapp}</p>
            {barbeiro.tipoBarber && <p>Tipo: {barbeiro.tipoBarber}</p>}
          </div>
          <div className={styles.servicoActions}>
            <button 
              className={styles.deleteButton} 
              onClick={() => onDelete(barbeiro.id)}
            >
              <FiTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarberList;