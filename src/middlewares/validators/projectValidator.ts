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
        BodyValidator.checkNonEmptyString("name"),
        BodyValidator.checkNonEmptyString("description"),
        BodyValidator.checkNonEmptyString("artistName"),
        BodyValidator.checkNonEmptyString("projectType"),
        BodyValidator.checkNonEmptyString("startDate"),
        BodyValidator.checkNonEmptyString("endDate"),
        // BodyValidator.checkNumeric("organisation"),
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
        BodyValidator.checkNonEmptyString("project"),
        BodyValidator.checkNonEmptyString("text"),
        //BodyValidator.ch("parentId"),
        checkRequestValidations()
    ];
}

}


export default projectValidator