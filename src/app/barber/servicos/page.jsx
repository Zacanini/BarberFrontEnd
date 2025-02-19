"use client";

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import useServicoService from "@/hooks/useServicoService";
import Loading from "@/app/components/Loading";
import styles from "@/app/styles/ServicosPage.module.css";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import NavBar from "@/app/components/NavBar";

const ServicosPage = () => {
  const { token, isAuthReady, user } = useContext(AuthContext);
  const router = useRouter();
  const servicoService = useServicoService();
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ nome: "", valor: "", duracao: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthReady) return;
    if (!token) {
      router.push("/signin");
      return;
    }
    fetchServicos();
  }, [token, isAuthReady, router]);

  const fetchServicos = async () => {
    setLoading(true);
    try {
      const data = await servicoService.obterServicoPorIdShop(user.id);
      setServicos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await servicoService.criarServico({ ...formData, idShop: user.id });
      setFormData({ nome: "", valor: "", duracao: "" });
      setIsModalOpen(false); // Fechar o modal após a criação do serviço
      fetchServicos();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await servicoService.deletarServico(id);
      fetchServicos();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthReady || loading) {
    return <Loading />;
  }

  return (
    <div className={styles.containerMaster}>
      <div className={styles.container}>
        <NavBar />
        <h1 className={styles.title}>Gerenciar Serviços</h1>
        <button onClick={() => setIsModalOpen(true)} className={styles.createButton}>
          <FiPlus /> Criar Serviço
        </button>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.servicosList}>
          {servicos.map((servico) => (
            <div key={servico.id} className={styles.servicoItem}>
              <div className={styles.servicoInfo}>
                <h3>{servico.nome}</h3>
                <p>Valor: R$ {servico.valor}</p>
                <p>Duração: {servico.duracao}</p>
              </div>
              <div className={styles.servicoActions}>
                <button className={styles.editButton}><FiEdit /></button>
                <button className={styles.deleteButton} onClick={() => handleDelete(servico.id)}><FiTrash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para criar serviço */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Criar Serviço</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input type="text" name="nome" placeholder="Nome do serviço" value={formData.nome} onChange={handleInputChange} required />
              <input type="number" name="valor" placeholder="Valor (R$)" value={formData.valor} onChange={handleInputChange} required />
              <input type="text" name="duracao" placeholder="Duração (ex: 30min)" value={formData.duracao} onChange={handleInputChange} required />
              <button type="submit" disabled={loading}><FiPlus /> Adicionar Serviço</button>
            </form>
            <button onClick={() => setIsModalOpen(false)} className={styles.closeButton}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicosPage;