import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (book) => {
    if (cartItems.length >= 4) {
      Swal.fire({
        icon: 'warning',
        title: '¡Su carrito está lleno!',
        text: 'El límite de libros por préstamo es de 4',
      });
      return;
    }

    const isBookInCart = cartItems.some(item => item.idBook === book.idBook);
    if (!isBookInCart) {
      setCartItems([...cartItems, book]);
    }
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      
      setCartItems(JSON.parse(storedCartItems));
    }else{

    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};