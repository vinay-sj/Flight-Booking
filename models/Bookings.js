const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PassengerSchema = require('./Passengers').PassengerSchema;

let BookingSchema = new Schema({
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  numPassengers: {
    type: Number,
    required: true,
    default: 0,
  },
  passengerDetails: [PassengerSchema],
  onwardFlightDetails: {
    journeyDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    flightNo: {
      type: String,
      required: true,
      default: 00000,
    },
    airlineName: {
      type: String,
      required: true,
      default: 'ABC Airlines',
    },
  },
  returnFlag: {
    type: Boolean,
    required: true,
    default: false,
  },
  returnFlightDetails: {
    flightNo: {
      type: String,
      required: false,
      default: 00000,
    },
    airlineName: {
      type: String,
      required: false,
      default: '00000000',
    },
    journeyDate: {
      type: Date,
      required: false,
      default: Date.now,
    },
  },
});

module.exports = Bookings = mongoose.model('bookinglist', BookingSchema, 'bookinglist');
