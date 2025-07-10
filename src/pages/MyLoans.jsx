import React, { useState, useEffect } from 'react';
import prestamoService from '../service/prestamoService';
import detailsPretamoService from '../service/detailPrestamoService';
import prestamo from '../assets/img/prestamos.jpeg';
import '../css/MyLoans.css';

const MyLoans = () => {
    const [loans, setLoans] = useState([]);
    const [selectedLoan, setSelectedLoan] = useState(null); 
    const [details, setDetails] = useState([]);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const loansData = await prestamoService.getLoansByUserId(userId, token);
                setLoans(loansData);
            } catch (error) {
                console.error("Error al obtener los préstamos:", error);
            }
        };

        if (userId && token) { 
            fetchLoans();
        } else {
            console.warn("No hay un usuario autenticado");
        }
    }, [userId, token]);

    const detailsLoans = async (prestamoId) => { 
        try {
            const dataDetail = await detailsPretamoService.getDetails(prestamoId, token);
            setDetails(dataDetail);
        } catch (error) {
            console.error('Error al cargar los detalles del préstamo:', error);
        }
    }

    const toggleDetails = async (loanId) => {
        if (selectedLoan === loanId) {
            setSelectedLoan(null);
            setDetails([]); 
        } else {
            setSelectedLoan(loanId);
            await detailsLoans(loanId);
        }
    }

    return (
        <div className='my-loans-container'>
            <div className='my-loan-title'>
                <h2 className='title-favorite'>Mis Préstamos</h2>
            </div>
            <div className='loans-container'>
                {loans.length === 0 ? (
                    <div className="empty-loans-container">
                        <p className='title-empty-loans'>No ha realizado Ningún Préstamo.</p>
                        <img src={prestamo} alt='sin prestamos' className='img-loans-empty' />
                        <p className='paragraph-empty-loans'>¡Explora nuestra colección de libros y encuentra tu próxima lectura!</p>
                        <p className='paragraph-empty-loans'>Una vez que encuentres un libro que te interese, puedes solicitar un préstamo.</p>
                    </div>
                
                ) : (
                    loans.map(loan => (
                        <div key={loan.idPrestamo}>
                            <div className='details-loans'>
                                <p>Prestamo: {loan.prestamoDate}</p>
                                <p>Retorno: {loan.returnDate}</p>
                                <p>Estado: {loan.statusPrestamo}</p>
                                <button onClick={() => toggleDetails(loan.idPrestamo)}>
                                    {selectedLoan === loan.idPrestamo ? 'Ocultar libros' : 'Ver libros'}
                                </button>
                            </div>
                            {selectedLoan === loan.idPrestamo && 
                                <div className='details-loans-books'>
                                    {details.map((detail, index) => (
                                        <div key={index} className='detail-item-book'>
                                            <p>{detail.book.nameBook}</p>
                                            <img src={detail.book.picture} alt={detail.book.nameBook} />
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyLoans;
