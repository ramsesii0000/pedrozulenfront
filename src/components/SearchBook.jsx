import React, { useState } from 'react';
import bookService from '../service/bookService';
import '../css/SearchBook.css'

const SearchBook = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const searchResults = await bookService.searchBooks(searchTerm);
      if (Array.isArray(searchResults) && searchResults.length > 0) {
        onSearch(searchResults);
      } else {
        console.log('Libro no encontrado');
      }
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };
  

  return (
    <div className="search-container">
      <input
        className="search-input" 
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Buscar por título o autor"
      />
      <button className="search-button" onClick={handleSearch}>Buscar</button> 
    </div>
  );
};

export default SearchBook;
