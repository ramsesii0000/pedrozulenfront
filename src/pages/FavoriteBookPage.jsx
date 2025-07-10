import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import favorito from '../assets/img/favorite.png';
import '../css/FavoriteBook.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import userService from '../service/userService';
import Swal from 'sweetalert2';

const FavoriteBookPage = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(true); 
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userService.userListFavoriteBook(userId, token);
        setFavoriteBooks(data);
        setLoading(false); 
      } catch (error) {
        console.error('Error al obtener la lista de libros favoritos:', error);
        setLoading(false); 
      }
    };

    fetchData();
  }, [userId, token]);

  const handleDeleteFavoriteBook = async (bookId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este libro de tus favoritos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        await userService.userDeleteFavoriteBook(userId, bookId, token);
        const updatedBooks = await userService.userListFavoriteBook(userId, token);
        setFavoriteBooks(updatedBooks);
      } catch (error) {
        console.error('Error al eliminar libro de favoritos:', error);
      }
    }
  };

  return (
    <div>
      <div className='title-favorite-container'>
        <h2 className='title-favorite'>Mis Libros favoritos</h2>
      </div>
      {loading ? ( 
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : favoriteBooks.length === 0 ? (
        <div className="empty-favorite-books">
          <p className='title-empty-books'>No tienes libros favoritos aún.</p>
          <img src={favorito} alt='sin libro favoritos' />
          <p className='paragraph-empty-books'>Explora, descubre y guarda tus próximas aventuras literarias en favoritos.</p>
          <p className='paragraph-empty-books'>¡Tu próxima gran historia te está esperando!</p>
          <Link to="/libros" className="link-to-books">Explorar Libros</Link>
        </div>
      ) : (
        <div className="book-favorite-list">
          {favoriteBooks.map(book => (
            <div key={book.idBook} className="book-favorite-item">
              <div className="book-favorite-actions">
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteFavoriteBook(book.idBook)} />
              </div>
              <img src={book.picture} alt={book.nameBook} />
              <div className="book-favorite-info">
                <h2>{book.nameBook}</h2>
                <p>{book.author}</p>
                <p className="favorite-state">{book.statusBook}</p>
              </div>
              <Link to={`/detail/${book.idBook}`} className="boton-ver-mas">Ver más</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteBookPage;
