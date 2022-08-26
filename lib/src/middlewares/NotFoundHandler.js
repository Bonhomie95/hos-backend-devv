"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
/**
 * @description
 * This is a validation middleware that checks all request location for the field to be validated
 *
 * @function notFoundHandler
 * @param {Request} req Express req object
 */
exports.default = (req) => {
    throw new exceptions_1.NotFoundError(`Method [${req.method}] not found for route [${req.originalUrl}]`);
};
