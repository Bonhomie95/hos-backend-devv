import { BodyValidator, checkRequestValidations } from "../../../lib/src/middlewares";
/**
 * @class projectValidator
 */
class projectValidator {

    /**
     * @method checkCreate
     * @static
     * @returns {any[]}
     */
    static checkCreate(): any[] {
    return [
        BodyValidator.checkNonEmptyString("title"),
        BodyValidator.checkNonEmptyString("description"),
      //  BodyValidator.checkNonEmptyString("status"),
        BodyValidator.checkNonEmptyString("project"),
        BodyValidator.checkNonEmptyString("startDate"),
        BodyValidator.checkNonEmptyString("endDate"),
        checkRequestValidations()
    ];
}
 /**
     * @method checkCreateComment
     * @static
     * @returns {any[]}
     */
  static checkCreateComment(): any[] {
    return [
        BodyValidator.checkNonEmptyString("name"),
        BodyValidator.checkNonEmptyString("task"),
        BodyValidator.checkNonEmptyString("text"),
        checkRequestValidations()
    ];
}

}


export default projectValidator