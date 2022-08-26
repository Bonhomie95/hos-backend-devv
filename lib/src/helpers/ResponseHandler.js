"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("../constants"));
const HttpStatusCode_1 = require("../constants/HttpStatusCode");
/**
 * @description
 * ```
 * import { ResponseHandler } from "@nestcoin/guildos-core";
 * ```
 * @class ResponseHandler
 */
class ResponseHandler {
    /**
     * @method send
     * @param {Response} res Express response object
     * @param {HttpStatusCode} statusCode Response status code
     * @param {object} [data] Response data
     * @param {string} [message] Optional response message
     * @memberOf ResponseHandler
     */
    static send(res, statusCode, data, message = constants_1.default.ResponseMessage.SUCCESS) {
        return res.status(statusCode).json(data || { message });
    }
    /**
     * @method ok
     * @param {Response} res Express response object
     * @param {object} [data] Response data
     * @param {string} [message] Optional response message
     * @memberOf ResponseHandler
     */
    static ok(res, data, message = constants_1.default.ResponseMessage.OK) {
        return ResponseHandler.send(res, HttpStatusCode_1.HttpStatusCode.SUCCESS, data, message);
    }
    /**
     * @method created
     * @param {Response} res Express response object
     * @param {object} [data] Response data
     * @param {string} [message] Optional response message
     * @memberOf ResponseHandler
     */
    static created(res, data, message = constants_1.default.ResponseMessage.CREATED) {
        return ResponseHandler.send(res, HttpStatusCode_1.HttpStatusCode.CREATED, data, message);
    }
    /**
     * @method accepted
     * @param {Response} res Express response object
     * @param {object} [data] Response data
     * @param {string} [message] Optional response message
     * @memberOf ResponseHandler
     */
    static accepted(res, data, message = constants_1.default.ResponseMessage.ACCEPTED) {
        return ResponseHandler.send(res, HttpStatusCode_1.HttpStatusCode.ACCEPTED, data, message);
    }
    /**
     * @method redirect
     * @param {Response} res Express response object
     * @param {string} url Url to redirect to
     * @param {RedirectStatusCode} [statusCode=301] Redirect status code, accept either 301 or 302
     * @memberOf ResponseHandler
     */
    static redirect(res, url) {
        return res.status(HttpStatusCode_1.HttpStatusCode.REDIRECT_TEMP).redirect(url);
    }
}
exports.default = ResponseHandler;
