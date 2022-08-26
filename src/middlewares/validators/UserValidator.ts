import { UserRole, SubscriptionPlan } from "../../constants";
import { BodyValidator, checkRequestValidations } from "../../../lib/src/middlewares";

/**
 * @class UserValidator
 */
class UserValidator {

    static PASSWORD_MIN_LEN: number = 6;
    static PASSWORD_MAX_LEN: number = 20;

    /**
     * @method checkCreateUser
     * @static
     * @returns {any[]}
     */
    static checkCreateUser(): any[] {
        return [
            BodyValidator.checkEmail("email"),
            BodyValidator.checkNonEmptyString("password").isLength({
                min: this.PASSWORD_MIN_LEN,
                max: this.PASSWORD_MAX_LEN
            }),
            BodyValidator.checkNonEmptyString("firstName"),
            BodyValidator.checkNonEmptyString("lastName"),
            BodyValidator.checkString("role").isIn(Object.values(UserRole)),
            BodyValidator.checkString("subscriptionPlan").isIn(Object.values(SubscriptionPlan)),
            checkRequestValidations()
        ];
    }

    /**
     * @method checkChangePassword
     * @static
     * @returns {any[]}
     */
    static checkChangePassword(): any[] {
        return [
            BodyValidator.checkNonEmptyString("password"),
            BodyValidator.checkNonEmptyString("newPassword"),
            checkRequestValidations()
        ];
    }

    /**
     * @method checkUpdateProfile
     * @static
     * @returns {any[]}
     */
    static checkUpdateProfile(): any[] {
        return [
            BodyValidator.checkNonEmptyString("firstName", false),
            BodyValidator.checkNonEmptyString("lastName", false),
            BodyValidator.checkPhone("phoneNumber", false),
            BodyValidator.checkDate("dateOfBirth", false),
            checkRequestValidations()
        ];
    }

}

export default UserValidator;