import React, { useState, useEffect } from 'react';
import '../css/AddBook.css';
import bookService from '../service/bookService'; 
import categoryService from '../service/categoryService';
import { uploadToCloudnary } from '../config/UploadToCloudnary';

const AddBook = ({ show, handleClose }) => {
    const [categories, setCategories] = useState([]);
    const [bookData, setBookData] = useState({
        nameBook: '',
        author: '', 
        description: '',
        publicationDate: '',
        picture: '',
        statusBook: 'Disponible'
    });
    const [selectedCategory, setSelectedCategory] = useState('');

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'statusBook') {
            setBookData({
                ...bookData,
                statusBook: value
            });
        } else {
            setBookData({
                ...bookData,
                [name]: value
            });
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setBookData({
            ...bookData,
            idCategoria: e.target.value
        });
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        console.log('Datos del libro:', bookData);
        try {
            const token = localStorage.getItem('token'); 
            await bookService.createBook({ 
                nameBook: bookData.nameBook,
                author: bookData.author,
                description: bookData.description,
                publicationDate: bookData.publicationDate,
                statusBook: 'Disponible',
                picture: bookData.picture,
                category: {
                    idCategory: parseInt(selectedCategory)
                }
            }, token);

            setBookData({
                nameBook: '',
                author: '',               
                description: '', 
                publicationDate: '',
                statusBook: 'Disponible',
                picture: '',
                category: ''
            });
            setSelectedCategory('');
            handleClose();
        } catch (error) {
            console.error('Error al agregar libro:', error);
        }
    };

    const handleOnChange = async(e) => {
        const file = e.target.files[0];
        if (file && (file.type.startsWith("image/"))) {
            try {
                const imageUrl = await uploadToCloudnary(file);
                setBookData({
                    ...bookData,
                    picture: imageUrl 
                });

            } catch (error) {
                console.error('Error al cargar la imagen:', error);
            }
        } else {
            alert("Por favor, selecciona una imagen válida");
        }
    };

    const handleCancel = () => {
        handleClose();
    };

    return (
        <>
            {show && (
                <div className="modal-container">
                    <div className="modal-overlay" onClick={handleCancel} />
                    <div className="modal-content">
                        <h3 className="modal-title">Agregar Libro</h3>
                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="modal-form-container">
                                <div className="modal-form-group">
                                    <label className="modal-label">Nombre:</label>
                                    <input
                                        type="text"
                                        name="nameBook"
                                        value={bookData.nameBook}
                                        onChange={handleChange}
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
                                        value={bookData.author}
                                        onChange={handleChange}
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
                                        value={bookData.publicationDate}
                                        onChange={handleChange}
                                        className="modal-input"
                                        required
                                    />
                                </div>                               
                                <div className="modal-form-group">
                                    <label className="modal-label">Categoría:</label>
                                    <select className="modal-select" value={selectedCategory} onChange={handleCategoryChange}>
                                        <option value="category">Categoría</option>
                                        {categories.map(category => (
                                            <option key={category.idCategory} value={category.idCategory}>{category.nameCategory}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="modal-form-container">
                                <div className="modal-form-group">
                                    <label className="modal-label">Descripción:</label>
                                    <textarea
                                        name="description"
                                        value={bookData.description}
                                        onChange={handleChange}
                                        placeholder="Ingrese la descripción del libro"
                                        className="modal-input description"
                                        required
                                    />
                                </div>                           
                                <div className="modal-form-group">
                                    <label className="modal-label">Imagen:</label>
                                    <input
                                        type="file"
                                        name="picture"
                                        onChange={handleOnChange}
                                        className="modal-input"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-btn-container">
                                <button type="submit" className="modal-submit-btn">Agregar Libro</button>
                                <button type="button" onClick={handleCancel} className="modal-cancel-btn">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>            
            )}
        </>
    );
};

export default AddBook;
