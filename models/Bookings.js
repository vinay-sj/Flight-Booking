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
  numPassengers: {
    type: Number,
    required: true,
    default: 0,
  },
  passengerDetails: [PassengerSchema],
  flightNo: {
    type: String,
    required: true,
    default: 00000,
  },
  airlineName: {
    type: String,
    required: true,
    default: "ABC Airlines",
  },
  returnFlag: {
    type: Boolean,
    required: true,
    default: false
  },
  returnFlightNo: {
    type: String,
    required: false,
    default: 11231,
  },
  returnAirlineName: {
    type: String,
    required: false,
    default: "ABC Airlines",
  },
  returnJourneyDate: {
    type: Date,
    required: false,
    default: Date.now,
  }
});

module.exports = Bookings = mongoose.model('bookinglist', BookingSchema, 'bookinglist');
