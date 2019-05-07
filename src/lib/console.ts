/**
 * @file Console / Options for the github-oauth-tester
 * @author Mattamorphic
 */

// Dot Env Config
import { config } from 'dotenv';
import path from 'path';
config({ path: path.resolve(__dirname, '../../.env') });

// Command line args
import commandLineArgs from 'command-line-args';
const options = commandLineArgs([
  { name: 'scope', alias: 's', type: String, multiple: true },
  { name: 'port', alias: 'p', type: Number },
  { name: 'client_id', type: String },
  { name: 'client_secret', type: String },
]);

// Determine either console options or .env
const variables = {
  clientID: options.client_id || process.env.CLIENT_ID,
  port: options.port || process.env.PORT || 5000,
  clientSecret: options.client_secret || process.env.CLIENT_SECRET,
  scopes: (options.scope || []).join('%20'),
};

// These values must be set, so throw if they aren't
if (!variables.clientID || !variables.clientSecret) {
  throw new Error('Must provide client_id / client_secret in .env or as console options');
}

// Return the variables
export default variables;
