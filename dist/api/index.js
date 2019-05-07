"use strict";
/**
 * @file API application
 * @author Mattamorphic
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express JS Config
const express_1 = __importDefault(require("express"));
const api = express_1.default();
const body_parser_1 = __importDefault(require("body-parser"));
api.use(body_parser_1.default.json());
// Routers
const routes_1 = require("./routes/");
// Add endpoints
api.use('/authorization', routes_1.authorizationRouter);
api.use('/token', routes_1.tokenRouter);
exports.default = api;
//# sourceMappingURL=index.js.map