import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHome, faHeart, faShoppingCart, faEnvelope, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../css/Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

  const handleLoginClick = () => {
    if (isLoggedIn) {
      Swal.fire({
        icon: 'question',
        title: 'Cerrar Sesión',
        text: '¿Estás seguro de que deseas cerrar sesión?',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('cartItems');
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          setIsLoggedIn(false);
          Swal.fire({
            icon: 'success',
            title: 'Sesión Cerrada',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.reload(); 
          });
        }
      });
    } else {
      window.location.href = '/login';
    }
  };

  const token = localStorage.getItem('token');

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">
          Biblioteca Central Pedro Zulen
        </span>
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            <FontAwesomeIcon icon={faHome} className="navbar-icon" />
          </Link>
        </li> 
        {token && (
        <li className="navbar-item">
          <Link className="navbar-link" to="/libros">
            <FontAwesomeIcon icon={faBook} className="navbar-icon" />
          </Link>
        </li>
      )}
        
        
        <li className="navbar-item">
          <Link className="navbar-link" to="/favoritos">
            <FontAwesomeIcon icon={faHeart} className="navbar-icon" />
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/carrito">
            <FontAwesomeIcon icon={faShoppingCart} className="navbar-icon" />
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/prestamos">
            <FontAwesomeIcon icon={faHandHoldingUsd} className="navbar-icon"/>
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/contacto">
            <FontAwesomeIcon icon={faEnvelope} className="navbar-icon"/>
          </Link>
        </li>
      
        <div className="navbar-span">
          <li>
            <span className="navbar-span" onClick={handleLoginClick}>
              {isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión'}
            </span>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
