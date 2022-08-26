
import Task from "../database/entity/Task";
import Project from "../database/entity/Project";
/**
 * @interface Comment
 */
 export interface Comment {
    id?: string;
    name: string;
    text: string;
    origin: boolean;
    project: Project;
    parentId?: any;
    reply?: Comment[];
    createdAt: Date;
    disable_comment?: boolean

}

/**
 * @interface TaskComment
 */

export interface TaskComment {
    id?: string;
    name: string;
    text: string;
    origin: boolean;
    task: Task
    parentId?: any;
    replys?: any;
    createdAt: Date;

}


