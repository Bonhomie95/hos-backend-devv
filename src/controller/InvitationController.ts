import { Request, Response } from "express";
import ShortUniqueId from "short-unique-id";
import { NotFoundError } from "../../lib/src/exceptions";
import { ResponseHandler } from "../../lib/src/helpers";
import { IUserRequest } from "../../lib/src/interfaces";
import Invitations from "../database/entity/Invitations";
import User from "../database/entity/User";
import Invitation from "../routes/Invitation";
import { sendEmail } from "../services/external/email";
import UserService from "../services/UserService";

export const inviteMember = async (req: IUserRequest, res: Response) => {
  const newLink = new ShortUniqueId();
  let current = new Date().toISOString();

  const newInvite = Invitations.create({
    link: newLink(),
    senderName: req.body.senderName,
    senderMsg: req.body.senderMsg,
    senderId: req.user.email,
    receiverId: req.body.email,
  });

  const foundUser = await User.findOne({
    where: { email: req.body.receiverId },
  });
  const { senderId, receiverId } = req.body;
  if (foundUser) {
    sendEmail(receiverId, senderId, newLink());
    ResponseHandler.created(res, newInvite, "Invitation sent!");
  } else {
    throw new NotFoundError("User  with the email not found!");
  }
};

export const invitationView = async (req: IUserRequest, res: Response) => {
  let sender = req.params.id.trim().split("-")[0].trim();
  let inviteLink = req.params.id.trim().split("-")[1].trim();

  const invite = await Invitations.findOne({where: { 
      senderId: `${sender}`,
      link: `${inviteLink}`
  }})

  let seen=new Date().toISOString();

  if(invite){ 
    return Invitations.save({ 
      updatedAt: seen
    });
  }
  throw new NotFoundError("Invitation not found!");

};

export const allInvitations = async (req: IUserRequest, res: Response) => {
  const invites = await Invitations.find();

  if (invites) {
    ResponseHandler.ok(res,invites,"All Invitations fetched!")
  }

  throw new NotFoundError("No Invitations found!")

};

