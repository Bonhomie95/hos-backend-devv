import UserService from "../services/UserService";
import { NextFunction, Response } from "express";
import { ResponseHandler } from "../../lib/src/helpers";
import { IUserRequest } from "../../lib/src/interfaces";
import { ICreateUser, IUpdateOrganization } from "../interfaces";
import OrganizationService from "../services/OrganizationService";

/**
 * @class OrganizationController
 */
class OrganizationController {
  /**
   * @method create
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async create(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const createdOrg = await OrganizationService.create(
        req.body.name,
        req.body.country,
        req.body.countryCode,
        req.body.city,
        req.body.address,
        req.body.mobileNumber,
        req.body.logo,
        req.user.id,
      );
      ResponseHandler.created(res, createdOrg);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method getAllOrganization
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {array}
   */
  static async getAllOrganization(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const getOrganizations = await OrganizationService.getAllOrganization();
      ResponseHandler.created(res, getOrganizations);
    } catch (err) {
      next(err);
    }
  }
  /**
   * @method getOneOrganization
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async getOneOrganization(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const getOrganization = await OrganizationService.getOrganization(
        req.params.id
      );

      ResponseHandler.created(res, getOrganization);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method updateOrganization
   * @static
   * @async
   * @param {IUserRequest} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async updateOrganization(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, countryCode, country, city, address, mobileNumber, logo } =
        req.body;
      const updateData: IUpdateOrganization = {
        name,
        countryCode,
        country,
        city,
        address,
        mobileNumber,
        logo,
      };

      const updatedOrganization = await OrganizationService.updateOrg(
        req.params.id,
        req.body
      );

      ResponseHandler.ok(
        res,
        updatedOrganization,
        "Organization updated successfully!"
      );
    } catch (err) {
      next(err);
    }
  }
}

export default OrganizationController;
