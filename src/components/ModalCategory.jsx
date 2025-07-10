import React, { useState } from 'react';
import '../css/ModalCategory.css'

const ModalCategory = ({ onUpdate, onCancel, initialValue }) => {
  const [updatedValue, setUpdatedValue] = useState(initialValue);

  const handleInputChange = (e) => {
    setUpdatedValue(e.target.value);
  };

  const handleUpdate = () => {
    onUpdate(updatedValue);
  };

  const handleClose = () => {
    onCancel();
  };

  return (
    <div className="modal-category">
      <div className="modal-content-category">
        <h2>Actualizar Categoría</h2>
        <input
          type="text"
          value={updatedValue}
          onChange={handleInputChange}
          placeholder="Nuevo nombre de la categoría"
        />
        <button className="button-update" onClick={handleUpdate}>Actualizar</button>
        <button className='button-cancel' onClick={handleClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default ModalCategory;
