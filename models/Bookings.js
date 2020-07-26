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
    default: Date.now,
  },
  passengerDetails: [PassengerSchema],
  flightNo: {
    type: Number,
    required: true,
    default: 11231,
  },
  airlineName: {
    type: String,
    required: true,
    default: "ABC Airlines",
  },
});

module.exports = Bookings = mongoose.model('bookinglist', BookingSchema, 'bookinglist');
