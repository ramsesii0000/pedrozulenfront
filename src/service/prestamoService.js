import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'https://biblioteca-pedro-zulen-lvj3.onrender.com';


const prestamoService =  {

    getAllLoans: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/prestamo/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener prestamos:', error);
            throw new Error(`Error al obtener prestamos: ${error.message}`);
        }
    },

    createPrestamo: async (prestamo, token) => {
        try {
            const response = await axios.post(`${BASE_URL}/prestamo/admin/create`, prestamo, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            Swal.fire('Éxito', 'El prestamo fue solicitado correctamente.', 'success');
            localStorage.removeItem('cartItems');
            window.location.reload(); 
            return response.data;
        } catch (error) {
            console.error('Error al solicitar el prestamo:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al solicitar el prestamo',
                text: error.response.data,
            });
            throw new Error(`Error al solicitar el prestamo: ${error.message}`);
        }
    },

    updateStatusPrestamo: async (idPrestamo, statusPrestamo, token) => {
        try{
            const response = await axios.put(`${BASE_URL}/prestamo/update/${idPrestamo}/${statusPrestamo}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            Swal.fire('Éxito', 'El prestamo fue actualizado correctamente.', 'success');
            return response.data;
        }catch (error){
            console.error('Error al actualizar el prestamo:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar el prestamo',
                text: error.response.data,
            });
            throw new Error(`Error al actualizar el prestamo: ${error.message}`);
        }
    },
    getLoansByUserId: async (userId, token) => {
        try {
            const response = await axios.get(`${BASE_URL}/prestamo/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener prestamos por ID de usuario:', error);
            throw new Error(`Error al obtener prestamos por ID de usuario: ${error.message}`);
        }
    },
    deletePrestamo: async (prestamoId, token) => {
        try {
            const response = await axios.put(`${BASE_URL}/prestamo/delete/${prestamoId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al eliminar prestamo:', error);
            throw new Error(`Error al eliminar prestamo: ${error.message}`);
        }
    },
}

export default prestamoService;