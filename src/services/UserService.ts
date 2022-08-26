import User from "../database/entity/User";
import { IChangePassword, ICreateUser, IUpdateProfile } from "../interfaces";
import { PasswordHasher } from "../helpers";
import EmailService from "./external/EmailService";
import AccountVerifyTokenService from "./AccountVerifyTokenService";
import { ConflictError, NotFoundError, UnauthenticatedError, UnprocessableError } from "../../lib/src/exceptions";
import AuthService from "./AuthService";
import { createpost } from "../interfaces/ICreateUser";
import projectEntity from "../database/entity/Project";
import { project } from "../interfaces/Projectinterface";
import UserPost from "../database/entity/UserPost";
import { ArrayContains } from "typeorm"





/**
 * @class UserService
 */
class UserService {

    /**
     * @method createUser
     * @static
     * @async
     * @param {ICreateUser} data 
     * @returns {Promise<User>}
     */
    static async createUser(data: ICreateUser): Promise<User> {
        await this.checkThatEmailDoesNotExist(data.email);

        const createdUser = await this.getUserToCreate(data).save();

        const VERIFY_ACCOUNT_URL = await AccountVerifyTokenService
            .getVerifyAccountUrl(createdUser.id);

        (await EmailService.getInstance()).sendVerifyAccountMail(
            createdUser.email,
            this.getUserFullName(createdUser),
            VERIFY_ACCOUNT_URL
        );
        
        return createdUser;
    }

      /**
   * @method createPost
   * @static
   * @async
   * @param {ICreateUser} data
   * @returns {Promise<User>}
   */
  static async create(data: createpost): Promise<createpost> {
    let post = new UserPost();

    post.title = data.title;
    post.body = data.body;
    post.comments = data.comments;
    post.likes = data.likes;
    post.likeCount = data.likeCount;

    //console.log(project)
    return post.save();
  }

  /**
   * @method getprojects
   * @static
   * @async
   * @param {string}
   * @returns {Promise<createpost>}
   */
  static async getAllposts(): Promise<createpost[]> {
    const posts = await UserPost.find();
    if (posts) {
      return posts;
    }

    throw new NotFoundError("No posts found");
  }

  /**
   * @method getpost
   * @static
   * @async
   * @param {string}id
   * @returns {Promise<createpost>}
   */
  static async getpost(id: string): Promise<createpost> {
    const post = await UserPost.findOne({where: {id}});
    if (post) {
      return post;
    }

    throw new NotFoundError("No posts found");
  }
  /**
   * @method like && dislike post
   * @static
   * @async
   * @param {string}id
   * @returns {Promise<createpost>}
   */
  static async likePost(id: string,userId: string): Promise<createpost> {
    const post = await UserPost.findOne({where: {id}});
    
    if (post) {
        let likesArray = post.likes;
        let likeCount = post.likeCount;
  
        if(!likesArray.includes(userId)){
          likesArray.push(userId);
          likeCount = likesArray.length;
        }else{
         likesArray = likesArray.filter(e => e !== userId); 
          likeCount = likesArray.length;
        }
  
        post.likes = likesArray;
        post.likeCount = likeCount;
        const updatedlike = await post.save()
        console.log("post",post)
        return updatedlike;
    }

    throw new NotFoundError("No posts found");
  }


    /**
     * @method changePassword
     * @static
     * @async
     * @param {IChangePassword} data 
     * @returns {Promise<User>}
     */
    static async changePassword(data: IChangePassword): Promise<User> {
        const foundUser = await this.checkThatUserExist(data.userId);

        AuthService.checkThatPasswordIsValid(
            data.password, 
            foundUser.password
        );

        foundUser.password = PasswordHasher.hash(data.newPassword);
        return foundUser.save();
    }

    /**
     * @method updateProfile
     * @static
     * @async
     * @param {string} userId
     * @param {IUpdateProfile} data 
     * @returns {Promise<User>}
     */
    static async updateProfile(userId: string, data: IUpdateProfile): Promise<User> {
        const foundUser = await this.checkThatUserExist(userId);

        await User.update({ id: userId }, data);
        await foundUser.reload();

        delete (foundUser as any).password;
        return foundUser;
    }

    /**
     * @method checkThatUserIsNotVerified
     * @static
     * @async
     * @param {string} userId 
     * @returns {Promise<User>}
     */
    static async checkThatUserIsNotVerified(userId: string): Promise<User> {
        const foundUser = await this.checkThatUserExist(userId);
        if(!foundUser.isVerified) { return foundUser; }

        throw new ConflictError("User is already verified!");
    }

    /**
     * @method checkThatUserIsNotVerified
     * @static
     * @param {User} user
     * @returns {Promise<void>}
     */
    static checkThatUserIsVerified(user: User): void {
        if(!user.isVerified) {
            throw new UnprocessableError("User is not verified!");
        }
    }

    /**
     * @method checkThatUserIsActive
     * @static
     * @param {User} user
     * @returns {Promise<void>}
     */
    static checkThatUserIsActive(user: User): void {
        if(!user.isActive) {
            throw new UnprocessableError("User is not active!");
        }
    }

    /**
     * @method markUserAccountAsVerified
     * @static
     * @async
     * @param {User} user 
     * @returns {Promise<User>}
     */
    static async markUserAccountAsVerified(user: User): Promise<User> {
        user.isVerified = true;
        return user.save();
    }

    /**
     * @method checkThatEmailExist
     * @static
     * @async
     * @param {string} email 
     * @returns {Promise<void>}
     */
    static async checkThatEmailExist(email: string): Promise<User> {
        const foundUser = await User.findOne({ where: { email } });
        if(foundUser) { return foundUser; }

        throw new NotFoundError("User not found!");
    }

    /**
     * @method checkThatEmailExist
     * @static
     * @async
     * @param {string} email 
     * @returns {Promise<void>}
     */
    static async checkThatEmailExistForLogin(email: string): Promise<User> {
        const foundUser = await User.findOne({ where: { email } });
        if(foundUser) { return foundUser; }

        throw new UnauthenticatedError("Invalid login credentials!");
    }

    /**
     * @method checkThatEmailDoesNotExist
     * @static
     * @async
     * @param {string} email 
     * @returns {Promise<void>}
     */
    private static async checkThatEmailDoesNotExist(email: string): Promise<void> {
        const foundUser = await User.findOne({ where: { email } });

        if(foundUser) {
            throw new ConflictError("User email already exist!");
        }
    }

    /**
     * @method checkThatUserExist
     * @static
     * @async
     * @param {string} id 
     * @returns {Promise<User>}
     */
    static async checkThatUserExist(id: string): Promise<User> {
        const foundUser = await User.findOne({ where: { id } });
        if(foundUser) { return foundUser; }

        throw new NotFoundError("User does not exist!");
    }

    /**
     * @method getUserToCreate
     * @static
     * @param {ICreateUser} data 
     * @returns {User}
     */
    private static getUserToCreate(data: ICreateUser): User {
        let user = new User();

        user.role = data.role;
        user.email = data.email;
        user.lastName = data.lastName;
        user.firstName = data.firstName;
        user.password = PasswordHasher.hash(data.password);

        return user;
    }

    /**
     * @method getUserFullName
     * @static
     * @param {User} user
     * @returns {string}
     */
    static getUserFullName({ firstName, lastName }: User): string {
        return `${lastName} ${firstName}`;
    }

      /**
   * @method getUserProjects
   * @static
   * @async
   * @param {string} id
   * @returns {Promise<void>}
   */
  static async getUserProjects(id: any): Promise<project[]> {
    const foundUserProjects = await projectEntity.findBy({
        projectMembers: ArrayContains([id]),
    })
    if(foundUserProjects) { return foundUserProjects; }

    throw new NotFoundError("No Project found!");
  }

}

export default UserService;