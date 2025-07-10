import React, {useState} from 'react'
import prestamoService from '../service/prestamoService';


const ModalPrestamoUpdate = ({onCancel, initialValue, updateLoans}) => {
    
  const [updatedValuesPrestamo, setUpdatedValuesPrestamo] = useState(initialValue);
  const [selectedSatusPrestamo, setSelectedSatusPrestamo] = useState(initialValue.statusPrestamo);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedValuesPrestamo({ ...updatedValuesPrestamo, [name]: value });
  };

  const handleStatusChange = (e) => {
    setSelectedSatusPrestamo(e.target.value);
    setUpdatedValuesPrestamo({
        ...updatedValuesPrestamo,
        statusPrestamo: e.target.value
    });
  };

  const handleUpdateStatusPrestamo = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      console.log(updatedValuesPrestamo);
      await prestamoService.updateStatusPrestamo(updatedValuesPrestamo.idPrestamo, updatedValuesPrestamo.statusPrestamo, token);

      updateLoans();
      onCancel();
      setUpdatedValuesPrestamo({});
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
    }
  };
  
  const handleClose = () => {
    onCancel();
  };
  
  return (
    <div className="modal-container">
        <div className="modal-overlay" onClick={handleClose}/>
        <div className="modal-content">
            <h3 className="modal-title">Actualizar Prestamo</h3>
            <form className="modal-form" onSubmit={handleUpdateStatusPrestamo}>
                <div className="modal-form-container">
                    <div className="modal-form-group">
                        <label className="modal-label">Fecha Prestamo:</label>
                        <input
                            type="date"
                            name="prestamoDate"
                            value={updatedValuesPrestamo.prestamoDate}
                            className="modal-input"
                            readOnly
                            required
                        />
                    </div>
                    <div className="modal-form-group">
                        <label className="modal-label">Fecha Retorno:</label>
                        <input
                            type="date"
                            name="returnDate"
                            value={updatedValuesPrestamo.returnDate}
                            className="modal-input"
                            readOnly
                            required
                        />
                    </div>
                </div>
                <div className="modal-form-container">
                    <div className="modal-form-group">
                    <label className="modal-label">Estado del Libro:</label>
                    <select className="modal-select" value={selectedSatusPrestamo} onChange={handleStatusChange}>
                        <option key="Entregado" value="Entregado">Entregado</option>
                        <option key="Devuelto" value="Devuelto">Devuelto</option>
                        <option key="Atrasado" value="Atrasado">Atrasado</option>
                        <option key="Pendiente" value="Pendiente">Pendiente</option>
                    </select>
                    </div>
              </div>
              <div className="modal-btn-container">
                <button type="submit" className="modal-submit-btn">Actualizar Prestamo</button>
                <button type="button" onClick={handleClose} className="modal-cancel-btn">Cancelar</button>
            </div>
            </form>
        </div>
        
    </div>
        
  )
}

export default ModalPrestamoUpdate;