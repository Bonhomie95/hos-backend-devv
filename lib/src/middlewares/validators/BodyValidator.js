"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const BaseValidator_1 = __importDefault(require("./BaseValidator"));
/**
 * @description
 * This is a validation middleware that checks only the request body for the field to be validated.
 * It extends from BaseValidator, therefore all static methods on BaseValidator exists on this class
 *
 * @class BodyValidator
 * @extends BaseValidator
 */
class BodyValidator extends BaseValidator_1.default {
    constructor() {
        super(...arguments);
        this.location = express_validator_1.body;
    }
}
exports.default = BodyValidator;
