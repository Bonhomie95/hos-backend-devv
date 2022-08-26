import { NextFunction, Response } from "express";
import { IUserRequest } from "../../../lib/src/interfaces";
import { UnauthorizedError } from "../../../lib/src/exceptions";

/**
 * @function Authorize
 * @description Middleware to perform authorization in API routes
 * @param {string[]} roles 
 * @param {boolean} specifiedAllowed 
 * @returns 
 */
const Authorize = (roles: string[] = [], specifiedAllowed = true) => {

    return (req: IUserRequest, res: Response, next: NextFunction) => {
        try {
            // TODO: Implementation to verify authorized role-access
            // throw new UnauthorizedError("Access denied!");
    
            // next();
        } catch(err) {
            next(err);
        }
    };
};

export default Authorize;