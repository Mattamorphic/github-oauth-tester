"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dot Env Config
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
dotenv_1.config({ path: path_1.default.resolve(__dirname, '../.env') });
// Command line args
const command_line_args_1 = __importDefault(require("command-line-args"));
const options = command_line_args_1.default([
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
exports.default = variables;
//# sourceMappingURL=console.js.map