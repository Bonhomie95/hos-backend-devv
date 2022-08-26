import { UserRole } from "../constants";

/**
 * @interface ICreateUser
 */
export interface ICreateUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    subscriptionPlan: string;
}

export interface createpost {
    title: string;
    body: string;
    comments: string[];
    likes: string[];
    likeCount: number;
}