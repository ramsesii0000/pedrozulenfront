import React, {useState} from 'react'
import multaService from '../service/multaService';
 
const ModalCreateMulta = ({ initialValue ,onCancelCreateMulta}) => {
 
    const [multaData, setMultaData] = useState({
        descriptionMulta: '',
        typeMulta: 'No retorno de libros',
        multaDate: getFormattedDate(),
        statusMulta: 'Pendiente',
        montoTotal: 20.0,
        deleteMulta: 0
    });
    const [idPrestamo, setIdPrestamo] = useState(initialValue.idPrestamo);
 
    const handleSubmitMulta = async (e) => {
        e.preventDefault();
        console.log(idPrestamo);
        try {
          const token = localStorage.getItem('token');
          await multaService.createMulta(
            {
                descriptionMulta: multaData.descriptionMulta,
                typeMulta: multaData.typeMulta,
                description: multaData.description,
                multaDate: multaData.multaDate,
                statusMulta: 'Pendiente',
                montoTotal: multaData.montoTotal,
                deleteMulta: multaData.deleteMulta,
                prestamo: {
                    idPrestamo: idPrestamo
                }
            }, token);
            handleClose();
        } catch (error) {
            console.error('Error al crear la multa:', error);
        }
    };
 
    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'statusMulta') {
            setMultaData({
                ...multaData,
                statusMulta: value
            });
        } else {
            setMultaData({
                ...multaData,
                [name]: value
            });
        }
    };
 
    const handleMultaTypeChange = (e) => {
        const { name, value } = e.target;
        const montos = {
            'No retorno de libros': 20.0,
            'Daño a los libros': 30.0
        };
 
        setMultaData({
            ...multaData,
            [name]: value,
            montoTotal: montos[value] || null
        });
    };
 
    const handleClose = () => {
        onCancelCreateMulta();
      };
 
 
    return (
        <div className="modal-container">
            <div className="modal-overlay" onClick={handleClose}/>
            <div className="modal-content">
                <h3 className="modal-title">Agregar Multa</h3>
                <form className="modal-form" onSubmit={handleSubmitMulta}>
                    <div className="modal-form-container">
                        <div className="modal-form-group">
                            <label className="modal-label">Fecha de Multa:</label>
                            <input
                            type="date"
                            name="multaDate"
                            value={multaData.multaDate}
                            onChange={handleChange}
                            className="modal-input"
                            required
                            readOnly
                            />
                        </div>
                        <div className="modal-form-group">
                            <label className="modal-label">Tipo de Multa:</label>
                            <select className="modal-select" value={multaData.typeMulta} name='typeMulta'  onChange={handleMultaTypeChange}>
                                <option key="No retorno de libros" value="No retorno de libros">No retorno de libros</option>
                                <option key="Daño a los libros" value="Daño a los libros">Daño a los libros</option>
                            </select>
                        </div>  
                    </div>
                    <div className="modal-form-container">
                        <div className="modal-form-group">
                            <label className="modal-label">Descripción:</label>
                            <textarea
                            name="descriptionMulta"
                            value={multaData.descriptionMulta}
                            onChange={handleChange}
                            placeholder="Ingrese la descripción del libro"
                            className="modal-input description"
                            required
                            />
                        </div>                          
                        <div className="modal-form-group">
                            <label className="modal-label">Monto:</label>
                            <input
                            name='montoTotal'
                            type="number"
                            step="any"
                            value={multaData.montoTotal}
                            onChange={handleChange}
                            className="modal-input"
                            required
                            readOnly
                            />
                        </div>
                    </div>
                    <div className="modal-btn-container">
                        <button type="submit" className="modal-submit-btn">Agregar Multa</button>
                        <button type="button" onClick={handleClose} className="modal-cancel-btn">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
 
export default ModalCreateMulta