import React, { useState, useEffect } from 'react';
import bookService from '../service/bookService';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../css/Book.css';
import Swal from 'sweetalert2';
import AddBook from './AddBook';
import ModalBookUpdate from './ModalBookUpdate';
 
const Books = () => {
  const [books, setBooks] = useState([]);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId ,setSelectedBookId] = useState(null);
  const [selectedNameBook, setSelectedNameBook] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedPublicationDate, setSelectedPublicationDate] = useState('');
  const [selectedPicture, setSelectedPicture] = useState('');
  const [selectedStatusBook, setSelectedStatusBook] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
 
 
  useEffect(() => {
    fetchBooks();
  }, []);
 
  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await bookService.getAllBooks(token);
      const booksWithIds = data.map((book, index) => ({
        ...book,
        id: index + 1
      }));
      setBooks(booksWithIds);
    } catch (error) {
      console.error('Error al cargar los libros:', error);
    }
  };
 
  const handleDeleteBook = async (bookId) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar libro',
        cancelButtonText: 'Cancelar',
      });
 
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        await bookService.deleteBook(bookId, token);
        setBooks(books.filter(book => book.idBook !== bookId));
        Swal.fire('Eliminado', 'El libro ha sido eliminada correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error al eliminar el libro:', error);
      Swal.fire('Error', 'Hubo un error al intentar eliminar el libro.', 'error');
    }
  };
 
  const columns = [
    { field: 'nameBook', headerName: 'Libro', width: 200 },
    {
      field: 'publicationDate',
      headerName: 'Fecha de Publicacion',
      width: 200,
      renderCell: (params) => (
        <span>{formatDate(params.value)}</span>
      )
    },
    { field: 'author', headerName: 'Autor', width: 150 },
    { field: 'statusBook', headerName: 'Estado del Libro', width: 150 },
    {
      field: 'category',
      headerName: 'Categoria',
      width: 150,
      renderCell: (params) => (
        <span>{params.value.nameCategory}</span>
      )
    },
    {
      field: 'picture',
      headerName: 'Imagen',
      width: 150,
      renderCell: (params) => (
        <div style={{ width: '100%', height: '100%', display: 'flex' }}>
          <img src={params.value} alt="Book Cover" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
      )
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <div>
          <button className="delete-button" onClick={() => handleDeleteBook(params.row.idBook)}>Eliminar</button>
          <button className="update-button" onClick={() => handleOpenUpdateModal(params.row.idBook, params.row.nameBook, params.row.author, params.row.description, params.row.publicationDate, params.row.picture, params.row.statusBook, params.row.category.idCategory)}>Actualizar</button>
        </div>
      ),
    }
  ];
 
  const getRowClassName = (params) => {
    if (params.field === 'picture') {
      return 'image-row';
    }
    return '';
  };
 
  const handleShowAddBookModal = () => {
    setShowAddBookModal(true);
  };
 
  const handleCloseAddBookModal = () => {
    setShowAddBookModal(false);
    fetchBooks();
  };
 
  const handleOpenUpdateModal = (bookId, nameBook, author, description, publicationDate, picture, statusBook, category) => {
    setSelectedBookId(bookId);
    console.log(bookId);
    setSelectedNameBook(nameBook);
    setSelectedAuthor(author);
    setSelectedDescription(description);
    setSelectedPublicationDate(publicationDate);
    setSelectedPicture(picture)
    setSelectedStatusBook(statusBook);
    setSelectedCategory(category);
    setIsModalOpen(true);
  };
 
  const initialValue = {
    idBook: selectedBookId,
    nameBook: selectedNameBook,
    author: selectedAuthor,
    description: selectedDescription,
    publicationDate: selectedPublicationDate,
    picture: selectedPicture,
    statusBook: selectedStatusBook,
    category: selectedCategory
  };
 
 
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
 
    return `${year}-${month}-${day}`;
  }
 
  const filteredRows = books.filter((row) => {
    return Object.values(row).some((value) => {
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some((innerValue) =>
          String(innerValue).toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
 
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  });
  
  return (
    <div className="books-container">
      <h1 className='title-book'>Gestión de Libros</h1>
   
      <div className="table-container-book">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          className='input-buscar-libro'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowHeight={120}
          getRowClassName={getRowClassName}
        />
        {isModalOpen && (
          <ModalBookUpdate
            onCancel={() => setIsModalOpen(false)}
            initialValue={initialValue}
            updateBooks={fetchBooks}
          />
        )}
      </div>
      <div className="floating-button" onClick={handleShowAddBookModal}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <AddBook
        show={showAddBookModal}
        handleClose={handleCloseAddBookModal}
      />
 
    </div>
  );
};
 
export default Books;