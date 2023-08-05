import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models";
import { Router, Request, Response } from "express";
import { guestMiddleware } from "../middleware/authenticate";

const router = Router();

router.post("/login", guestMiddleware, async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.where({ email }).findOne();

  if (user && bcrypt.compareSync(password, user.password)) {
    user.password = "";
    res.json({
      msg: "welcome back",
      token: jwt.sign({ user }, process.env.JWT_TOKEN_SECRET || "", {
        expiresIn: "1d",
      }),
    });
  } else res.json({ msg: "invalid credentials" });
});

router.post(
  "/register",
  guestMiddleware,
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    let user = await UserModel.where({ email }).findOne();

    if (!user) {
      user = new UserModel({
        name,
        email,
        password: bcrypt.hashSync(password, 3),
      });
      user.save();
      res.json({ msg: "welcome aboard" });
    } else res.json({ msg: "email already taken" });
  }
);

router.post("/reset", guestMiddleware, async (req: Request, res: Response) => {
  res.json({ msg: "reset password" });
});

export { router };
