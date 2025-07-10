import axios from 'axios';
 
const BASE_URL = 'http://localhost:8080';
 
const emailService = {
    sendEmail: async (emailData, token) => {
        try {
            const response = await axios.post(`${BASE_URL}/email/consulta`, emailData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            throw error;
        }
    }
};
 
export default emailService;