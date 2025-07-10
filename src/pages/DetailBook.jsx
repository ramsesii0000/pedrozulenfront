import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bookService from '../service/bookService';
import { useCart } from '../context/CartContext'; 
import '../css/DetailBook.css';
import Swal from 'sweetalert2';

const DetailBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { addToCart, cartItems } = useCart(); 

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookDetails = await bookService.getBookById(id); 
        setBook(bookDetails);
      } catch (error) {
        console.error('Error al obtener detalles del libro:', error);
      }
    };

    fetchBookDetails(); 
  }, [id]);

  useEffect(() => {
    let successTimeout, errorTimeout;

    if (showSuccess) {
      successTimeout = setTimeout(() => setShowSuccess(false), 1500);
    }

    if (showError) {
      errorTimeout = setTimeout(() => setShowError(false), 1500);
    }

    return () => {
      clearTimeout(successTimeout);
      clearTimeout(errorTimeout);
    };
  }, [showSuccess, showError]);

  const isTokenAvailable = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  const handleAddToCart = () => {
    if (book) {
        if (book.statusBook === "No Disponible") {
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'El libro aún no está disponible.'
            });
            return;
        }

        if (!isTokenAvailable()) { 
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes iniciar sesión para agregar libros al carrito.'
            });
            return;
        }

        const isBookInCart = cartItems.some(item => item.idBook === book.idBook); 
        if (!isBookInCart) {
            addToCart(book); 
            setShowSuccess(true);
        } else {
            setShowError(true);
        }
     }
  };

  return (
    <div className="detail-book">
      {book ? ( 
        <div className="container-book-detail">
          <div className="image-detail-container">
            <img src={book.picture} alt={book.nameBook} />
          </div>
          <div className="detail-container">
            <h2>{book.nameBook}</h2>
            <p className="author">{book.author}</p>
            <p className="description">{book.description}</p>
            <p className="publicationDate">{book.publicationDate}</p>
            <button onClick={handleAddToCart} className="add-to-cart-button">
              Agregar al carrito de Préstamos
            </button>
            {showSuccess && (
              <div className="success-message">
                Se ha agregado el libro al carrito con éxito.
              </div>
            )}
            {showError && (
              <div className="error-message">
                Este libro ya está en el carrito.
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Cargando detalles del libro...</p>
      )}
      
    </div>
  );
}

export default DetailBook;
