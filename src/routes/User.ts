import express from "express";
import UserController from "../controller/UserController";
import userPostController from "../controller/UserPostController";
import Authenticate from "../middlewares/guards/Authenticate";
import UserValidator from "../middlewares/validators/UserValidator";

const router = express.Router();

router.post(
    "",
    UserValidator.checkCreateUser(),
    UserController.createUser
);

router.post(
    "/post",
    Authenticate,
    userPostController.createPost
);

router.put(
    "/me/password",
    Authenticate,
    UserValidator.checkChangePassword(),
    UserController.changePassword
);

router.get(
    "/me",
    Authenticate,
    UserController.getProfile
);

router.get(
    "/post",
    Authenticate,
    userPostController.getAllposts
);
router.get(
    "/post/:id",
    Authenticate,
    userPostController.getpost
);
router.put(
    "/post/like/:id",
    Authenticate,
    userPostController.likepost
);

router.get(
    "/userprojects",
    Authenticate,
    userPostController.getAllUserProjects
);

router.patch(
    "/me",
    Authenticate,
    UserValidator.checkUpdateProfile(),
    UserController.updateProfile
);

export default router;
