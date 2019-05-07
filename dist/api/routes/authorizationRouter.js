"use strict";
/**
 * @file Authorization router
 * @author Mattamorphic
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAuthorization_1 = require("../controllers/getAuthorization");
exports.authorizationRouter = express_1.Router();
exports.authorizationRouter.get('/', getAuthorization_1.getAuthorization);
//# sourceMappingURL=authorizationRouter.js.map