import axios from 'axios';


const BASE_URL = 'http://localhost:8080';

const detailsPretamoService =  {
    getDetails: async (idPrestamo ,token) => {
        try {
            const response = await axios.get(`${BASE_URL}/detailsPrestamo/details/${idPrestamo}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener detalle Prestamo:', error);
            throw new Error(`Error al obtener detalle Prestamo: ${error.message}`);
        }
    }
}

export default detailsPretamoService;