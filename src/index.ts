/**
 * @file Runner for the github-oauth-tester
 * @author Mattamorphic
 */
import open from 'open';

// ExpressJS Config
import express from 'express';
import api from './api';
const app = express();

//  Custom imports
import { keypress } from './lib/utils';
import { NgrokWrapper } from './lib/ngrok-wrapper';
import variables from './lib/console';

// Global ngrok class
const ngrok = new NgrokWrapper(variables.port);

// Configure our api
api.locals.ngrok = ngrok;
api.locals.clientID = variables.clientID;
api.locals.clientSecret = variables.clientSecret;

// Attach api to app
app.use('/', api);

// Start the app on our port
app.listen(variables.port);

// Main
(async (): Promise<void> => {
  console.log('A simple GitHub OAuth test app flow');
  // Create an ngrok URI and tell the user to update their app
  const url = await ngrok.gen();
  console.log(
    `1. Add ${url}/authorization as your Authorization callback URL ${'\n'}` + '> Press any key to open your settings',
  );
  await keypress();
  await open('https://github.com/settings/developers');
  // Create an OAuth URI and open this in a browser
  let authURI = 'https://github.com/login/oauth/authorize?client_id=' + variables.clientID;
  if (variables.scopes) {
    authURI += `&scope=${variables.scopes}`;
  }
  console.log(`2. Generated URI ${authURI} ${'\n'}` + '> Press any key to test the authentication flow');
  await keypress();
  // Open the browser
  await open(authURI);
  console.log('\n===========================================================\n');
})();
