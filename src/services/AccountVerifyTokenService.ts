import config from "../config";
import UserVerifyToken from "../database/entity/UserVerifyToken";
import { DateTimeCalculator, RandomCodeGenerator } from "../helpers";
import { ConflictError, NotFoundError } from "../../lib/src/exceptions";

/**
 * @class AccountVerifyTokenService
 */
class AccountVerifyTokenService {

    /**
     * @method getVerifyAccountUrl
     * @static
     * @async
     * @param {string} userId 
     * @returns {Promise<string>}
     */
    static async getVerifyAccountUrl(userId: string): Promise<string> {
        const TOKEN_SEPERATOR = ":";

        const verifyToken = await this.generateToken(userId);
        const userToken = `${verifyToken.token}${TOKEN_SEPERATOR}${userId}`;

        const encodedUserToken: string = Buffer.from(userToken)
            .toString("base64");

        return `${config.FRONT_END_URL}/auth/account/verify/${encodedUserToken}`;
    }

    /**
     * @method verifyAccountToken
     * @static
     * @async
     * @param {string} userId 
     * @param {string} tokenToVerify 
     * @returns {Promise<void>}
     */
    static async verifyAccountToken(userId: string, tokenToVerify: string): Promise<void> {
        let userVerifyToken = await this.checkThatTokenExistForUser(userId);

        if(userVerifyToken.token !== tokenToVerify) {
            throw new ConflictError("Invalid account verification link!");
        }
    }

    /**
     * @method generateToken
     * @static
     * @async
     * @param {string} userId 
     * @returns {Promise<UserVerifyToken>}
     */
    private static async generateToken(userId: string): Promise<UserVerifyToken> {
        let verifyTokenToUpsert = await this.getByUserId(userId);

        if(!verifyTokenToUpsert) {
            verifyTokenToUpsert = new UserVerifyToken();
            verifyTokenToUpsert.userId = userId;
        }
        
        verifyTokenToUpsert.token = RandomCodeGenerator.get();
        verifyTokenToUpsert.expiresAt = DateTimeCalculator.getDateTimeInNext(
            config.ACCOUNT_VERIFY_TOKEN_TTL_IN_HOURS
        );

        return verifyTokenToUpsert.save();
    }

    /**
     * @method getByUserId
     * @static
     * @async
     * @param {string} userId 
     * @returns {Promise<UserVerifyToken|null>}
     */
    private static async getByUserId(userId: string): Promise<UserVerifyToken|null> {
        return UserVerifyToken.findOne({ where: { userId } });
    }

    /**
     * @method checkThatTokenExistForUser
     * @static
     * @async
     * @param {string} userId
     * @returns {Promise<UserVerifyToken>}
     */
    private static async checkThatTokenExistForUser(userId: string): Promise<UserVerifyToken> {
        let verifyToken = await this.getByUserId(userId);
        if(verifyToken) { return verifyToken; }

        throw new NotFoundError("Invalid user token!");
    }

}

export default AccountVerifyTokenService;