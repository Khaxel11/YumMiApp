const express = require('express');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const cors = require('cors');

const axios = require('axios');
const sendMessage = require('./sendMessage'); // Importa la función de envío de mensajes

const app = express();
const port = 3000;
// const SECURITY_API = "http://localhost:50100";
const SECURITY_API = 'http://172.16.15.137/AppYummi/Seguridad/APPSEGAPI001';

const router = require('./router');

// Configurar cliente de WhatsApp
const client = new Client({
    authStrategy: new LocalAuth()
});

// Exporta el cliente para usarlo en otros módulos
module.exports = client;

// Generar código QR para autenticarse en WhatsApp
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Conexión exitosa a WhatsApp
client.on('ready', () => {
    console.log('Conexión a WhatsApp exitosa');
});

// Inicializar cliente de WhatsApp
client.initialize();
app.use(router);
app.use(cors());

// Middleware para analizar JSON
app.use(express.json());  // Asegúrate de que este middleware esté configurado
// Middleware para analizar datos de formulario (urlencoded)
app.use(express.urlencoded({ extended: true }));
// Middleware para registrar el cuerpo de la solicitud
app.use((req, res, next) => {
    console.log('Cuerpo de la solicitud:', req.rawHeaders, req.url);
    next();
});
// Ruta de prueba
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'API de WhatsApp está funcionando correctamente' });
});
// Ruta para enviar un mensaje de autenticación mediante una solicitud POST
app.post('/send-auth-message', async (req, res) => {
    const { extension, number, correo, usuario } = req.body;

    // Verificar que los parámetros estén presentes
    if (!extension || !number || !correo || !usuario) {
        return res.status(400).json({ error: 'Faltan parámetros requeridos (extension, number, correo, usuario).' });
    }

    // Verificar la conexión a la API de seguridad
    try {
        const checkConnectionResponse = await axios.get(`${SECURITY_API}/checkConnection`);
        if (!checkConnectionResponse) {
            return res.status(500).json({ error: 'Conexión a la API de seguridad fallida.' });
        }
    } catch (error) {
        console.error('Error al verificar la conexión a la API de seguridad:', error);
        return res.status(500).json({ error: 'Error al verificar la conexión a la API de seguridad.' });
    }

    // Obtener el código único de la base de datos
    let uniqueCode;
    try {
        const uniqueCodeResponse = await axios.get(`${SECURITY_API}/getUniqueCode`, {
            params: {
                Ext: extension,
                Num: number,
                Correo: correo,
                Usuario: usuario
            }
        });
        uniqueCode = uniqueCodeResponse.data;
        console.log(uniqueCode);
    } catch (error) {
        console.error('Error al obtener el código único desde la API de C#:', error);
        return res.status(500).json({ error: 'Error al obtener el código único.' });
    }

    const chatId = `${extension}1${number}@c.us`; // Combina la extensión y el número para formar el ID de chat

    // Formatear el mensaje
    const message = `👋 ¡Hola ${usuario}!

        🔑 Tu *código único* es: *${uniqueCode.data}*

        ✨ Por favor, confirme su número de teléfono ingresando su código para continuar.

        Gracias por confiar en nosotros y utilizar YumMi.
        Si tienes alguna pregunta, no dudes en contactarnos.

        _Este mensaje es automatizado_
        Si no solicitaste el servicio, favor de omitir

        📞 *El Equipo YumMi*`;

    // Enviar el mensaje utilizando la función externa
    const result = await sendMessage(client, chatId, message);
    if (result.success) {
        return res.status(200).json(result);
    } else {
        return res.status(500).json(result);
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`API de WhatsApp escuchando en http://localhost:${port}`);
});
