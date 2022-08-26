"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("../constants"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GlobalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || constants_1.default.HttpStatusCode.SERVER_ERROR;
    const message = err.message || constants_1.default.ResponseMessage.ERR_SERVER;
    const metaData = err.metaData || {};
    res.status(statusCode).send(Object.assign({ message }, metaData));
};
exports.default = GlobalErrorHandler;
