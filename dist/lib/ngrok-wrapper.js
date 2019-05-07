"use strict";
/**
 * @file Ngrok wrapper to gen and protect the URI
 * @author Mattamorphic
 */
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
const ngrok_1 = __importDefault(require("ngrok"));
/**
 * Ngrok wrapper class
 */
class NgrokWrapper {
    /**
     * Configure the instance variables
     *
     * @param {number} port The port to expose
     */
    constructor(port) {
        this.port = port;
        this.url = '';
    }
    /**
     * Gen the URI using ngrok
     *
     * @return {Promise<string>}
     */
    gen() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.url = yield ngrok_1.default.connect(this.port);
                return this.url;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    /**
     * Fetch the URI from the instance variable
     *
     * @return {string}
     */
    get() {
        return this.url;
    }
}
exports.NgrokWrapper = NgrokWrapper;
//# sourceMappingURL=ngrok-wrapper.js.map