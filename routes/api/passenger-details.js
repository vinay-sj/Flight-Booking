const express = require('express');
const router = new express.Router();

const {Passengers: Pass, PassengerSchema} = require('../../models/Passengers');

router.get('/getPassenger', (req, res) => {
    Pass.find()
    .then((items) => res.json(items));

});

router.post('/addPassenger', (req, res) => {
    const passenger = new Pass({
        ...req.body
    });
    passenger.save().then((item) => res.json(item), (err) => res.json(err));

});

router.delete('/deletePassenger/:id', (req, res) => {
    Pass.findById(req.params.id)
    .then(passenger => passenger.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false}));

});


module.exports = router;