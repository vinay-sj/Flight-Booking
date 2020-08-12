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

routes.use(cors({ origin: uiServerOrigin, credentials: true }));
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
  console.log('token');
  console.log(token)
  console.log('COOKie_DOMAIN')
  console.log(process.env.COOKIE_DOMAIN)
  res.cookie('jwt', token, { httpOnly: true , path: '/', sameSite:false, secure:true });
  console.log(res)
  // domain: process.env.COOKIE_DOMAIN,
  res.json(credentials);
});

routes.post('/signout', async (req, res) => {
  res.clearCookie('jwt');
  res.json({ status: 'ok' });
});

const validateAPIRequest = (req, res) => {
    console.log('Cookie........................')
  const validatetoken = req.cookies.jwt;
  console.log(validatetoken);
  try {
    console.log('validated token.....................................................................')
    console.log(JWT_SECRET);
    const validatedCredentials = jwt.verify(validatetoken, JWT_SECRET);
    console.log('validated credentials..........................................................................')
    console.log(validatedCredentials)
    return validatedCredentials;
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      console.log('JWT Exception.................................................................................')
      console.log(e)
      return res.status(401).json({ Message: 'Unauthorized Request, please login first to perform the operation' });
    }
    // otherwise, return a bad request error
    
    console.log(e)
    return res.status(400).json({ Message: 'Bad Request' });
  }
};

module.exports = { routes, validateAPIRequest };
