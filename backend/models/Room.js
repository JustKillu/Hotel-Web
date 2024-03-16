const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  time: String,
  img: String
});


module.exports = mongoose.model('Room', roomSchema);
