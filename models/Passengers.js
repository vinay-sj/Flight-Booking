const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PassengerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['M', 'F'],
    required: true,
    default: undefined,
  },
  birthDate: {
    type: Date,
    default: undefined,
    required: true,
  },
  emailId: {
    type: String,
    required: false,
  },
  contactNo: {
    type: Number,
    required: false,
  },
  passPortNo: {
    type: String,
    required: false,
  },
});

module.exports = {
  PassengerSchema,
  PassengerModel: mongoose.model('passengers', PassengerSchema),
};
