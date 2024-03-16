const sgMail = require('@sendgrid/mail');

// Configura la clave API de SendGrid
sgMail.setApiKey("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");

// Define el mensaje
const msg = {
  to: 'nightcorekillu@gmail.com', // Cambia esto por tu dirección de correo electrónico
  from: 'nightcorekillu@gmail.com', // Cambia esto por tu dirección de correo electrónico verificada en SendGrid
  subject: 'Prueba de SendGrid',
  text: '¡Hola! Esta es una prueba de envío de correo electrónico con SendGrid.',
  html: '<strong>¡Hola! Esta es una prueba de envío de correo electrónico con SendGrid.</strong>',
};

// Envia el correo electrónico
sgMail
  .send(msg)
  .then(() => console.log('Correo enviado exitosamente'))
  .catch((error) => console.error(error.toString()));
