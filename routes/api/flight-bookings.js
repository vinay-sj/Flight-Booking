const express = require('express');
const router = express.Router();

const { OneWayBookings, RoundWayBookings } = require('../../models/Bookings');

// List of Cities and Countries directly from UI layer to Skyscanner API

// List of Flights and prices directly from UI layer to Skyscanner API

// Confirmed Bookings API
router.get('/retrieveBookings', (req, res) => {
  req.body.isRoundTrip
    ? OneWayBookings.find()
        .sort({ bookingDate: -1 })
        .then((items) => res.json(items))
    : RoundWayBookings.find()
        .sort({ bookingDate: -1 })
        .then((items) => res.json(items));
});

// Create a new Booking
router.post('/confirmBooking', (req, res) => {
  const confirmBooking = !req.body.isRoundTrip
    ? new OneWayBookings({
        ...req.body,
      })
    : new RoundWayBookings({
        ...req.body,
      });

  confirmBooking.save().then((item) => res.json(item), (err) => res.json(err));
});

module.exports = router;
