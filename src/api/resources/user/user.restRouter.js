import express from "express";
import { userController } from "./user.controller";

export const userRouter = express.Router();

userRouter.route("/firstname/:firstname").get(userController.findUser);
userRouter.route("/firstname").get(userController.findUser);
userRouter.route("/").get(userController.getUsers);
userRouter.route("/").post(userController.createUser);
