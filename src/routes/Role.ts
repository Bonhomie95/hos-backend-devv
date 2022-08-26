import express from "express";
import RoleController from "../controller/RoleController";

const router = express.Router();

router.get("", RoleController.getUserRoles);

export default router;
