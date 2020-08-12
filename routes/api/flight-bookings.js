const express = require('express');
const router = express.Router();

const { OneWayBookingsModel, RoundWayBookingsModel } = require('../../models/Bookings');
const { validateAPIRequest } = require('../../auth.js');

let userCredentials = {};

// Default Validation of all API requests towards Bookings 
router.use('/', (req, res, next) => {
  userCredentials = validateAPIRequest(req, res) || {};
  // userCredentials.email='vinaysra@gmail.com'
  next()
});

// List of Cities and Countries directly from UI layer to Skyscanner API

// List of Flights and prices directly from UI layer to Skyscanner API

// Get Confirmed Bookings
router.get('/oneWayBookings', (req, res) => {
  if (userCredentials.signedIn) {
    OneWayBookingsModel.find({ userEmail: userCredentials.email })
      .sort({ bookingDate: -1 })
      .then((items) => res.json(items));
  }
});

router.get('/roundTripBookings', (req, res) => {
  if (userCredentials.signedIn) {
    RoundWayBookingsModel.find({ userEmail: userCredentials.email })
      .sort({ bookingDate: -1 })
      .then((items) => res.json(items));
  }
});

// Create a new Booking
router.post('/confirmBooking', async (req, res) => {
  // if (userCredentials.signedIn) {
    for (let i=0; i < req.body.passengerDetails.length; i++) {
      req.body.passengerDetails[i].userEmail = userCredentials.email;
    }
    const confirmBooking = !req.body.isRoundTrip
      ? new OneWayBookingsModel({
          ...req.body, ...{userEmail: userCredentials.email}
        })
      : new RoundWayBookingsModel({
          ...req.body, ...{userEmail: userCredentials.email}
        });

    confirmBooking.save().then(
      (item) => res.status(201).json(item),
      (err) => res.status(400).json(err)
    );
  // }
});

// Delete One Way Booking
router.delete('/deleteOneWayTrip/:id', (req, res) => {
  // if (userCredentials.signedIn) {
    OneWayBookingsModel.findById(req.params.id)
      .then((booking) => booking.remove().then(() => res.json({ success: true })))
      .catch((err) => res.status(404).json({ success: false }));
  // }
});

// Delete Round Trip Booking
router.delete('/deleteRoundTrip/:id', (req, res) => {
  // if (userCredentials.signedIn) {
    RoundWayBookingsModel.findById(req.params.id)
      .then((booking) => booking.remove().then(() => res.json({ success: true })))
      .catch((err) => res.status(404).json({ success: false }));
  // }
});

module.exports = router;
