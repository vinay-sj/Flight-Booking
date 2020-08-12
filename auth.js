const Router = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/* Refer to this link to understand how json web tokens validate the tokens
    https://www.sohamkamani.com/blog/javascript/2019-03-29-node-jwt-authentication/

    Refer to this link to understand how routing middleware can be used to authenticate
    https://scotch.io/tutorials/route-middleware-to-check-if-a-user-is-authenticated-in-node-js
*/

const routes = new Router();

const JWT_SECRET = process.env.JWT_SECRET;

const uiServerOrigin = process.env.UI_SERVER_ORIGIN || 'http://localhost:3000';

routes.use(cors({origin: uiServerOrigin, credentials: true }));
routes.use(bodyParser.json());

routes.post('/signin', async (req, res) => {
  const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({ idToken: req.body.google_tokenId }).catch((e) => res.send(`Invalid Credentials: ${e}`));
  const tokenData = ticket.getPayload();
  const { given_name: givenName, name, email } = tokenData;
  const credentials = {
    signedIn: true,
    givenName,
    name,
    email,
  };
  const token = jwt.sign(credentials, JWT_SECRET);
  /* Uncomment below line so that it works on your localhost and comment the line next to it */
  // res.cookie('jwt', token, { httpOnly: true, sameSite: 'None' });
  res.cookie('jwt', token, { httpOnly: true, sameSite: 'None', secure: true }); // Critical line needed in production phase
  res.json(credentials);
});

routes.post('/signout', async (req, res) => {
  res.clearCookie('jwt');
  res.json({ status: 'ok' });
});

const validateAPIRequest = (req, res) => {
  const validatetoken = req.cookies.jwt;
  console.log(validatetoken);
  try {
    const validatedCredentials = jwt.verify(validatetoken, JWT_SECRET);
    console.log('validated credentials..........................................................................')
    return validatedCredentials;
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).json({ errorMessage: 'Unauthorized Request, please login first to perform the operation' });
    }
    // otherwise, return a bad request error
    return res.status(400).json({ errorMessage: 'Bad Request' });
  }
};

module.exports = { routes, validateAPIRequest };
