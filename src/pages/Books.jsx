import React, { useState, useEffect } from 'react';
import BookCatalog from '../components/BookCatalog';
import SearchBook from '../components/SearchBook';
import categoryService from '../service/categoryService';
import bookService from '../service/bookService';
import '../css/BookPage.css';

const Books = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleSearch = async (searchResults) => {
    setBooks(searchResults);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await categoryService.getAllCategoryUser();
        setCategories(categoriesData);

        const allBooksData = await bookService.getAllBooksUser();
        setAllBooks(allBooksData);
        setBooks(allBooksData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const loadBooksByCategory = async (idCategory) => {
    try {
      if (idCategory === '') {
        setBooks(allBooks);
      } else {
        const booksData = await bookService.getBooksByCategory(idCategory);
        setBooks(booksData);
      }
    } catch (error) {
      console.error('Error al cargar libros por categoría:', error);
    }
  };

  const handleCategoryChange = (event) => {
    const idCategory = event.target.value;
    setSelectedCategory(idCategory);
    loadBooksByCategory(idCategory);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleClear = () => {
    setSelectedCategory('');
    setFilter('all');
    setBooks(allBooks);
  };

  return (
    <div>
      <div className="container-book-page">
        <SearchBook onSearch={handleSearch} />
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Todos los libros</option>
          {categories.map(category => (
            <option key={category.idCategory} value={category.idCategory}>
              {category.nameCategory}
            </option>
          ))}
        </select>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">Todos</option>
          <option value="Disponible">Disponible</option>
          <option value="No Disponible">No Disponible</option>
        </select>
        <button className='btn-clean-states' onClick={handleClear}>Limpiar</button>
      </div>
      <BookCatalog books={books} filter={filter} />
    </div>
  );
};

export default Books;
