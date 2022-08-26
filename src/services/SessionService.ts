import User from "../database/entity/User";
import { IAuthPayload } from "../interfaces";
import { DeviceMobileCategory } from "../constants";
import UserSession from "../database/entity/UserSession";
import { DateTimeCalculator, JwtHelper } from "../helpers";

/**
 * @class SessionService
 */
class SessionService {

    /**
     * @method createOrUpdatePlatformSession
     * @static
     * @async
     * @param {User} user 
     * @param {DeviceMobileCategory} platform 
     * @param {string} ipAddress 
     * @returns {Promise<UserSession>}
     */
    static async createOrUpdatePlatformSession(
        user: User, 
        platform: DeviceMobileCategory, 
        ipAddress: string
    ): Promise<UserSession> {
        let userSession = await this.getUserPlatformSession(user.id, platform);

        const AUTH_TOKEN_TTL_IN_HOURS = 24;
        const AUTH_TOKEN = await this.getAuthToken(user, AUTH_TOKEN_TTL_IN_HOURS);

        userSession.token = AUTH_TOKEN;
        userSession.ipAddress = ipAddress;

        userSession.expiresAt = DateTimeCalculator.getDateTimeInNext(
            AUTH_TOKEN_TTL_IN_HOURS
        );

        return userSession.save();
    }

    /**
     * @method getUserPlatformSession
     * @static
     * @async
     * @param {string} userId 
     * @param {string} platform 
     * @returns {Promise<UserSession>}
     */
    private static async getUserPlatformSession(userId: string, platform: DeviceMobileCategory)
    : Promise<UserSession> {

        let userSession = await UserSession.findOne({ where: { userId, platform } });

        if(!userSession) {
            userSession = new UserSession();
            userSession.userId = userId;
            userSession.platform = platform;
        }

        return userSession;
    }

    /**
     * @method getAuthToken
     * @static
     * @param param0 
     * @param {number} ttlInHours 
     * @returns {string}
     */
    private static getAuthToken({ id, userType, role }: User, ttlInHours: number): string {
        const PAYLOAD: IAuthPayload = { id, userType, role };

        return JwtHelper.generateToken(
            PAYLOAD, 
            `${ttlInHours}h`
        );
    }

}

export default SessionService;