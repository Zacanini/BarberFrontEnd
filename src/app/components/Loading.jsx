// src/app/components/Loading.jsx
import styles from '../styles/Loading.module.css';
import { useEffect, useState } from 'react';

export default function Loading({ message = "Carregando", fullScreen = false }) {
  const [dots, setDots] = useState('.');
  
  // Animação dos pontos para feedback visual
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '.');
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.loadingContainer} ${fullScreen ? styles.fullScreen : ''}`}>
      <div className={styles.loadingContent}>
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
          <div className={styles.spinnerGlow}></div>
        </div>
        <div className={styles.loadingText}>
          {message}<span className={styles.dots}>{dots}</span>
        </div>
      </div>
    </div>
  );
}