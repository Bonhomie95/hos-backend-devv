// import Invitation from "../database/entity/Invitations";
// import { IChangePassword, ICreateInvitation, IUpdateProfile } from "../interfaces";
// import { PasswordHasher } from "../helpers";
// import EmailService from "./external/EmailService";
// import AccountVerifyTokenService from "./AccountVerifyTokenService";
// import { ConflictError, NotFoundError, UnauthenticatedError, UnprocessableError } from "../../../lib/src/exceptions";
// import AuthService from "./AuthService";

// /**
//  * @class InvitationService
//  */
// class InvitationService {

//     /**
//      * @method createInvitation
//      * @static
//      * @async
//      * @param {ICreateInvitation} data 
//      * @returns {Promise<Invitation>}
//      */
//     static async createInvitation(data: ICreateInvitation): Promise<Invitation> {

//         const createdInvitation = await this.getInvitationToCreate(data).save();

//         const VERIFY_ACCOUNT_URL = await AccountVerifyTokenService
//             .getVerifyAccountUrl(createdInvitation.id);

//         (await EmailService.getInstance()).sendVerifyAccountMail(
//             createdInvitation.email,
//             this.getInvitationFullName(createdInvitation),
//             VERIFY_ACCOUNT_URL
//         );
        
//         return createdInvitation;
//     }
    

//     /**
//      * @method getInvitationToCreate
//      * @static
//      * @param {ICreateInvitation} data 
//      * @returns {Invitation}
//      */
//     private static getInvitationToCreate(data: ICreateInvitation): Invitation {
//         const Invitation: any = new Invitation();

//         Invitation.link = data.link;
//         Invitation.senderId = data.senderId;
//         Invitation.senderMsg = data.senderMsg;
//         Invitation.senderName = data.senderName;

//         return Invitation;
//     }

// }

// export default InvitationService;