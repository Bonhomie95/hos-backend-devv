import express from "express";
const router = express.Router();
const { addMessage, getMessages, sendMessage } = require("../controller/MessageController");
import Authenticate from "../middlewares/guards/Authenticate";
import multer from "multer";

var upload = multer({
  dest: './public'
})



router.post("/addmsg",Authenticate,upload.single("file"), addMessage);
router.get("/getmsg/:conversationId",Authenticate, getMessages);

export default router;
