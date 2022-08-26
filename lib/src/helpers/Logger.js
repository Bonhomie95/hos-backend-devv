"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerStream = exports.Logger = void 0;
const path_1 = __importDefault(require("path"));
const constants_1 = __importDefault(require("../constants"));
require("winston-daily-rotate-file");
const winston_1 = require("winston");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const rootPath = process.env.PWD || path_1.default.dirname(require.main.filename);
const transport = new winston_1.transports.DailyRotateFile({
    filename: "application-%DATE%.log",
    dirname: path_1.default.join(rootPath, `./logs/`),
    level: "info",
    handleExceptions: true,
    json: true,
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d"
});
transport.on("rotate", function () {
    // do something fun
});
/**
 * @description
 * ```
 * import { Logger } from "@nestcoin/guildos-core";
 * ```
 * @const Logger
 * @property {LeveledLogMethod} info
 * @property {LeveledLogMethod} warn
 * @property {LeveledLogMethod} error
 * @property {LeveledLogMethod} debug
 */
const Logger = (0, winston_1.createLogger)({
    transports: [transport]
});
exports.Logger = Logger;
if (process.env.NODE_ENV !== constants_1.default.Environment.PRODUCTION) {
    Logger.add(new winston_1.transports.Console({
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
        level: "debug",
    }));
}
/**
 * @description
 * ```
 * import { LoggerStream } from "@nestcoin/guildos-core";
 * ```
 * @const LoggerStream
 * @property {function(string)} write
 */
const LoggerStream = {
    write: (message) => { Logger.info(message); }
};
exports.LoggerStream = LoggerStream;
