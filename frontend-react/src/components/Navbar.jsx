// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import './Navbar.css'; // Archivo de estilos para la barra de navegación

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-title">ReservaApp</h1>
                <ul className="nav-links">
                    <li>
                        <Link to="/" className="nav-link">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/reservas" className="nav-link">Reservas</Link>
                    </li>
                    <li>
                        <Link to="/clientes" className="nav-link">Clientes</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
