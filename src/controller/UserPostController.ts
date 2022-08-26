import UserService from "../services/UserService";
import { NextFunction, Response } from "express";
import { ResponseHandler } from "../../lib/src/helpers";
import { IUserRequest } from "../../lib/src/interfaces";
import { ICreateUser, IUpdateOrganization } from "../interfaces";
import UserPost from "../database/entity/UserPost";

/**
 * @class OrganizationController
 */
class userPostController {
  /**
   * @method create
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async createPost(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const createdPost = await UserService.create(req.body);
      ResponseHandler.created(res, createdPost);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method getAllposts
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {array}
   */
  static async getAllposts(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const getPosts = await UserService.getAllposts();
      ResponseHandler.ok(res, getPosts);
    } catch (err) {
      next(err);
    }
  }
  /**
   * @method getpost
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {array}
   */
  static async getpost(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      
      const getPost = await UserService.getpost(req.params.id);
      ResponseHandler.ok(res, getPost);
    } catch (err) {
      next(err);
    }
  }
  /**
   * @method getpost
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {array}
   */
  static async likepost(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      
      const getPost = await UserService.likePost(req.params.id,req.user.id);
     
       ResponseHandler.ok(res, getPost);
    } catch (err) {
      next(err);
    }
  }
  /**
   * @method getAllUserProjects
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {array}
   */
  static async getAllUserProjects(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
        const userId = req.user.id;
      const getProjects = await UserService.getUserProjects(userId);
      ResponseHandler.ok(res, getProjects);
    } catch (err) {
      next(err);
    }
  }
}

export default userPostController;
