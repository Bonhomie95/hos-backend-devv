import User from "../database/entity/User";
import {
  IChangePassword,
  ICreateUser,
  IUpdateProfile,
  IUpdateOrganization,
} from "../interfaces";
import { PasswordHasher } from "../helpers";
import EmailService from "./external/EmailService";
import AccountVerifyTokenService from "./AccountVerifyTokenService";
import {
  ConflictError,
  NotFoundError,
  UnauthenticatedError,
  UnprocessableError,
} from "../../lib/src/exceptions";
import AuthService from "./AuthService";
import Organization from "../database/entity/Organization";

/**
 * @class OrganizationService
 */
class OrganizationService {
  /**
   * @method create
   * @static
   * @async
   * @param {string} name
   * @param {string} countryCode
   * @param {string} owner
   * @returns {Promise<User>}
   */
  static async create(
    name: string,
    country: string,
    countryCode: string,
    city: string,
    address: string,
    mobileNumber: number,
    logo: string,
    owner: string,
  ): Promise<Organization> {
   // await this.checkThatOwnerDoesNotHaveOrganization(owner);
    await this.checkThatRecordDoesNotExist(name, countryCode);

    let organization = new Organization();
    
    organization.name = name;
    organization.country = country;
    organization.countryCode = countryCode;
    organization.city = city;
    organization.address = address;
    organization.mobileNumber = mobileNumber;
    organization.logo = logo;
    organization.owner = owner;

    return organization.save();
  }

  /**
   * @method getOrganization
   * @static
   * @async
   * @param {string}
   * @returns {Promise<User>}
   */
  static async getAllOrganization(): Promise<Organization[]> {
    const organizations = await Organization.find({relations: ["projects"]});
    if (organizations) {
      return organizations;
    }

    throw new NotFoundError("No Organization found");
  }

  /**
   * @method getOrganization
   * @static
   * @async
   * @param {string} name
   * @returns {Promise<void>}
   */
  static async getOrganization(name: string): Promise<Organization> {
    const foundOrganization = await Organization.findOne({ where: { name }, relations:["projects"] });
    if (foundOrganization) {
      return foundOrganization;
    }
    throw new NotFoundError("Organization does not exist!");
  }

  /**
   * @method checkThatOrganizationExist
   * @static
   * @async
   * @param {string} id
   * @returns {Promise<Organization>}
   */
  private static async checkThatOrganizationExist(
    id: string
  ): Promise<Organization> {
    const foundOrganization = await Organization.findOne({ where: { id } });
    if (foundOrganization) {
      return foundOrganization;
    }
    throw new NotFoundError("Organization does not exist!");
  }

  /**
   * @method updateOrganization
   * @static
   * @async
   * @param {string} id
   * @param {IUpdateOrganization} data
   * @returns {Promise<Organization>}
   */
  static async updateOrg(
    id: string,
    data: IUpdateOrganization
  ): Promise<Organization> {
    const foundOrganization = await this.checkThatOrganizationExist(id);

    await Organization.update({ id: id }, data);
    await foundOrganization.reload();
    return foundOrganization;
  }

  /**
   * @method checkThatOwnerDoesNotHaveOrganization
   * @static
   * @async
   * @param {string} owner
   * @returns {Promise<void>}
   */
  private static async checkThatOwnerDoesNotHaveOrganization(
    owner: string
  ): Promise<void> {
    const foundOrganization = await Organization.findOne({ where: { owner } });

    if (foundOrganization) {
      throw new ConflictError("Organization already exists for owner!");
    }
  }

  /**
   * @method checkThatRecordDoesNotExist
   * @static
   * @async
   * @param {string} name
   * @param {string} countryCode
   * @returns {Promise<void>}
   */
  private static async checkThatRecordDoesNotExist(
    name: string,
    countryCode: string
  ): Promise<void> {
    const foundOrganization = await Organization.findOne({
      where: { name, countryCode },
    });

    if (foundOrganization) {
      throw new ConflictError(
        `Organization already exists with name '${name}'' in '${countryCode}'!`
      );
    }
  }
}

export default OrganizationService;
