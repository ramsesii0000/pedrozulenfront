import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faBook, faHandHoldingUsd, faExclamationCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'; 
import '../css/Sidebar.css';

function Sidebar({ cambiarVista }) {

  const handleLogout = () => {
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
        window.location.href = '/login';
      }
    });
  };

  return (
    <aside className="sidebar-container">
      <h1 className="title-sidebar">Golden Blog</h1>
      <nav className="nav-container">
        <ul>
          <li><button onClick={() => cambiarVista('categoria')}><FontAwesomeIcon icon={faThLarge} /> Categoria</button></li>
          <li><button onClick={() => cambiarVista('libros')}><FontAwesomeIcon icon={faBook} /> Libros</button></li>
          <li><button onClick={() => cambiarVista('prestamos')}><FontAwesomeIcon icon={faHandHoldingUsd} /> Prestamos</button></li>
          <li><button onClick={() => cambiarVista('multas')}><FontAwesomeIcon icon={faExclamationCircle} /> Multas</button></li>
          <li><button onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión</button></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
