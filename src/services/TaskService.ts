
import {
    Task,
  EditTask
  } from "../interfaces/TaskInterface";
  import {
    TaskComment
  } from "../interfaces/Commentinterface";
  import {
    NotFoundError,
  } from "../../lib/src/exceptions";
  import TaskEntity from "../database/entity/Task";
  import TaskCommentEntity from "../database/entity/TaskComment";

  
  
  
  
  /*
   * @class TaskService
   */
  class TaskService {
    /**
     * @method create
     * @static
     * @async
     * @returns {Promise<Task>}
     */
    static async create(
     data : Task
    ): Promise<Task> {
  
  
      let Task = new TaskEntity();
  
      Task.title = data.title
      Task.description = data.description
      Task.startDate = data.startDate
      Task.endDate = data.endDate
      Task.project = data.project
  
      //console.log(Task)
      return Task.save()
      
    }
  
    /**
     * @method getTasks
     * @static
     * @async
     * @param {string}
     * @returns {Promise<Task>}
     */
    static async getAllTasks(): Promise<Task[]> {
      const tasks = await TaskEntity.find();
      if (tasks) {
        return tasks;
      }
  
      throw new NotFoundError("No Tasks found");
    }
  
    /**
     * @method getTaskById
     * @static
     * @async
     * @param {string} id
     * @returns {Promise<void>}
     */
    static async getTaskById(id: any): Promise<Task> {
      let foundTask = await TaskEntity.findOne({relations: ["comment"], where: {id}});
  
  
      if (foundTask) {
     
      return foundTask
      }
      
      throw new NotFoundError("Task does not exist!");
    }
  
  
    /**
     * @method updateTask
     * @static
     * @async
     * @param {number} id
     * @param {IUpdateOrganization} data
     * @returns {Promise<Task>}
     */
    static async updateOrg(
      id: string,
      data: EditTask
    ): Promise<Task> {
        const Task = await this.getTaskById(id)
  
      await TaskEntity.update({id}, data);
      await Task.reload();
      return Task;
    }

     /**
     * @method create
     * @static
     * @async
     * @returns {Promise<comment>}
     */
      static async createComment(
        data : TaskComment
       ): Promise<TaskComment> {
      if (data.parentId) {
       data.origin = false
     }
     
         let comment = new TaskCommentEntity();
     
         comment.name = data.name
         comment.text = data.text
         comment.task = data.task
         comment.parentId= data.parentId
         comment.origin = data.origin
     
       return comment.save()
       }
       
       /**
        * @method getCommentById
        * @static
        * @async
        * @param {string} id
        * @returns {Promise<void>}
        */
       static async getCommentById(id: string): Promise<TaskComment> {
         const foundcomment = await TaskCommentEntity.findOne({ where: { id }, relations: ["replys"]}); 
         if (foundcomment) {
           return foundcomment;
         }
         throw new NotFoundError("comment does not exist!");
       }
   
  }
  
  export default TaskService;
  