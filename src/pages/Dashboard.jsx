// Dashboard.js
import React, { useState } from 'react';
import Category from '../components/Category';
import Book from '../components/Book';
import Loan from '../components/Loan';
import Fines from '../components/Fines';
import Sidebar from '../components/Sidebar';
import '../css/Dashoboard.css'


export const Dashboard = () => {
  const [vista, setVista] = useState('categoria');

  const cambiarVista = (nuevaVista) => {
    setVista(nuevaVista);
  };

  return (
    <div className="dashboard-container">
      <Sidebar cambiarVista={cambiarVista} />
      <div className="content">
        {vista === 'categoria' && <Category />}
        {vista === 'libros' && <Book />}
        {vista === 'prestamos' && <Loan />}
        {vista === 'multas' && <Fines />}
      </div>
    </div>
  );
};

export default Dashboard;
