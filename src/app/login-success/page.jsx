// src/app/login-success/page.jsx
"use client";

import { useEffect } from 'react';
import AuthService from '../../services/AuthService';

export default function Page() {
  useEffect(() => {
    const token = AuthService.checkAuthToken();
    if (!token) {
      window.location.href = '/signin';
    }
  }, []);
  const deslogar = () => {
    AuthService.logout();
    };

  return (
    <>
        <div>Cadastro realizado com sucesso</div>
        <button onClick={deslogar}>deslogar</button>
    </>
    
  );
}