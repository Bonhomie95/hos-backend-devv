import express from "express";
import taskController from "../controller/TaskController";
import Authenticate from "../middlewares/guards/Authenticate";
import taskValidator from "../middlewares/validators/TaskValidator";

const router = express.Router();

   router.get(
     "",
     Authenticate,
     taskController.getAlltask
);
  router.post(
    "",
      Authenticate,
      taskValidator.checkCreate(),
      taskController.create
    );
  router.get(
        "/:id",
        Authenticate,
        taskController.getOnetask
    );
  router.put(
        "/:id",
        Authenticate,
        taskController.updatetask
    );
    router.post(
      "/comment",
      taskValidator.checkCreateComment(),
      taskController.createComment,
    )

 router.get(
   "/comment/:id",
   taskController.getCommentById
 )

export default router;
