import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../css/BookCatalog.css';
import userService from '../service/userService';
import Swal from 'sweetalert2';
 
const BookCatalog = ({ books, filter }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [currentPage, books]);
 
  const booksPerPage = 8;
 
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
 
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
 
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
 
  const filteredBooks = books && books.length > 0
    ? books.filter(book => {
        if (filter === 'all') return true;
        return book.statusBook === filter;
      })
    : [];
 
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
 
  const addFavoriteBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: 'info',
          title: 'Golden Blog Informa',
          text: 'Debes iniciar sesión para agregar libros a favoritos',
        });
        return;
      }
      const userId = localStorage.getItem('userId');
      await userService.userAddFavoriteBook(userId, bookId, token);
    } catch (error) {
      console.error('Error al agregar libro a favoritos:', error);
    }
  };
 
  return (
    <div className="book-catalog">
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="book-list">
          {currentBooks.length === 0 ? (
            <div className="centered-message">
              <p >No se encontraron libros para el estado seleccionado.</p>
            </div>
          ) : (
            currentBooks.map(book => (
              <div key={book.idBook} className="book-item">
                <div className="book-actions">
                  <FontAwesomeIcon icon={faHeart} onClick={() => addFavoriteBook(book.idBook)} />
                </div>
                <img src={book.picture} alt={book.nameBook} />
                <div className="book-info">
                  <h2>{book.nameBook}</h2>
                  <p>{book.author}</p>
                  <p className="state">{book.statusBook}</p>
                </div>
                <Link to={`/detail/${book.idBook}`} className="btn-ver-mas">Ver más</Link>
              </div>
            ))
          )}
        </div>
      )}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
        <button onClick={nextPage} disabled={currentBooks.length < booksPerPage}>Siguiente</button>
      </div>
    </div>
  );
};
 
export default BookCatalog;