import { UserModel } from "../models";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await UserModel.find().limit(50);
  res.json({ users });
});

router.get("/:id", async (req: Request, res: Response) => {
  const user = await UserModel.where({ _id: req.params.id }).findOne();
  res.json({ user });
});

export { router };
