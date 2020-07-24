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
  birthDay: {
    type: Date,
    default: undefined,
    required: true,
  },
  emailId: {
    type: String,
    required: false
  },
  contactNo: {
      type: Number,
      required: false
  },
  passPortNo: {
      type: String,
      required: false
  }
});

module.exports = {
    Passengers : mongoose.model("passengers", PassengerSchema),
    PassengerSchema
}