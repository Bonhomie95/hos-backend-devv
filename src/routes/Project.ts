import express from "express";
import projectController from "../controller/ProjectController";
import Authenticate from "../middlewares/guards/Authenticate";
import projectValidator from "../middlewares/validators/projectValidator";

const router = express.Router();

   router.get(
     "",
     Authenticate,
     projectController.getAllproject
);
  router.post(
    "",
      Authenticate,
      projectValidator.checkCreate(),
      projectController.create
    );
  router.get(
        "/:id",
        Authenticate,
        projectController.getOneproject
    );
  router.put(
        "/:id",
        Authenticate,
        projectController.updateproject
    );
    router.post(
      "/comment",
      projectValidator.checkCreateComment(),
      projectController.createComment,
    )

 router.get(
   "/comment/:id",
   projectController.getCommentById
 )

export default router;
