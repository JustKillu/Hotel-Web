const express = require('express');
const router = express.Router();
const Room = require('../models/Room'); 
const multer = require('multer'); 
const fs = require('fs'); 
const upload = multer({ dest: 'uploads/' });

router.get('/rooms', (req, res) => {
  Room.find({})
    .then(rooms => {
      res.status(200).json(rooms);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/rooms/:roomId/reviews', (req, res) => {
  const roomId = req.params.roomId;

  Room.findById(roomId)
    .then(room => {
      if (!room) {
        return res.status(404).send('Habitación no encontrada');
      }

      res.status(200).json(room.reviews);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/rooms', upload.single('img'), (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.comodidades || !req.body.tarifas || !req.body.evaluacion || !req.file) {

  }
  const newRoom = new Room({
    name: req.body.name,
    description: req.body.description,
    comodidades: req.body.comodidades,
    tarifas: req.body.tarifas,
    evaluacion: req.body.evaluacion,
    img: {
      data: fs.readFileSync(req.file.path),
      contentType: 'image/png'
    },
    espacio: req.body.espacio
  });

  newRoom.save()
    .then(room => {
      res.status(201).json(room);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/rooms/:roomId/reviews', (req, res) => {
  const roomId = req.params.roomId;
  const review = req.body.text;
  const user = req.body.user; 
  if (!review || !user) {
    return res.status(400).send('Falta el texto de la reseña o el usuario');
  }

  Room.findById(roomId)
    .then(room => {
      if (!room) {
        return res.status(404).send('Habitación no encontrada');
      }
      const reviewObject = {
        text: review,
        user: user,
        date: new Date()
      };

      room.reviews.push(reviewObject);

      room.save()
        .then(updatedRoom => {
          res.status(201).json(updatedRoom);
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});


module.exports = router;
