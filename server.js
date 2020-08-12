const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const auth = require('./auth.js')
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo Connected...'
  ))
  .catch((err) => console.log(err));

const bookingsRouter = require("./routes/api/flight-bookings");
const passengersRouter = require("./routes/api/passenger-details");

const uiServerOrigin = process.env.UI_SERVER_ORIGIN || 'http://localhost:3000';
//const uiServerOrigin = 'https://group-project-avengers-ui.herokuapp.com';
app.use(cors({origin: uiServerOrigin, credentials: true}));
//app.use(cors({credentials: true}));
app.use('/auth', auth.routes);
app.use('/api/bookings', bookingsRouter);
app.use('/api/passengers', passengersRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

console.log(process.env.UI_SERVER_ORIGIN);
console.log(uiServerOrigin);
