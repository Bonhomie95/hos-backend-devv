import RoleService from "../services/RoleService";
import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../../lib/src/helpers";

/**
 * @class RoleController
 */
class RoleController {

    /**
     * @method getUserRoles
     * @static
     * @async
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @returns {object}
     */
    static async getUserRoles(req: Request, res: Response, next: NextFunction) {
        try {
            ResponseHandler.ok(res, { 
                records: RoleService.getUserRoles() 
            });
        } catch(err) {
            next(err);
        }
    }

}

export default RoleController;