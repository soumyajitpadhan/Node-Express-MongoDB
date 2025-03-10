import express from 'express';
import { forgotPassword, getNewAccessToken, resetPassword, showResetPasswordForm, userLogin, userSignup } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.post("/refresh-token", getNewAccessToken);
userRouter.post("/forgot-password", forgotPassword);
userRouter.get("/reset-password/:token", showResetPasswordForm);
userRouter.post("/reset-password/:token", resetPassword);

export { userRouter };