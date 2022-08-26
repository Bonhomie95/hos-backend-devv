import UserService from "../services/UserService";
import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../../lib/src/helpers";
import { IUserRequest } from "../../lib/src/interfaces";
import { ICreateUser, IUpdateProfile } from "../interfaces";

/**
 * @class UserController
 */
class UserController {

    /**
     * @method createUser
     * @static
     * @async
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @returns {object}
     */
    static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, firstName, lastName, role, subscriptionPlan } = req.body;
            const createUserData: ICreateUser = {
                email,
                password,
                firstName,
                lastName,
                role,
                subscriptionPlan
            };

            const createdUser = await UserService.createUser(createUserData);

            ResponseHandler.created(res, createdUser);
        } catch(err) {
            next(err);
        }
    }

    /**
     * @method getProfile
     * @static
     * @async
     * @param {IUserRequest} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @returns {object}
     */
    static async getProfile(req: IUserRequest, res: Response, next: NextFunction) {
        try {
            const foundUser = await UserService.checkThatUserExist(req.user.id);
            delete (foundUser as any).password;

            ResponseHandler.ok(res, foundUser);
        } catch(err) {
            next(err);
        }
    }

    /**
     * @method changePassword
     * @static
     * @async
     * @param {IUserRequest} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @returns {object}
     */
    static async changePassword(req: IUserRequest, res: Response, next: NextFunction) {
        try {
            const { password, newPassword } = req.body;
            await UserService.changePassword({
                userId: req.user.id,
                password,
                newPassword
            });

            ResponseHandler.ok(res, undefined, "Password changed successfully!");
        } catch(err) {
            next(err);
        }
    }

    /**
     * @method updateProfile
     * @static
     * @async
     * @param {IUserRequest} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @returns {object}
     */
    static async updateProfile(req: IUserRequest, res: Response, next: NextFunction) {
        try {
            const { firstName, lastName, phoneNumber, dateOfBirth } = req.body;
            const updateData: IUpdateProfile = { firstName, lastName, phoneNumber, dateOfBirth };
            
            const updatedProfile = await UserService.updateProfile(
                req.user.id,
                updateData
            );

            ResponseHandler.ok(res, updatedProfile, "Profile updated successfully!");
        } catch(err) {
            next(err);
        }
    }

}

export default UserController;