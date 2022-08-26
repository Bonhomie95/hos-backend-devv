"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("../constants"));
const CustomError_1 = __importDefault(require("./CustomError"));
/**
 * @class BadRequestError
 */
class BadRequestError extends CustomError_1.default {
    /**
     * @constructor
     * @param message
     * @param metaData
     */
    constructor(message = constants_1.default.ResponseMessage.ERR_BAD_REQUEST, metaData = {}) {
        super(constants_1.default.HttpStatusCode.BAD_REQUEST, message, metaData);
    }
}
exports.default = BadRequestError;
