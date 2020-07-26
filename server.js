const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo Connected...'))
  .catch((err) => console.log(err));

const bookingsRouter = require("./routes/api/flight-bookings")

app.use(cors());

app.use('/api/bookings', bookingsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

