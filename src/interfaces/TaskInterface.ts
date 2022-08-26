/**
 * @interface Task
 */
import Project from "../database/entity/Project";
 export interface Task{
     id?: string;
     title: string;
     description: string;
     startDate: Date;
     endDate: Date;
     projectMembers?: string[];
     createdAt: Date;
     project: Project;
     reload: any;
     

}

export interface EditTask {
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    projectMembers?: string[];
    project?: any;
}
