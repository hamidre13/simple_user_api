import express from "express";
import { userRouter } from "./resources/user";
export const restRouter = express.Router();

restRouter.use("/users", userRouter);

//TODO I have to write an api error handler for this!!
restRouter.all("*", (req, res) => {
  console.log("not valid route");
  console.log(req.path);
  res.json({ erro: "api call not found" });
});
