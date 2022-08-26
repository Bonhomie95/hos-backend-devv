import UserService from "../services/UserService";
import { NextFunction, Response } from "express";
import { ResponseHandler } from "../../lib/src/helpers";
import { IUserRequest } from "../../lib/src/interfaces";
import { ICreateUser, IUpdateOrganization } from "../interfaces";
import OrganizationService from "../services/OrganizationService";
import projectService from "../services/ProjectService";
import projectCommentService from "../services/ProjectCommentService"
import project from "../database/entity/Project";

/**
 * @class OrganizationController
 */
class projectController {
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
        const createdOrg = await projectService.create(
            req.body
           );
           ResponseHandler.created(res, createdOrg);
       
     
      } catch (err) {
        next(err);
      }
    }
    
  /**
   * @method getAllprojects
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {array}
   */
  static async getAllproject(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const escapeRegex = (text: string) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

      if (req.query) {
        const searchArr = ['name', 'projectType','artistName']
        let searchQuery: Record<string, any> = {};
        searchArr.forEach((field: string) => {
            if (req.query[field]) {
                const proj = (req.query as any)[field]
                const regex = new RegExp(escapeRegex(proj), 'gi');
                req.query = { ...req.query };
                searchQuery = { [field]: regex };
            }
        })
        const data = await project.find(searchQuery);
        ResponseHandler.ok(res, data);
      }

       const getProjects = await projectService.getAllprojects();
       ResponseHandler.ok(res, getProjects);
    } catch (err) {
      next(err);
    }
  }
  /**
   * @method getOneproject
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async getOneproject(
    req: IUserRequest,
    res: Response,    
    next: NextFunction
  ) {
    try {

     
      const getproject= await projectService.getprojectById(
      req.params.id
      );

      ResponseHandler.ok(res, getproject);
    
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method updateproject
   * @static
   * @async
   * @param {IUserRequest} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async updateproject(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const updatedproject= await projectService.updateOrg(
      req.params.id,
        req.body
      );

      ResponseHandler.ok(
        res,
        updatedproject,
        "project updated successfully!"
      );
    } catch (err) {
      next(err);
    }
  }

   /**
   * @method create
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
    static async createComment(req: IUserRequest, res: Response, next: NextFunction) {
      try {
        console.log(req.body)
        const createdOrg = await projectCommentService.create(
            req.body
           );
           ResponseHandler.created(res, createdOrg);
       
     
      } catch (err) {
        next(err);
      }
    }
    
  /**
   * @method getOneproject
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async getCommentById(
    req: IUserRequest,
    res: Response,    
    next: NextFunction
  ) {
    try {
      const comment= await projectCommentService.getCommentById(
      req.params.id
      );

      ResponseHandler.ok(res, comment);
    } catch (err) {
      next(err);
    }
  }
}

export default projectController;
