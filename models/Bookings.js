const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PassengerSchema = require('./Passengers').PassengerSchema;

let BookingSchema = new Schema({
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  journeyDate: {
    type: Date,
    required: true,
    default: undefined,
  },
  passengerDetails: [PassengerSchema],
  flightNo: {
    type: String,
    required: true,
    default: undefined,
  },
  airlineName: {
    type: String,
    required: true,
    default: undefined,
  },
});

module.exports = Bookings = mongoose.model('bookinglist', BookingSchema);
