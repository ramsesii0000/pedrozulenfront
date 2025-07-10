import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:8080';

const multaService = {
    getAllMultas: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/multa/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener multas:', error);
            throw new Error(`Error al obtener multas: ${error.message}`);
        }
    },
    createMulta: async (multa, token) => {
        try {
            const response = await axios.post(`${BASE_URL}/multa/create`, multa,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            Swal.fire('Éxito', 'La multa fue agregado exitosamente.', 'success');
            return response.data;
        } catch (error) {
            console.error('Error al crear multa:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar multa',
                text: error.response.data,
            });
            throw new Error(`Error al crear multa: ${error.message}`);
        }
    },
 
    updateMulta: async (idMulta, multa, token) => {
        try {
            const response = await axios.put(`${BASE_URL}/multa/update/${idMulta}`, multa,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            Swal.fire('Éxito', 'La multa fue actualizada exitosamente.', 'success');
            return response.data;
        } catch (error) {
            console.error('Error al actualizar la multa:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar la multa',
                text: error.response.data,
            });
            throw new Error(`Error al crear multa: ${error.message}`);
        }
       
    },
 
    deleteMulta: async (idMulta, token) => {
        try {
            const response = await axios.put(`${BASE_URL}/multa/delete/${idMulta}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al eliminar multa:', error);
            throw new Error(`Error al eliminar multa: ${error.message}`);
        }
    },
}

export default multaService