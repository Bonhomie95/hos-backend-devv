import UserService from "./UserService";
import User from "../database/entity/User";
import SessionService from "./SessionService";
import EmailService from "./external/EmailService";
import { UnauthenticatedError } from "../../lib/src/exceptions";
import { DevicePlatformDetector, PasswordHasher } from "../helpers";
import AccountVerifyTokenService from "./AccountVerifyTokenService";
import PasswordResetTokenService from "./PasswordResetTokenService";

/**
 * @class AuthService
 */
class AuthService {

    /**
     * @method authenticate
     * @static
     * @async
     * @param {string} email
     * @param {string} password
     * @param {string} ipAddress 
     * @param {string} userAgent
     * @returns {Promise<User>}
     */
    static async authenticate(
        email: string, 
        password: string, 
        ipAddress: string, 
        userAgent: string
    ): Promise<any> {

        const user = await UserService.checkThatEmailExistForLogin(email);

        UserService.checkThatUserIsVerified(user);
        UserService.checkThatUserIsActive(user);

        this.checkThatPasswordIsValid(password, user.password);

        const userSession = await SessionService.createOrUpdatePlatformSession(
            user,
            DevicePlatformDetector.getMobileCategory(userAgent),
            ipAddress
        );

        user.lastLoginAt = new Date();
        
        return { 
            ... await user.save(), 
            authToken: userSession.token 
        };
    }

    /**
     * @method verifyAccount
     * @static
     * @async
     * @param {string} userId
     * @param {string} token 
     * @returns {Promise<User>}
     */
    static async verifyAccount(userId: string, token: string): Promise<void> {
        const user = await UserService.checkThatUserIsNotVerified(userId);

        await AccountVerifyTokenService.verifyAccountToken(userId, token);
        await UserService.markUserAccountAsVerified(user);
    }

    /**
     * @method verifyPasswordResetToken
     * @static
     * @async
     * @param {string} userId
     * @param {string} token 
     * @returns {Promise<User>}
     */
    static async verifyPasswordResetToken(userId: string, token: string): Promise<void> {
        await PasswordResetTokenService.verifyPasswordResetToken(userId, token);
    }

    /**
     * @method resetPassword
     * @static
     * @async
     * @param {string} userId
     * @param {string} token 
     * @param {string} newPassword
     * @returns {Promise<User>}
     */
    static async resetPassword(userId: string, token: string, newPassword: string): Promise<User> {
        const foundUser = await UserService.checkThatUserExist(userId);

        await PasswordResetTokenService.verifyPasswordResetToken(userId, token);

        foundUser.password = PasswordHasher.hash(newPassword);
        return foundUser.save();
    }

    /**
     * @method sendResetLink
     * @static
     * @async
     * @param {string} email 
     * @returns {Promise<User>}
     */
    static async sendResetLink(email: string): Promise<User> {
        const user = await UserService.checkThatEmailExist(email);

        const RESET_PASSWORD_URL = await PasswordResetTokenService
            .getResetPasswordLink(user.id);

        (await EmailService.getInstance()).sendResetPasswordMail(
            email,
            UserService.getUserFullName(user),
            RESET_PASSWORD_URL
        );
        
        return user;
    }

    /**
     * @method checkThatPasswordIsValid
     * @static
     * @param {string} plainTextPasword 
     * @param {string} hashedPassword 
     */
    static checkThatPasswordIsValid(plainTextPasword: string, hashedPassword: string): void {
        if(!PasswordHasher.verify(plainTextPasword, hashedPassword)) {
            throw new UnauthenticatedError("User credentials don't match!");
        }
    }

}

export default AuthService;