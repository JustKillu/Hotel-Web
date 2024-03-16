const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
  name: String,
  description: String,
  comodidades: String,
  tarifas: String,
  reviews: [String],
  evaluacion: String,
  img: { data: Buffer, contentType: String }
});


module.exports = mongoose.model('Room', roomSchema);
