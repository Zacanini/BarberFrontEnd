import React, { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaUser, FaCalendarAlt, FaCog, FaBars } from 'react-icons/fa';
import '../styles/NavBar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(true); // Inicia aberto por padrão

    const toggleNavBar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`navbar ${isOpen ? 'open' : 'closed'}`}>
            <ul className="navbar-nav">
                <li className="nav-item" >
                    <a className="nav-link" onClick={toggleNavBar} >
                        <FaBars className="nav-icon" />
                    </a>
                </li>
                <li className="nav-item">
                    <Link href="/dashBoard" className="nav-link" legacyBehavior>
                        <a className="nav-link">
                            <FaHome className="nav-icon" />
                            <span className="nav-text">Início</span>
                        </a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/barber/perfil" className="nav-link" legacyBehavior>
                        <a className="nav-link">
                            <FaUser className="nav-icon" />
                            <span className="nav-text">Perfil</span>
                        </a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/agendamentos" className="nav-link" legacyBehavior>
                        <a className="nav-link">
                            <FaCalendarAlt className="nav-icon" />
                            <span className="nav-text">Agendamentos</span>
                        </a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/configuracoes" className="nav-link" legacyBehavior>
                        <a className="nav-link">
                            <FaCog className="nav-icon" />
                            <span className="nav-text">Configurações</span>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default NavBar;