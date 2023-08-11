import bcrypt from "bcrypt";
import { UserModel } from "../models";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { limit, skip } = req.body;
  const users = await UserModel.find()
    .skip(skip || 0)
    .limit(limit || 10);

  res.json({ users, total: await UserModel.count() });
});

router.post("/", async (req: Request, res: Response) => {
  const { name, email, password } = req.body();
  const user = new UserModel({
    name,
    email,
    password: bcrypt.hashSync(password, 3),
  });
  await user.save();

  res.json({ msg: "user created", user });
});

router.get("/:id", async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.params.id);
  res.json({ user });
});

router.put("/:id", async (req: Request, res: Response) => {
  const { name, email, password } = req.body();
  const user = await UserModel.findOneAndUpdate(
    { _id: req.params.id },
    { name, email, password: bcrypt.hashSync(password, 3) }
  );

  res.json({ msg: "user updated", user });
});

router.delete("/:id", async (req: Request, res: Response) => {
  await UserModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "user deleted" });
});

export { router };
