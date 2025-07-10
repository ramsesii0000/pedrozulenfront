import axios from 'axios';
import Swal from 'sweetalert2';


const BASE_URL = 'http://localhost:8080';

const userService = {
    userRegister: async (user) => {
        try {
            const response = await axios.post(`${BASE_URL}/user/register`, user);
            return response.data;
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw new Error(`Error al registrar usuario: ${error.message}`);
        }
    },
    userAddFavoriteBook: async (userId, bookId, token) => {
        try {
          const response = await axios.post(`${BASE_URL}/user/${userId}/favorites/${bookId}`, null, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(response.data);
          Swal.fire({
            icon: 'success',
            title: 'Agregado a Favoritos',
            text: 'Libro agregado a tus favoritos',
          });
        } catch (error) {
          Swal.fire({
            icon: 'warning',
            title: 'Libro en Favoritos',
            text: 'Este libro ya esta agregado en favoritos',
          });
          console.error(error);
        }
      },
      
      userListFavoriteBook: async (userId, token) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/${userId}/favorites`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
          console.error('Error al obtener libros favoritos:', error);
          throw new Error(`Error al obtener libros favoritos: ${error.message}`);
        }
    },
    userDeleteFavoriteBook: async (userId, bookId, token) => {
      try {
          const response = await axios.delete(`${BASE_URL}/user/${userId}/favorites/${bookId}`,{
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          return response.data;
      } catch (error) {
        console.error('Error al eliminar libro de favoritos:', error);
        throw new Error(`Error al eliminar libro de favoritos: ${error.message}`);
      }
  },

}
export default userService;
