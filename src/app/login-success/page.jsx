// src/app/login-success/page.jsx
"use client";

import { useEffect, useContext } from 'react';
import { AuthContext } from '../../app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Loading from '../components/Loading';

export default function Page() {
  const { isAuthReady, token } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthReady) {
      return; // Aguarda a inicialização da autenticação
    }

    if (!token) {
      router.push('/signin');
      return;
    }

    // Redireciona para o dashboard após 5 segundos
    const timeoutId = setTimeout(() => {
      router.push('/dashBoard');
    }, 2000);

    // Limpa o timeout se o componente for desmontado
    return () => clearTimeout(timeoutId);
  }, [token, isAuthReady, router]);

  if (!isAuthReady) {
    return <Loading />; // Use o componente Loading aqui
  }

  return (
    <div>
      <Loading />
    </div>
  );
}