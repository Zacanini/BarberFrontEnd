import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { FaHome, FaUser, FaCalendarAlt, FaBars, FaCut, FaChartLine, FaHistory } from 'react-icons/fa';
import { AuthContext } from '@/app/context/AuthContext';
import '../styles/NavBar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const isShop = user?.role === 'shop';
    const isBarber = user?.role === 'barber';
    const isUser = user?.role === 'user';

    const toggleNavBar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`navbar ${isOpen ? 'open' : 'closed'}`}>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" onClick={toggleNavBar}>
                        <FaBars className="nav-icon" />
                    </a>
                </li>
                <li className="nav-item">
                    <Link href="/pages/dashBoard" className="nav-link" legacyBehavior>
                        <a className="nav-link">
                            <FaHome className="nav-icon" />
                            <span className="nav-text">Início</span>
                        </a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href={isUser ? "/pages/user/perfil" : "/pages/barber/perfil"} className="nav-link" legacyBehavior>
                        <a className="nav-link">
                            <FaUser className="nav-icon" />
                            <span className="nav-text">Perfil</span>
                        </a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href={isUser ? "/pages/user/agendamentos" : "/pages/agendamentos"} className="nav-link" legacyBehavior>
                        <a className="nav-link">
                            <FaCalendarAlt className="nav-icon" />
                            <span className="nav-text">Agendamentos</span>
                        </a>
                    </Link>
                </li>
                
                {(isShop || isBarber) && (
                    <>
                        <li className="nav-item">
                            <Link href="/pages/barber/servicos" className="nav-link" legacyBehavior>
                                <a className="nav-link">
                                    <FaCut className="nav-icon" />
                                    <span className="nav-text">Serviços</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/pages/barber/metricas" className="nav-link" legacyBehavior>
                                <a className="nav-link">
                                    <FaChartLine className="nav-icon" />
                                    <span className="nav-text">Métricas</span>
                                </a>
                            </Link>
                        </li>
                    </>
                )}
                
                {isUser && (
                    <li className="nav-item">
                        <Link href="/pages/user/historico" className="nav-link" legacyBehavior>
                            <a className="nav-link">
                                <FaHistory className="nav-icon" />
                                <span className="nav-text">Histórico</span>
                            </a>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default NavBar;