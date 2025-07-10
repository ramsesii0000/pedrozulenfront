import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import '../css/FormLoan.css';
import prestamoService from '../service/prestamoService';
import Swal from 'sweetalert2'; 

const FormLoan = ({ show, handleClose }) => {
    const [prestamoRequest, setPrestamoRequest] = useState({
        prestamoDate: getFormattedDate(),
        returnDate: '',
        statusPrestamo: 'Pendiente',
        idUser: localStorage.getItem('userId'),
        listBooks: JSON.parse(localStorage.getItem('cartItems')) || [],
        deletePrestamo: 0
    });

    const [activeLoans, setActiveLoans] = useState([]);

    useEffect(() => {
        fetchActiveLoans();
    }, []);

    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleSubmitPrestamo = async (e) => {
        e.preventDefault();
        try {
            await fetchActiveLoans(); 
            if (hasActiveLoans()) {
                Swal.fire({
                    icon: 'info',
                    title: 'Golden Blog Informa',
                    text: 'Tiene préstamos activos que deben ser gestionados antes de solicitar uno nuevo.'
                });
                return;
            }
    
            const token = localStorage.getItem('token');
            await prestamoService.createPrestamo(
                {
                    prestamo: {
                        prestamoDate: prestamoRequest.prestamoDate,
                        returnDate: prestamoRequest.returnDate,
                        statusPrestamo: prestamoRequest.statusPrestamo,
                        user: {
                            idUser: prestamoRequest.idUser
                        }
                    },
                    books: prestamoRequest.listBooks
                }, token);
            handleClose();
        } catch (error) {
            console.error('Error al crear el préstamo:', error);
        }
    };
    
    const fetchActiveLoans = async () => {
        try {
            const token = localStorage.getItem('token');
            const loans = await prestamoService.getLoansByUserId(prestamoRequest.idUser, token);
            setActiveLoans(loans);
            console.log('Prestamos activos del usuario:', loans); 
        } catch (error) {
            console.error('Error al obtener los préstamos activos:', error);
        }
    };

    const handleCancel = () => {
        handleClose();
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'statusPrestamo') {
            setPrestamoRequest({
                ...prestamoRequest,
                statusPrestamo: value
            });
        } else {
            setPrestamoRequest({
                ...prestamoRequest,
                [name]: value
            });
        }
    };

    const handleKeyPress = (event) => {
        event.preventDefault();
    };

    const calculateReturnDate = (prestamoDate) => {
        const returnDate = new Date(prestamoDate);
        returnDate.setDate(returnDate.getDate() + 14);
        return returnDate.toISOString().slice(0, 10);
    };

    const hasActiveLoans = () => {
        return activeLoans.some(loan => loan.statusPrestamo !== 'Devuelto');
    };

    return (
        <>
            {show && (
                <div className='modal-loan-container' onClick={handleCancel}>
                    <div className='modal-loan-overlay' >
                        <div className='modal-loan-content' onClick={handleContentClick}>
                            <h3 className="modal-loan-title">Formulario de Préstamo</h3>
                            <form className='modal-loan-form' onSubmit={handleSubmitPrestamo}>
                                <div className='modal-loan-form-container'>
                                    <div className="modal-loan-form-group">
                                        <label className="modal-loan-label">Fecha de Préstamo</label>
                                        <input
                                            type="date"
                                            name="prestamoDate"
                                            onChange={handleChange}
                                            value={prestamoRequest.prestamoDate}
                                            className="modal-loan-input"
                                            readOnly
                                            required
                                        />
                                    </div>
                                    <div className="modal-loan-form-group">
                                        <label className="modal-loan-label">Fecha de Retorno</label>
                                        <input
                                            type="date"
                                            name="returnDate"
                                            onChange={handleChange}
                                            className="modal-loan-input"
                                            min={prestamoRequest.prestamoDate}
                                            max={calculateReturnDate(prestamoRequest.prestamoDate)}
                                            onKeyDown={handleKeyPress}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='message-loan-content'>
                                    <p className="modal-loan-return-warning">
                                        <FontAwesomeIcon className='icon-warning' icon={faExclamationTriangle} />Importante
                                    </p>
                                    <p className="modal-loan-return-warning">La devolución de los libros es 2 semanas después de la fecha de préstamo.</p>
                                </div>
                                <div className="modal-loan-btn-container">
                                    <button type="submit" className="modal-loan-submit-btn">Confirmar</button>
                                    <button type="button" onClick={handleCancel} className="modal-loan-cancel-btn">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default FormLoan;
