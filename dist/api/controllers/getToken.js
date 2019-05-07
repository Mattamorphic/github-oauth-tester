"use strict";
/**
 * @file getToken endpoint exchanges the code param for a token
 * @author Mattamorphic
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
function getToken(req, res) {
    const code = req.params.code;
    if (!code) {
        throw new Error('No code provided in params /token/:code');
    }
    console.log('Exchanging code for access token');
    request_1.default.post('https://github.com/login/oauth/access_token', {
        json: {
            client_id: req.app.locals.clientID,
            client_secret: req.app.locals.clientSecret,
            code,
        },
    }, (error, _, body) => {
        if (error) {
            throw new Error(error);
        }
        console.log('Exchanged successfully');
        res.status(200).send(`${body.access_token}`);
    });
}
exports.getToken = getToken;
//# sourceMappingURL=getToken.js.map