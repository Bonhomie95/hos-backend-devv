
import {
    Comment,
  } from "../interfaces/index";
  
  import {
    NotFoundError,
  } from "../../lib/src/exceptions";
  import CommentEntity from "../database/entity/comment";
  
  /**
   * @class commentService
   */
  class commentService {
    /**
     * @method create
     * @static
     * @async
     * @returns {Promise<comment>}
     */
    static async create(
     data : Comment
    ): Promise<Comment> {
   if (data.parentId) {
    data.origin = false
  }
  
      let comment = new CommentEntity();
  
      comment.name = data.name
      comment.text = data.text
      comment.project = data.project
      comment.parentId= data.parentId
      comment.origin = data.origin
  
    return comment.save()
    }
    
    /**
     * @method getCommentById
     * @static
     * @async
     * @param {string} name
     * @returns {Promise<void>}
     */
    static async getCommentById(id: string): Promise<Comment> {
      const foundcomment = await CommentEntity.findOne({ where: { id }, relations: ["reply"]}); 
      if (foundcomment) {
        return foundcomment;
      }
      throw new NotFoundError("comment does not exist!");
    }

  }
  
  export default commentService;
  