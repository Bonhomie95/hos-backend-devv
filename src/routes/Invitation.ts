import express from "express";
import { allInvitations, invitationView, inviteMember } from "../controller/InvitationController";
import InvitationController from "../controller/OrganizationController";
import UserController from "../controller/UserController";
import Authenticate from "../middlewares/guards/Authenticate";
import OrganizationValidator from "../middlewares/validators/OrganizationValidator";
import UserValidator from "../middlewares/validators/UserValidator";

const router = express.Router();

router.post(
    "",
    Authenticate,
    inviteMember
    );
router.get(
    "/:id",
    Authenticate,
    invitationView
    );
router.get(
    "/",
    Authenticate,
    allInvitations
    );

export default router;
