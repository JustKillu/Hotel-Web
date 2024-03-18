const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  text: String,
  user: String,
  date: Date
});

const roomSchema = new mongoose.Schema({
  name: String,
  description: String,
  comodidades: String,
  tarifas: String,
  reviews: [reviewSchema],
  evaluacion: String,
  img: { data: Buffer, contentType: String },
  espacio: String
});

module.exports = mongoose.model('Room', roomSchema);
