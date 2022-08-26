"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("../constants"));
const CustomError_1 = __importDefault(require("./CustomError"));
/**
 * @class UnauthenticatedError
 */
class UnauthenticatedError extends CustomError_1.default {
    /**
     * @constructor
     * @param message
     * @param metaData
     */
    constructor(message = constants_1.default.ResponseMessage.ERR_UNAUTHENTICATED, metaData = {}) {
        super(constants_1.default.HttpStatusCode.UNAUTHENTICATED, message, metaData);
    }
}
exports.default = UnauthenticatedError;
