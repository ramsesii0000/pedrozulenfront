import React from 'react'

const ModalVerMasPrestamo = ({onCancelVerMas, initialValueVerMas}) => {

    const handleClose = () => {
        onCancelVerMas();
      };

    return (
        <div className="modal-container">
            <div className="modal-overlay" onClick={handleClose}/>
            <div className="modal-content">
                <h3 className="modal-title">Detalle Prestamo</h3>
                <form className="modal-form">
                <div className="modal-form-container">
                    <div className="modal-form-group">
                        <label className="modal-label">Libros:</label>
                        <ul>
                        {initialValueVerMas.detallePrestamo.map((detail, index) => (
                            <li key={index}>
                            {<span>{detail.book.nameBook}</span>}
                            {/*<img style={{ width: '100px', height: '150px' }} src={detail.book.picture} alt="Imagen del libro" />*/}
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
                <div className="modal-btn-container">
                    <button type="button" onClick={handleClose} className="modal-cancel-btn">SALIR</button>
                </div>
                </form>
                
            </div>
        </div>
        )
    }

export default ModalVerMasPrestamo