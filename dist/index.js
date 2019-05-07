"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Runner for the github-oauth-tester
 * @author Mattamorphic
 */
const open_1 = __importDefault(require("open"));
// ExpressJS Config
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./api"));
const app = express_1.default();
//  Custom imports
const utils_1 = require("./lib/utils");
const ngrok_wrapper_1 = require("./lib/ngrok-wrapper");
const console_1 = __importDefault(require("./lib/console"));
// Global ngrok class
const ngrok = new ngrok_wrapper_1.NgrokWrapper(console_1.default.port);
// Configure our api
api_1.default.locals.ngrok = ngrok;
api_1.default.locals.clientID = console_1.default.clientID;
api_1.default.locals.clientSecret = console_1.default.clientSecret;
// Attach api to app
app.use('/', api_1.default);
// Start the app on our port
app.listen(console_1.default.port);
// Main
(() => __awaiter(this, void 0, void 0, function* () {
    console.log('A simple GitHub OAuth test app flow');
    // Create an ngrok URI and tell the user to update their app
    const url = yield ngrok.gen();
    console.log(`1. Add ${url}/authorization as your Authorization callback URL ${'\n'}` + '> Press any key to open your settings');
    yield utils_1.keypress();
    yield open_1.default('https://github.com/settings/developers');
    // Create an OAuth URI and open this in a browser
    let authURI = 'https://github.com/login/oauth/authorize?client_id=' + console_1.default.clientID;
    if (console_1.default.scopes) {
        authURI += `&scope=${console_1.default.scopes}`;
    }
    console.log(`2. Generated URI ${authURI} ${'\n'}` + '> Press any key to test the authentication flow');
    yield utils_1.keypress();
    // Open the browser
    yield open_1.default(authURI);
    console.log('\n===========================================================\n');
}))();
//# sourceMappingURL=index.js.map