import express from "express";
const router = express.Router();
import Authenticate from "../middlewares/guards/Authenticate";
const { newConversation, getUserConversation, getTwoUserIdConversation } = require("../controller/ConversationController");

router.post("/",Authenticate, newConversation);
router.get("/:userId/",Authenticate, getUserConversation);
router.get("/find/:firstUserId/:secondUserId/",Authenticate, getTwoUserIdConversation);

export default router;
