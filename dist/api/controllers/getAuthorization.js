"use strict";
/**
 * @file Get authorization endpoint, callback for app
 * @author Mattamorphic
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
function getAuthorization(req, res) {
    const code = req.query.code;
    if (!code) {
        throw new Error('No code provided in query parameter');
    }
    const uri = `${req.app.locals.ngrok.get()}/token/${code}`;
    console.log(`Requesting token from ${uri}`);
    request_1.default.get(uri, null, (error, _, token) => {
        if (error) {
            throw new Error(error);
        }
        console.log(`Access token created: ${token}`);
    });
    res.status(200).send('OK');
}
exports.getAuthorization = getAuthorization;
//# sourceMappingURL=getAuthorization.js.map