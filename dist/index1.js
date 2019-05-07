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
// Dot Env Config
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
dotenv_1.config({ path: path_1.default.resolve(__dirname, '../.env') });
// Express JS Config
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.json());
// Addiitonal Libraries
const request_1 = __importDefault(require("request"));
// Custom imports
const utils_1 = require("./utils");
const ngrok_wrapper_1 = require("./ngrok-wrapper");
const console_1 = __importDefault(require("./console"));
// Hacky override for linting
const stdout = global.console;
const ngrok = new ngrok_wrapper_1.NgrokWrapper(console_1.default.port);
/**
 * Root callback endpoint for our OAuth app
 */
app.get('/', (req, res) => {
    stdout.log(`Step 3: Exchanging the code for an access token here: ${ngrok.get()}/exchange/${req.query.code}`);
    request_1.default.get(`${ngrok.get()}/exchange/${req.query.code}`, (error, _, token) => {
        if (error) {
            throw new Error(error);
        }
        stdout.log(`Step 4: Your Access Token: ${token}`);
        process.exit(0);
    });
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
    request_1.default.post('https://github.com/login/oauth/access_token', {
        json: {
            client_id: console_1.default.clientID,
            client_secret: console_1.default.clientSecret,
            code,
        },
    }, (error, _, body) => {
        if (error) {
            throw new Error(error);
        }
        res.status(200).send(`${body.access_token}`);
    });
});
app.listen(console_1.default.port);
(() => __awaiter(this, void 0, void 0, function* () {
    stdout.log('A simple GitHub OAuth test app flow');
    const url = yield ngrok.gen();
    stdout.log(`Step 1: Add ${url} as your Authorization callback URL, press any key once you've done this`);
    yield utils_1.keypress();
    let authURI = `https://github.com/login/oauth/authorize?client_id=${console_1.default.clientID}`;
    if (console_1.default.scopes) {
        authURI += `&scope=${console_1.default.scopes}`;
    }
    stdout.log(`Step 2: Test the authentication flow in your browser: ${authURI}`);
}))();
//# sourceMappingURL=index1.js.map