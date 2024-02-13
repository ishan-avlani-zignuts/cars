const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cars' // Reference to the Cars model
  },
  user: {
    name: String,
    number: String,
    city: String,
    state: String
  },
  startDate: Date,
  endDate: Date,
  startTime: String,
  endTime: String
});

module.exports = mongoose.model('Book', bookingSchema, 'book');

