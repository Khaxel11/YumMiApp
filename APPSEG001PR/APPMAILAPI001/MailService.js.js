require('dotenv').config({ path: 'variables.env' }); // Para cargar las variables de entorno
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; // Puedes cambiar el puerto si lo deseas

// Middleware
app.use(cors()); // Permitir solicitudes de cualquier origen
app.use(bodyParser.json()); // Para poder recibir datos JSON

// Configura el transporte SMTP
let transporter = nodemailer.createTransport({
    service: 'gmail', // o cualquier otro servicio SMTP
    auth: {
        user: process.env.EMAIL_USER, // Usuario desde variables de entorno
        pass: process.env.EMAIL_PASS  // Contraseña desde variables de entorno
    }
});

// Función para enviar el correo
function enviarCorreo(destinatario, asunto, mensaje) {
    let htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; display: flex; align-items: center;">
        <img src="https://s.isanook.com/jo/0/ud/491/2456041/blackpink.jpg" alt="Blackpink" style="max-width: 150px; height: auto; margin-right: 20px;" />
        <div style="flex-grow: 1; text-align: center;">
            <h1 style="color: #333;">Blackpink</h1>
        </div>
    </div>
    <div style="margin-top: 20px; text-align: justify; color: #555;">
        <p>
            ${mensaje}
        </p>
    </div>
    <div style="text-align: center; margin-top: 20px;">
        <p style="font-size: 12px; color: #999;">
            Este es un correo automático, por favor no respondas a este mensaje.
        </p>
    </div>
    `;

    // Definir las opciones del correo
    let mailOptions = {
        from: 'pg26326@gmail.com', // El correo que envía
        to: destinatario, // Destinatario
        subject: asunto, // Asunto del correo
        html: htmlContent // Mensaje del correo
    };

    // Enviar el correo
    return transporter.sendMail(mailOptions);
}

// Ruta para enviar correo
app.post('/send-email', (req, res) => {
    const { destinatario, asunto, mensaje } = req.body;

    enviarCorreo(destinatario, asunto, mensaje)
        .then(info => {
            res.status(200).json({ message: 'Correo enviado', info });
        })
        .catch(error => {
            console.error('Error al enviar correo:', error);
            res.status(500).json({ message: 'Error al enviar correo', error });
        });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
