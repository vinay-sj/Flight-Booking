const express = require('express');
const router = new express.Router();

const { Pass, PassengerSchema} = require('../../models/Passengers');
const { validateAPIRequest } = require('../../auth.js');

let userCredentials = {};

// Default Validation of all API requests towards Bookings 
router.use('/', (req, res, next) => {
  userCredentials = validateAPIRequest(req, res) || {};
  next()
});

router.get('/getPassenger', (req, res) => {
    userCredentials.signedIn && Pass.find({emailId: userCredentials.email})
    .then((items) => res.json(items));

});

router.post('/addPassenger', (req, res) => {
    const passenger = new Pass({
        ...req.body, ...{emailId: userCredentials.email}
    });
    userCredentials.signedIn && passenger.save().then((item) => res.status(201).json(item), (err) => res.status(400).json(err));

});

router.put('/editPassenger/:id', (req, res) => {
    userCredentials.signedIn && Pass.findById(req.params.id)
    .then(passenger => {
        passenger.name = req.body.name;
        passenger.gender = req.body.gender;
        passenger.birthDate = req.body.birthDate;
        passenger.emailId = req.body.emailId;
        passenger.contactNo = req.body.contactNo;
        passenger.passPortNo = req.body.passPortNo;
        passenger.save();
    }).then(() => res.status(201).json({ success: true }))
        .catch(err => res.status(404).json({ success: false}));

});

router.delete('/deletePassenger/:id', (req, res) => {
    userCredentials.signedIn && Pass.findById(req.params.id)
    .then(passenger => passenger.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false}));

});


module.exports = router;