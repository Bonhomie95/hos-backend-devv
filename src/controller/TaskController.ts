
import { NextFunction, Response } from "express";
import { ResponseHandler } from "../../lib/src/helpers";
import { IUserRequest } from "../../lib/src/interfaces";
import taskService from "../services/TaskService";
import task from "../database/entity/Task";
import Task from "../database/entity/Task";
import schedule from "node-schedule";
import { sendEmail } from "../services/external/email";




// const scheduleReminderEmail = async (id: any) => {
//   try {
    // const task = await Task.findOne({ where: { id }});
    // const testMode = true;
    // const reminder_date = testMode
    // ? new Date(Date.now() + 10000) // Sends reminder email every 1 minute
    // : task?.endDate;


    // const job:any = schedule.scheduleJob(
    //   task?.title as string,
    //   reminder_date as Date,
    //   async () => {
    //     const flash = await Task.findOne({ where: { id }});
    //     if (!flash) return schedule.cancelJob(job);

    //     const mailTitle = ``;
    //     const mailBody = ``;

    //     const user = "";

    //     await sendEmail(user, mailTitle, mailBody);
        
      //   task?.endDate = ""
      
      //   if (!testMode) { 
      //     await Task.save();
      //   }
      // },
      // async () => {
      //   const task = await Task.findOne({ where: { id }});
      //   if (!task) return schedule.cancelJob(job);

      //   schedule.cancelJob(job);
      //   await scheduleReminderEmail(id);
      // }
      // }) 
//   } catch (error) {
//     console.log(error);
//   }
// }


/**
 * @class OrganizationController
 */
class taskController {
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
        const createdOrg = await taskService.create(
            req.body
           );
           ResponseHandler.created(res, createdOrg);
       
     
      } catch (err) {
        next(err);
      }
    }
    
  /**
   * @method getAlltasks
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {array}
   */
  static async getAlltask(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const escapeRegex = (text: string) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

      if (req.query) {
        const searchArr = ['title','status', 'endDate','startDate']
        let searchQuery: Record<string, any> = {};
        searchArr.forEach((field: string) => {
            if (req.query[field]) {
                const proj = (req.query as any)[field]
                const regex = new RegExp(escapeRegex(proj), 'gi');
                req.query = { ...req.query };
                searchQuery = { [field]: regex };
            }
        })
        const data = await task.find(searchQuery);
        ResponseHandler.ok(res, data);
      }

       const getTasks = await taskService.getAllTasks();
       ResponseHandler.ok(res, getTasks);
    } catch (err) {
      next(err);
    }
  }
  /**
   * @method getOnetask
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async getOnetask(
    req: IUserRequest,
    res: Response,    
    next: NextFunction
  ) {
    try {

     
      const gettask= await taskService.getTaskById(
      req.params.id
      );

      ResponseHandler.ok(res, gettask);
    
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method updatetask
   * @static
   * @async
   * @param {IUserRequest} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async updatetask(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const updatedtask= await taskService.updateOrg(
      req.params.id,
        req.body
      );

      ResponseHandler.ok(
        res,
        updatedtask,
        "task updated successfully!"
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
        const createdOrg = await taskService.createComment(
            req.body
           );
           ResponseHandler.created(res, createdOrg);
       
     
      } catch (err) {
        next(err);
      }
    }
    
  /**
   * @method getOneComment
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
      const comment= await taskService.getCommentById(
      req.params.id
      );

      ResponseHandler.ok(res, comment);
    } catch (err) {
      next(err);
    }
  }
}

export default taskController;
