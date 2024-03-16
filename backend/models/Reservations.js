const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
userId: String,
roomId: [String],
date: String

});

module.exports = mongoose.model('Reservations', ReservationSchema);
