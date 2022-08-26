import AuthService from "../services/AuthService";
import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../../lib/src/helpers";

/**
 * @class AuthController
 */
class AuthController {

    /**
     * @method login
     * @static
     * @async
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @returns {object}
     */
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const userWithToken = await AuthService.authenticate(
                email, 
                password,
                req.ip,
                req.headers["user-agent"] || ""
            );

            delete userWithToken.password;

            ResponseHandler.ok(res, userWithToken, "Logged-in successfully!");
        } catch(err) {
            next(err);
        }
    }

    /**
     * @method verifyAccount
     * @static
     * @async
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @returns {object}
     */
    static async verifyAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, token } = req.params;
            await AuthService.verifyAccount(
                userId, 
                token
            );

            ResponseHandler.ok(res, undefined, "Account verified successfully!");
        } catch(err) {
            next(err);
        }
    }

    /**
     * @method sendResetLink
     * @static
     * @async
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @returns {object}
     */
    static async sendResetLink(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            await AuthService.sendResetLink(
                email
            );

            ResponseHandler.ok(res, undefined, "Password reset link sent successfully!");
        } catch(err) {
            next(err);
        }
    }

    /**
     * @method verifyPasswordResetToken
     * @static
     * @async
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @returns {object}
     */
    static async verifyPasswordResetToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, token } = req.params;
            await AuthService.verifyPasswordResetToken(
                userId, 
                token
            );

            ResponseHandler.ok(res, undefined, "Password reset token verified successfully!");
        } catch(err) {
            next(err);
        }
    }

    /**
     * @method resetPassword
     * @static
     * @async
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @returns {object}
     */
     static async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params, { token, password } = req.body;
            await AuthService.resetPassword(
                userId, 
                token,
                password
            );

            ResponseHandler.ok(res, undefined, "Password reset successfully!");
        } catch(err) {
            next(err);
        }
    }

}

export default AuthController;