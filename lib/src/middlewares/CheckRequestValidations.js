"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
const express_validator_1 = require("express-validator");
/**
 *
 * @description
 * This middleware checks for all validation errors and throw a BadRequestError error if validation errors exists
 *
 * @function checkRequestValidations
 * @param {string} [message=Invalid request data] General error message to return
 * @return {function(Request, Response, NextFunction): null} Middleware to terminate request when validation fails
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
exports.default = (message) => (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new exceptions_1.BadRequestError(message || "Invalid request data", { metaData: errors });
    }
    next();
};
