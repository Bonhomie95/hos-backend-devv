
import {
  project,
Editproject
} from "../interfaces/Projectinterface";
import {
  Comment,
} from "../interfaces/index";
import {
  NotFoundError,
} from "../../lib/src/exceptions";
import projectEntity from "../database/entity/Project";
import CommentEntity from "../database/entity/comment";
import { IsNull } from "typeorm";




/*
 * @class projectService
 */
class projectService {
  /**
   * @method create
   * @static
   * @async
   * @returns {Promise<project>}
   */
  static async create(
   data : project
  ): Promise<project> {


    let project = new projectEntity();

    project.name = data.name
    project.description = data.description
    project.artistName = data.artistName
    project.projectType = data.projectType
   project.startDate = data.startDate
    project.endDate = data.endDate
    project.organisation = data.organisation

    //console.log(project)
    return project.save()
    
  }

  /**
   * @method getprojects
   * @static
   * @async
   * @param {string}
   * @returns {Promise<project>}
   */
  static async getAllprojects(): Promise<project[]> {
    const projects = await projectEntity.find();
    if (projects) {
      return projects;
    }

    throw new NotFoundError("No projects found");
  }

  /**
   * @method getprojectById
   * @static
   * @async
   * @param {string} id
   * @returns {Promise<void>}
   */
  static async getprojectById(id: any): Promise<project> {
    let foundproject = await projectEntity.findOne({relations: ["comment"], where: {id}});


    if (foundproject) {
   
    return foundproject
    }
    
    throw new NotFoundError("project does not exist!");
  }


  /**
   * @method updateproject
   * @static
   * @async
   * @param {number} id
   * @param {IUpdateOrganization} data
   * @returns {Promise<project>}
   */
  static async updateOrg(
    id: string,
    data: Editproject
  ): Promise<project> {
      const project = await this.getprojectById(id)

    await projectEntity.update({id}, data);
    await project.reload();
    return project;
  }
}

export default projectService;
