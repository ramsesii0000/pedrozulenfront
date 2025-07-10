import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'https://biblioteca-pedro-zulen-lvj3.onrender.com';

const bookService ={

    getAllBooks: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/book/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener libros:', error);
            throw new Error(`Error al obtener libros: ${error.message}`);
        }
    },

    getAllBooksUser: async () => { 
        try {
            const response = await axios.get(`${BASE_URL}/book/user`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener libros:', error);
            throw new Error(`Error al obtener libros: ${error.message}`);
        }
    },    
    createBook: async (book, token) => {
        try {
            const response = await axios.post(`${BASE_URL}/book/admin/create`, book, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            Swal.fire('Éxito', 'El libro fue agregado correctamente.', 'success');
            return response.data;
        } catch (error) {
            console.error('Error al guardar libro:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar libro',
                text: error.response.data,
            });
            throw new Error(`Error al guardar libro: ${error.message}`);
        }
    },
    getBooksByCategory: async (idCategory) => {
        try {
            const response = await axios.get(`${BASE_URL}/book/user/category/${idCategory}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener libros por categoría:', error);
            throw new Error(`Error al obtener libros por categoría: ${error.message}`);
        }
    },
    searchBooks: async (searchTerm) => {
        try {
            const response = await axios.get(`${BASE_URL}/book/search`, {
                params: {
                    searchTerm: searchTerm
                }
            });            
            const searchResults = response.data;
            if (searchResults.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Libro no encontrado',
                    text: 'Lo sentimos, no se encontraron libros que coincidan con tu búsqueda.'
                });
            }

            return searchResults;
        } catch (error) {
            console.error('Error al buscar libros:', error);
            throw new Error(`Error al buscar libros: ${error.message}`);
        }
    },
    getBookById: async (bookId) => {
        try {
            const response = await axios.get(`${BASE_URL}/book/user/${bookId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener libro por ID:', error);
            throw new Error(`Error al obtener libro por ID: ${error.message}`);
        }
    },
    updateBook: async (bookId ,book, token) => {
        try {
            const response = await axios.put(`${BASE_URL}/book/admin/update/${bookId}`, book, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            Swal.fire('Actualizado', 'El libro fue actualizado correctamente.', 'success');
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar el libro',
                text: error.response.data,
              });
            throw new Error(`Error al actualizar el libro: ${error.message}`);
        }
    },
    deleteBook: async (bookId, token) => {
        try {
            const response = await axios.delete(`${BASE_URL}/book/admin/delete/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al eliminar libro:', error);
            throw new Error(`Error al eliminar libro: ${error.message}`);
        }
    },
}

export default bookService;