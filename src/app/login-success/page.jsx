// src/app/login-success/page.jsx
"use client";

import { useEffect, useContext } from 'react';
import { AuthContext } from '../../app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { user, token, logout, isAuthReady } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthReady) {
      return; // Aguarda a inicialização da autenticação
    }

    if (!token) {
      router.push('/signin');
    }
  }, [token, isAuthReady, router]);

  if (!isAuthReady) {
    return <div>Carregando...</div>; // Ou um spinner
  }

  if (!user) {
    return null; // Não renderiza nada se não estiver autenticado (já redirecionou)
  }

  return (
    <>
      <div>Cadastro realizado com sucesso</div>
      <p>Bem-vindo, {user.email}!</p>
      <button onClick={logout}>deslogar</button>
    </>
  );
}