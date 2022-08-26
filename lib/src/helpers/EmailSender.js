"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
/**
 * @class EmailSender
 */
class EmailSender {
    /**
     * @constructor
     * @param {string} SENDER_EMAIL
     * @param {string} SENDER_PASSWORD
     */
    constructor(SENDER_EMAIL, SENDER_PASSWORD) {
        this.MAIL_FROM_NAME = "HouseOfSounds";
        const AUTH = {
            user: SENDER_EMAIL,
            pass: SENDER_PASSWORD
        };
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: AUTH
        });
        this.SENDER_EMAIL = SENDER_EMAIL;
    }
    /**
     * @method send
     * @async
     * @param {string} toEmail
     * @param {string} subject
     * @param {string} message
     */
    send(toEmail, subject, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const FROM_MAIL_INFO = {
                name: this.MAIL_FROM_NAME,
                address: this.SENDER_EMAIL
            };
            this.transporter.sendMail({
                from: FROM_MAIL_INFO,
                to: toEmail,
                subject,
                text: message
            });
        });
    }
}
exports.default = EmailSender;
