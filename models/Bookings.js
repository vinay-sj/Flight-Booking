const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PassengerSchema = require('./Passengers').PassengerSchema;

const baseOptions = {
  discriminatorKey: '__tripType'
};

const BookingSchema = new Schema({
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
    },
    airlineName: {
      type: String,
      required: true,
    },
  },
  isRoundTrip: {
    type: Boolean,
    required: true,
    default: false,
  },
}, baseOptions);

const OneWayBookings = mongoose.model('oneWayTrip', BookingSchema, 'bookinglist');

const ReturnBookingSchema = new Schema({
  returnFlightDetails: {
    flightNo: {
      type: String,
      required: true,
    },
    airlineName: {
      type: String,
      required: true,
    },
    journeyDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
});

const RoundWayBookings = OneWayBookings.discriminator('roundWayTrip', ReturnBookingSchema);

module.exports = {
  OneWayBookings ,
  RoundWayBookings
};
