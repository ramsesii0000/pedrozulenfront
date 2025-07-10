import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const loginService = {
    login: async (credenciales) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, credenciales);
            return response.data;
        } catch (error) {
            console.error('Error al autenticar:', error);
            throw new Error(`Error al autenticar usuario: ${error.message}`);
        }
    },
};

export default loginService;
