const express = require('express');
const router = express.Router();
const Room = require('../models/Room'); 


router.get('/rooms', (req, res) => {
  Room.find({})
    .then(rooms => {
      res.status(200).json(rooms);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/rooms', (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.price || !req.body.time) {
    return res.status(400).send('Faltan campos necesarios');
  }

  const newRoom = new Room({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    time: req.body.time,
    img: req.body.time
  });

  newRoom.save()
    .then(room => {
      res.status(201).json(room);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});




module.exports = router;
