import config from "../config";
import UserVerifyToken from "../database/entity/UserVerifyToken";
import { DateTimeCalculator, RandomCodeGenerator } from "../helpers";
import { ConflictError, NotFoundError } from "../../lib/src/exceptions";
import PasswordResetToken from "../database/entity/PasswordResetToken";

/**
 * @class PasswordResetTokenService
 */
class PasswordResetTokenService {

    /**
     * @method getResetPasswordLink
     * @static
     * @async
     * @param {string} userId 
     * @returns {Promise<string>}
     */
    static async getResetPasswordLink(userId: string): Promise<string> {
        const TOKEN_SEPERATOR = ":";

        const resetToken = await this.generateToken(userId);
        const userToken = `${resetToken.token}${TOKEN_SEPERATOR}${userId}`;

        const encodedUserToken: string = Buffer.from(userToken)
            .toString("base64");

        return `${config.FRONT_END_URL}/auth/account/password/reset/${encodedUserToken}`;
    }

    /**
     * @method verifyPasswordResetToken
     * @static
     * @async
     * @param {string} userId 
     * @param {string} tokenToVerify 
     * @returns {Promise<void>}
     */
    static async verifyPasswordResetToken(userId: string, tokenToVerify: string): Promise<void> {
        let userResetToken = await this.checkThatTokenExistForUser(userId);

        if(userResetToken.token !== tokenToVerify) {
            throw new ConflictError("Invalid reset password verification link!");
        }
    }

    /**
     * @method generateToken
     * @static
     * @async
     * @param {string} userId 
     * @returns {Promise<PasswordResetToken>}
     */
    private static async generateToken(userId: string): Promise<PasswordResetToken> {
        let passwordResetTokenToUpsert = await this.getByUserId(userId);

        if(!passwordResetTokenToUpsert) {
            passwordResetTokenToUpsert = new PasswordResetToken();
            passwordResetTokenToUpsert.userId = userId;
        }
        
        passwordResetTokenToUpsert.token = RandomCodeGenerator.get(60);
        passwordResetTokenToUpsert.expiresAt = DateTimeCalculator.getDateTimeInNext(
            config.PASSWORD_RESET_TOKEN_TTL_IN_HOURS
        );

        return passwordResetTokenToUpsert.save();
    }

    /**
     * @method getByUserId
     * @static
     * @async
     * @param {string} userId 
     * @returns {Promise<PasswordResetToken|null>}
     */
    private static async getByUserId(userId: string): Promise<PasswordResetToken|null> {
        return PasswordResetToken.findOne({ where: { userId } });
    }

    /**
     * @method checkThatTokenExistForUser
     * @static
     * @async
     * @param {string} userId
     * @returns {Promise<PasswordResetToken>}
     */
    private static async checkThatTokenExistForUser(userId: string): Promise<PasswordResetToken> {
        let passwordResetToken = await this.getByUserId(userId);
        if(passwordResetToken) { return passwordResetToken; }

        throw new NotFoundError("Invalid user token!");
    }

}

export default PasswordResetTokenService;