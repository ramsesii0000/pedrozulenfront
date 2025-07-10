import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'https://biblioteca-pedro-zulen-lvj3.onrender.com';

const categoryService = {
    getAllCategory: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/category/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener categorías:', error);
            throw new Error(`Error al obtener categorías: ${error.message}`);
        }
    },
    createCategory: async (nameCategory, token) => {
        try {
            const response = await axios.post(`${BASE_URL}/category/create`, { nameCategory }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al guardar categorías:', error);
            throw new Error(`Error al guardar categorías: ${error.message}`);
        }
    },
    deleteCategory: async (categoryId, token) => {
        try {
            const response = await axios.delete(`${BASE_URL}/category/delete/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al eliminar categorías:', error);
            throw new Error(`Error al eliminar categorías: ${error.message}`);
        }
    },
    updateCategory: async (categoryId, categoryName, token) => {
        try {
            const response = await axios.put(`${BASE_URL}/category/update/${categoryId}`, { nameCategory: categoryName }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar la categoria',
                text: error.response.data,
              });
            throw new Error(`Error al actualizar la categoría: ${error.message}`);
        }
    },
    getAllCategoryUser: async () => { 
        try {
            const response = await axios.get(`${BASE_URL}/category/all/user`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener categorías:', error);
            throw new Error(`Error al obtener categorías: ${error.message}`);
        }
    },    
};

export default categoryService;
