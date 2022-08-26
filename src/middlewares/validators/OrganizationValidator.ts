import { UserRole, SubscriptionPlan } from "../../constants";
import {
  BodyValidator,
  checkRequestValidations,
} from "../../../lib/src/middlewares";

/**
 * @class OrganizationValidator
 */
class OrganizationValidator {
  /**
   * @method checkCreate
   * @static
   * @returns {any[]}
   */
  static checkCreate(): any[] {
    return [
      BodyValidator.checkNonEmptyString("name").trim().toUpperCase(),
      BodyValidator.checkNonEmptyString("countryCode")
        .isAlpha()
        .isLength({ min: 2, max: 2 })
        .toUpperCase(),
      BodyValidator.checkNonEmptyString("country"),
      BodyValidator.checkNonEmptyString("city"),
      BodyValidator.checkNonEmptyString("address"),
      BodyValidator.checkNonEmptyString("mobileNumber"),
      BodyValidator.checkNonEmptyString("logo"),
      checkRequestValidations(),
    ];
  }
}

export default OrganizationValidator;
