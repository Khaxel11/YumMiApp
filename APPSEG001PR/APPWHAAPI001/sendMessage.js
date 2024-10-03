// const client = require('./whatsappClient');

// Función para enviar mensajes
async function sendMessage(client, chatId, message) {
    try {
        const response = await client.sendMessage(chatId, message);
        console.log('Mensaje enviado exitosamente:');
        return { success: true, response };
    } catch (err) {
        console.error('Error al enviar el mensaje:', err);
        return { success: false, error: err.message };
    }
}

module.exports = sendMessage;
