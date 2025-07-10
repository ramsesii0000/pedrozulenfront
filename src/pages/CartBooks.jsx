import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; 
import carrito from '../assets/img/carrito.png';
import '../css/CartBooks.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeFromCart, countBooksInCart } from '../helpers/CartLogic.js'
import FormLoan from '../components/FormLoan.jsx';

export const CartBooks = () => {
  const { cartItems, setCartItems } = useCart();
  const [showLoanModal, setShowLoanModal] = useState(false);

  const handleRemoveFromCart = (bookId) => {
    console.log('Libro removido con el id:', bookId);
    const updatedCart = removeFromCart(cartItems, bookId);
    setCartItems(updatedCart);
  };

  const booksInCart = countBooksInCart(cartItems);

  const handleShowLoanModal = () => {
    setShowLoanModal(true);
  };
 
  const handleCloseLoanModal = () => {
    setShowLoanModal(false);
  };
  

  return (
    <div>
      <div className='title-cart-container'>
        <div className='title-favorite-container'>
          <h2 className='title-cart'>Mi Carrito de Préstamos</h2>
        </div>
        {booksInCart === 0 ? (
          <div>
            <p className='title-empty-cart'>Tu Carrito está vacío</p>
            <img className='cart-image' src={carrito} alt='sin libro en el carrito' />
            <p className='paragraph-empty-books'>¡Oh no! Tu carrito de préstamos está vacío por el momento.</p>
            <p className='paragraph-empty-books'>Agrega algunos libros a tu carrito para llevar tus lecturas favoritas contigo a donde vayas.</p>
          </div>
        ) : (
          <div className='cart-elements-container'>
            <div className='cart-loan-container'>
              {cartItems.map((book, index) => (
                <div key={index}>
                  <div className='img-loan'>
                    <img src={book.picture} />
                  </div>
                  <div className='book-loan'>
                    <p className="author">{book.nameBook}</p>
                    <p className="author">{book.author}</p>
                    <p className="status">{book.statusBook}</p>
                    <FontAwesomeIcon  icon={faTrash} onClick={() => handleRemoveFromCart(book.idBook)} />
                  </div>
                </div>
              ))}
            </div>
            <div className='detail-loan-container'>
              <p>Cantidad de libros en el carrito: <span>{booksInCart}</span></p>
              <button onClick={handleShowLoanModal}>
                Solicitar Prestamo
              </button>
            </div>
          </div>
        )}
        <FormLoan 
        show={showLoanModal}
        handleClose={handleCloseLoanModal}
        />
      </div>
    </div>
  );
}

export default CartBooks;
