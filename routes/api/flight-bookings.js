const express = require('express');
const router = express.Router();

const Bookings = require('../../models/Bookings');

// List of Cities and Countries directly from UI layer to Skyscanner API

// List of Flights and prices directly from UI layer to Skyscanner API

// Confirmed Bookings API
router.get('/retireveBookings', (req, res) => {
  Bookings.find()
    .sort({ bookingDate: -1 })
    .then((items) => res.json(items));
});

// Create a new Booking
router.post('/confirmBooking', (req, res) => {
//   const confirmBooking = new Bookings({

//   });

//   confirmBooking.save().then((item) => res.json(item));
});

module.exports = router;
