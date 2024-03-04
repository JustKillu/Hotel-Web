const Reservation = require('../models/Reservations');
const User = require('../models/User');
const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error: error });
  }
});

router.post('/reservations', async (req, res) => {
  const newReservation = new Reservation({
    userId: req.body.userId,
    roomId: req.body.roomId,
    date: req.body.date
  });

  try {
    const savedReservation = await newReservation.save();
    await User.findByIdAndUpdate(req.body.userId, { $push: { reservations: savedReservation._id } });

    const user = await User.findById(req.body.userId);
    if (user && user.email) {
      const msg = {
        to: user.email,
        from: 'nightcorekillu@gmail.com', 
        subject: 'Factura de Reservación',
        text: `Reservación realizada con éxito. Detalles de la reservación: ${JSON.stringify(savedReservation)}`,
        html: `
          <h1>Reservación realizada con éxito</h1>
          <p>A continuación, los detalles de tu reservación:</p>
          <ul>
            <li><strong>ID de Usuario:</strong> ${savedReservation.userId}</li>
            <li><strong>ID de Habitación:</strong> ${savedReservation.roomId}</li>
            <li><strong>Fecha:</strong> ${new Date(savedReservation.date).toLocaleDateString()}</li>
          </ul>
        `
      };
      
      sgMail
        .send(msg)
        .then(() => console.log('Correo enviado exitosamente'))
        .catch((error) => console.error(error.toString()));
      

      sgMail
        .send(msg)
        .then(() => console.log('Correo enviado exitosamente'))
        .catch((error) => console.error(error.toString()));
    }

    res.status(201).json(savedReservation);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/reservations/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const reservations = await Reservation.find({ userId: userId });
    if (!reservations) {
      return res.status(404).json({ error: 'No se encontraron reservaciones para este usuario' });
    }
    res.json(reservations);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error del servidor', error: error });
  }
});

router.post('/promociones', async (req, res) => {
  const { userId, promotion } = req.body;

  try {
    const user = await User.findById(userId);
    if (user && user.email) {
      const msg = {
        to: user.email,
        from: 'nightcorekillu@gmail.com', 
        subject: 'Promoción',
        text: `¡Hola! Aquí tenemos una promoción activa!: ${promotion}`,
        html: `
          <h1>¡Hola!</h1>
          <p>${promotion}</p>
        `
      };
      
      sgMail
        .send(msg)
        .then(() => {
          console.log('Promoción enviada exitosamente');
          res.status(200).json({ message: 'Promoción enviada exitosamente' });
        })
        .catch((error) => {
          console.error(error.toString());
          res.status(500).json({ message: 'Error al enviar el correo', error: error.toString() });
        });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});



module.exports = router;
