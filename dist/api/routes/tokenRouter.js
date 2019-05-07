"use strict";
/**
 * @file Token router
 * @author Mattamorphic
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getToken_1 = require("../controllers/getToken");
exports.tokenRouter = express_1.Router();
exports.tokenRouter.get('/:code', getToken_1.getToken);
//# sourceMappingURL=tokenRouter.js.map