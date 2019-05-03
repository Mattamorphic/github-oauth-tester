require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ngrok = require('ngrok');
const request = require('request');

const commandLineArgs = require('command-line-args')
const options = commandLineArgs([
  { name: 'scope', alias: 's', type: String, multiple: true },
  { name: 'port', alias: 'p', type: Number },
  { name: 'client_id', type: String },
  { name: 'client_secret', type: String},
]);

const port = options.port || process.env.PORT || 5000;
const scopes = (options.scope || []).join('%20');

const client_id = options.client_id || process.env.CLIENT_ID;
const client_secret = options.client_secret || process.env.CLIENT_SECRET;

if (!client_id || !client_secret) {
  console.error('Ensure you have an OAuth App Created');
  console.error('Either supply the client_id/client_secret as options, or added to a .env file');
  process.exit(0);
}

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
  console.log(`Step 3: Exchanging the code for an access token here: ${url}/exchange/${req.query.code}`);
  request.get(
    `${url}/exchange/${req.query.code}`,
    (error, response, token) => {
      console.log(`Step 4: Your Access Token: ${token}`);
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
  url = await genNgrokURL(port);
  console.log(`Step 1: Add ${url} as your Authorization callback URL, press any key once you've done this`);
  await keypress();
  let auth_url = `https://github.com/login/oauth/authorize?client_id=${client_id}`
  if (scopes) {
    auth_url += `&scope=${scopes}`;
  }
  console.log(`Step 2: Test the authentication flow in your browser: ${auth_url}`);

})();
