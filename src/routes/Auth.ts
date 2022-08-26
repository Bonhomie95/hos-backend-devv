import express from "express";
import AuthController from "../controller/AuthController";
import AuthValidator from "../middlewares/validators/AuthValidator";

const router = express.Router();

router.post(
    "/login",
    AuthValidator.checkLogin(),
    AuthController.login
);

router.post(
    "/accounts/:userId/tokens/:token/verify",
    AuthValidator.checkVerifyAccount(),
    AuthController.verifyAccount
);

router.post(
    "/reset-link/send",
    AuthValidator.checkSendResetLink(),
    AuthController.sendResetLink
);

router.post(
    "/accounts/:userId/tokens/password-reset/:token/verify",
    AuthValidator.checkVerifyAccount(),
    AuthController.verifyPasswordResetToken
);

router.post(
    "/accounts/:userId/password/reset",
    AuthValidator.checkResetPassword(),
    AuthController.resetPassword
);

export default router;
