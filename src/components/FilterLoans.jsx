import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../css/FilterLoans.css'

const FilterLoans = ({ onFilter, onResetGrid }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilter = () => {
        if (startDate && endDate) {
            onFilter(startDate, endDate);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor seleccione ambas fechas',
            });
        }
    };

    const handleClear = () => {
        setStartDate('');
        setEndDate('');
        onResetGrid();
    };

    return (
        <div className='filter-loans-container'>
            <label className='lbl-startDate'>Fecha Inicio</label>
            <input
                className='start-date-loan'
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <label className='lbl-endDate'>Fecha Fin</label>
            <input
                className='end-date-loan'
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <button className='filter-btn' onClick={handleFilter}>Filtrar</button>
            <button className='clear-btn' onClick={handleClear}>Limpiar</button>
        </div>
    );
};

export default FilterLoans;
