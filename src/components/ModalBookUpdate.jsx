import React, {useState, useEffect} from 'react'
import categoryService from '../service/categoryService';
import bookService from '../service/bookService';
import { uploadToCloudnary } from '../config/UploadToCloudnary';

const ModalBookUpdate = ({ onCancel, initialValue, updateBooks  }) => {
const [updatedValues, setUpdatedValues] = useState(initialValue);
const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState(initialValue.category);
const [selectedStatusBook, setSelectedStatusBook] = useState(initialValue.statusBook);
 
 
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                const categories = await categoryService.getAllCategory(token);
                setCategories(categories);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }
        };
       
        fetchCategories();
    }, []);
 
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUpdatedValues({ ...updatedValues, [name]: value });
    };
 
    const handleUpdateBook = async (e) => {
      e.preventDefault();
      console.log(updatedValues)
      
      try {
        const token = localStorage.getItem('token');
        await bookService.updateBook(updatedValues.idBook,{
            nameBook: updatedValues.nameBook,
            author: updatedValues.author,
            description: updatedValues.description,
            publicationDate: updatedValues.publicationDate,
            statusBook: updatedValues.statusBook,
            picture: updatedValues.picture,
            category: {
                idCategory: updatedValues.category
            }
        }, token);
       
        updateBooks();
        onCancel();
        setUpdatedValues({});
      } catch (error) {
        console.error('Error al actualizar el libro:', error);
      }
    };
   
    const handleClose = () => {
      onCancel();
    };
   
    const handleCategoryChange = (e) => {
      setSelectedCategory(e.target.value);
      setUpdatedValues({
          ...updatedValues,
          category: e.target.value
      });
    };
   
    const handleStatusBookChange = (e) => {
      setSelectedStatusBook(e.target.value);
      setUpdatedValues({
        ...updatedValues,
        statusBook: e.target.value
      });
    };
 
    const handleChangePicture = async(e) => {
      const file = e.target.files[0];
      if (file && (file.type.startsWith("image/"))) {
          try {
              const imageUrl = await uploadToCloudnary(file);
              setUpdatedValues({
                ...updatedValues,
                picture: imageUrl
              });
 
          } catch (error) {
              console.error('Error al cargar la imagen:', error);
          }
      } else {
          alert("Por favor, selecciona una imagen válida");
      }
  };
   
  return (
    <div className="modal-container">
      <div className="modal-overlay" onClick={handleClose} />
      <div className="modal-content">
      <h3 className="modal-title">Actualizar Libro</h3>
          <form onSubmit={handleUpdateBook} className="modal-form">
            <div className="modal-form-container">
              <div className="modal-form-group">
                <label className="modal-label">Nombre:</label>
                <input
                  type="text"
                  name="nameBook"
                  value={updatedValues.nameBook}
                  onChange={handleInputChange}
                  placeholder="Ingrese el nombre del libro"
                  className="modal-input"
                  required
                />
              </div>
              <div className="modal-form-group">
                <label className="modal-label">Autor:</label>
                <input
                  type="text"
                  name="author"
                  value={updatedValues.author}
                  onChange={handleInputChange}
                  placeholder="Ingrese el autor del libro"
                  className="modal-input"
                  required
                />
              </div>
            </div>
            <div className="modal-form-container">
              <div className="modal-form-group">
                <label className="modal-label">Fecha de Publicación:</label>
                <input
                  type="date"
                  name="publicationDate"
                  value={updatedValues.publicationDate}
                  onChange={handleInputChange}
                  className="modal-input"
                  required
                />
              </div>
            <div className="modal-form-group">
              <label className="modal-label">Categoría:</label>
              <select className="modal-select" value={selectedCategory} onChange={handleCategoryChange}>
                {categories.map(category => (
                  <option key={category.idCategory} value={category.idCategory}>{category.nameCategory}</option>
                ))}
              </select>
              </div>                                            
            </div>
            <div className="modal-form-container">
              <div className="modal-form-group">
                <label className="modal-label">Estado del Libro:</label>
                <select className="modal-select" value={selectedStatusBook} onChange={handleStatusBookChange}>
                  <option key="Disponible" value="Disponible">Disponible</option>
                  <option key="No Disponible" value="No Disponible">No Disponible</option>
                </select>
              </div>  
              <div className="modal-form-group">
                <label className="modal-label">Imagen:</label>
                <input
                  type="text"
                  name="author"
                  value={updatedValues.picture}
                  onChange={handleInputChange}
                  placeholder="Ingrese la imagen del libro"
                  className="modal-input"
                  readOnly
                  required
                />
              </div>                                      
            </div>
            <div className="modal-form-container">
              <div className="modal-form-group">
                <label className="modal-label">Descripción:</label>
                <textarea
                  name="description"
                  value={updatedValues.description}
                  onChange={handleInputChange}
                  placeholder="Ingrese la descripción del libro"
                  className="modal-input description"
                  required
                  />
              </div>
              <div className="modal-form-group">
                <label className="modal-label">Cambiar Imagen:</label>
                <input
                  type='file'
                  name="picture"
                  onChange={handleChangePicture}
                  className="modal-input"
                  />
              </div>
            </div>
            <div className="modal-btn-container">
              <button type="submit" className="modal-submit-btn">Actualizar Libro</button>
              <button type="button" onClick={handleClose} className="modal-cancel-btn">Cancelar</button>
            </div>
          </form>
      </div>
    </div>
   
  )
}
 
export default ModalBookUpdate