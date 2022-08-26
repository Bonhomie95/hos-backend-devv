import express from "express";
const router = express.Router();
import Authenticate from "../middlewares/guards/Authenticate";
const { newCave, getCave, updateCave } = require("../controller/CaveController");
import multer from "multer";

var upload = multer({
  dest: './public'
})


router.post("", Authenticate,upload.single("file"), newCave);
router.get("/", Authenticate, getCave);
router.patch("/", Authenticate,upload.single("file"), updateCave);

export default router;