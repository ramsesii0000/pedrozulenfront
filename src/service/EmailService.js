import axios from 'axios';
 
const BASE_URL = 'https://biblioteca-pedro-zulen-lvj3.onrender.com';
 
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