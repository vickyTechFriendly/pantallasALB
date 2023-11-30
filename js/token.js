const axios = require('axios');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
async function getToken() {
    const url = "https://smart.albacete.es:443/api/auth/login"; 
    try {
        const response = await axios.post(url, {
            "username": "prueba",
            "password": "prueba"
        });
        if (!response) {
            throw new Error(`Error en la solicitud: ${response.data.message}`);
        }

        const token = response.data.token;
        console.log("Token obtenido:", token);
        return token;
    } catch (error) {
        console.error("Error al obtener el token:", error.message);
        return null; 
    }
}

getToken();