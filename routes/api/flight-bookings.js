const express = require('express');
const router = express.Router();

const { OneWayBookings, RoundWayBookings } = require('../../models/Bookings');

// List of Cities and Countries directly from UI layer to Skyscanner API

// List of Flights and prices directly from UI layer to Skyscanner API

// Get Confirmed Bookings
router.get('/oneWayBookings', (req, res) => {
  OneWayBookings.find()
  .sort({ bookingDate: -1 })
  .then((items) => res.json(items));
});

router.get('/roundTripBookings', (req, res) => {
  RoundWayBookings.find()
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

// Delete One Way Booking
router.delete('/deleteOneWayTrip/:id', (req,res) => {
  OneWayBookings.findById(req.params.id)
    .then(booking => booking.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false}));
});

// Delete Round Trip Booking
router.delete('/deleteRoundTrip/:id', (req,res) => {
  RoundWayBookings.findById(req.params.id)
  .then(booking => booking.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false}));
});

module.exports = router;
