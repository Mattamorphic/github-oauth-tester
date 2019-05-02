require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ngrok = require('ngrok');
const request = require('request');

const port = process.env.PORT || 5000;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

// Application/json parser
app.use(bodyParser.json());

/**
 * Pause until key press using an async function
 *
 * @return {Promise}
 */
const keypress = async() => {
  process.stdin.setRawMode(true);
  return new Promise(resolve => process.stdin.once('data', () => {
    process.stdin.setRawMode(false);
    resolve();
  }))
}

/**
 * Root callback endpoint for our OAuth app
 */
app.get('/', (req, res) => {
  console.log(`Step 5: Exchanging the code for an access token here: ${url}/exchange/${req.query.code}`);
  request.get(
    `${url}/exchange/${req.query.code}`,
    (error, response, token) => {
      console.log(`Step 6: Your Access Token: ${token}`);
      process.exit(0);
    }
  );

  res.status(200).send(`OK`);
});

/**
 * Performs the exchange of the code for the access token
 */
app.get('/exchange/:code', (req, res) => {
  const code = req.params.code;
  if (!code) {
    throw new Error('Can only be called with a /:code');
  }
  request.post(
    'https://github.com/login/oauth/access_token',
    {
      json: {
        client_id,
        client_secret,
        code,
      },
    }, (error, _, body) => {
      if (error) {
        throw new Error(error);
      }
      res.status(200).send(`${body.access_token}`);
    });


})

app.listen(port);

/**
 * Create an Ngrok URL
 *
 * @param {number} port The port for ngrok to tunnel on
 */
async function genNgrokURL(port) {
  try {
    return await ngrok.connect(port);
  } catch (err) {
    console.error(`Ngrok Error: ${err}`);
    throw new Error(err);
  }
}

let url = '';
(async function () {
  console.log('A simple GitHub OAuth test app flow');
  console.log('Step 1: Ensure you have an OAuth app created');
  console.log('Step 2: Add the CLIENT_ID and CLIENT_SECRET to the .env file');
  url = await genNgrokURL(port);
  console.log(`Step 3: Add ${url} as your Authorization callback URL, press any key once you've done this`);
  await keypress();
  console.log(`Step 4: Test this here: https://github.com/login/oauth/authorize?client_id=${client_id}`);

})();
