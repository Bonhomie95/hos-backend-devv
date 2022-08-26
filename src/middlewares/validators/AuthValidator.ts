import { BodyValidator, checkRequestValidations, ParamValidator } from "../../../lib/src/middlewares";

/**
 * @class AuthValidator
 */
class AuthValidator {

    /**
     * @method checkLogin
     * @static
     * @returns {any[]}
     */
    static checkLogin(): any[] {
        return [
            BodyValidator.checkEmail("email"),
            BodyValidator.checkNonEmptyString("password"),
            checkRequestValidations()
        ];
    }

    /**
     * @method checkVerifyAccount
     * @static
     * @returns {any[]}
     */
    static checkVerifyAccount(): any[] {
        return [
            ParamValidator.checkUUID("userId"),
            ParamValidator.checkNonEmptyString("token"),
            checkRequestValidations()
        ];
    }

    /**
     * @method checkSendResetLink
     * @static
     * @returns {any[]}
     */
    static checkSendResetLink(): any[] {
        return [
            BodyValidator.checkEmail("email"),
            checkRequestValidations()
        ];
    }

    /**
     * @method checkResetPassword
     * @static
     * @returns {any[]}
     */
    static checkResetPassword(): any[] {
        return [
            ParamValidator.checkUUID("userId"),
            BodyValidator.checkNonEmptyString("token"),
            BodyValidator.checkNonEmptyString("password"),
            checkRequestValidations()
        ];
    }

}

export default AuthValidator;