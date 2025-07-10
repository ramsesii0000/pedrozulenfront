import React,{useState} from 'react'
import multaService from '../service/multaService';
 
const ModalUpdateMulta = ({onCancel, initValue, updateMultas}) => {
  const [updatedValues, setUpdatedValues] = useState(initValue);
 
 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedValues({ ...updatedValues, [name]: value });
  };
 
  const handleMultaTypeChange = (e) => {
    const { name, value } = e.target;
    const montos = {
        'No retorno de libros': 20.0,
        'Daño a los libros': 30.0
    };
    setUpdatedValues({
        ...updatedValues,
        [name]: value,
        montoTotal: montos[value] || null
    });
  }
 
  const handleUpdateMulta = async (e) => {
    e.preventDefault();
   
    try {
      const token = localStorage.getItem('token');
      await multaService.updateMulta(updatedValues.idMulta,{
        descriptionMulta: updatedValues.descriptionMulta,
        typeMulta: updatedValues.typeMulta,
        multaDate: updatedValues.multaDate,
        statusMulta: updatedValues.statusMulta,
        montoTotal: updatedValues.montoTotal,
        prestamo: {
            idPrestamo: updatedValues.idPrestamo
        }
      }, token);
     
      updateMultas();
      onCancel();
      setUpdatedValues({});
    } catch (error) {
      console.error('Error al actualizar la multa:', error);
    }
  };
 
  const handleClose = () => {
    onCancel();
  }
 
  return (
    <div className="modal-container">
      <div className="modal-overlay" onClick={handleClose}/>
      <div className="modal-content">
          <h3 className="modal-title">Actualizar Multa</h3>
          <form className="modal-form" onSubmit={handleUpdateMulta}>
              <div className="modal-form-container">
                  <div className="modal-form-group">
                      <label className="modal-label">Fecha de Multa:</label>
                      <input
                      type="date"
                      name="multaDate"
                      value={updatedValues.multaDate}
                      className="modal-input"
                      onChange={handleInputChange}
                      required
                      readOnly
                      />
                  </div>
                  <div className="modal-form-group">
                      <label className="modal-label">Tipo de Multa:</label>
                      <select className="modal-select" name='typeMulta' value={updatedValues.typeMulta} onChange={handleMultaTypeChange}>
                          <option key="No retorno de libros" value="No retorno de libros">No retorno de libros</option>
                          <option key="Daño a los libros" value="Daño a los libros">Daño a los libros</option>
                      </select>
                  </div>  
              </div>
              <div className="modal-form-container">
                  <div className="modal-form-group">
                      <label className="modal-label">Monto:</label>
                      <input
                      name='montoTotal'
                      type="number"
                      step="any"
                      value={updatedValues.montoTotal}
                      className="modal-input"
                      onChange={handleInputChange}
                      required
                      readOnly
                      />
                  </div>
                  <div className="modal-form-group">
                      <label className="modal-label">Estado:</label>
                      <select className="modal-select" name='statusMulta' value={updatedValues.statusMulta} onChange={handleInputChange}>
                          <option key="Pendiente" value="Pendiente">Pendiente</option>
                          <option key="Cobrado" value="Cobrado">Cobrado</option>
                      </select>
                  </div>
              </div>
              <div className="modal-form-container">
                <div className="modal-form-group">
                    <label className="modal-label">Descripción:</label>
                    <textarea
                    name="descriptionMulta"
                    placeholder="Ingrese la descripción del libro"
                    className="modal-input description"
                    value={updatedValues.descriptionMulta}
                    onChange={handleInputChange}
                    required
                    />
                </div>  
              </div>
              <div className="modal-btn-container">
                  <button type="submit" className="modal-submit-btn">Actualizar Multa</button>
                  <button type="button" className="modal-cancel-btn" onClick={handleClose}>Cancelar</button>
              </div>
          </form>
      </div>
  </div>
  )
}
 
export default ModalUpdateMulta