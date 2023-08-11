import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models";
import { Router, Request, Response } from "express";
import { guestMiddleware } from "../middleware/authenticate";

const router = Router();

/**
 * @openapi
 * /auth/login:
 *  post:
 *    summary: Login
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: my@email.com
 *              password:
 *                type: string
 *                example: secret
 *    responses:
 *      200:
 *        description: Sign up for a free account
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: welcome back
 *                token:
 *                  type: string
 *                  example: 0123456789
 */
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

/**
 * @openapi
 * /auth/register:
 *  post:
 *    summary: Register
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: john doe
 *              email:
 *                type: string
 *                example: my@email.com
 *              password:
 *                type: string
 *                example: secret
 *    responses:
 *      201:
 *        description: Sign up for a free account
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: welcome aboard
 */
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

/**
 * @openapi
 * /auth/reset:
 *  post:
 *    summary: Reset password
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: my@email.com
 *    responses:
 *      200:
 *        description: Recover password via email
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: check your email
 */
router.post("/reset", guestMiddleware, async (req: Request, res: Response) => {
  const { email } = req.body;
  let user = await UserModel.where({ email }).findOne(); // forward email

  res.json({ msg: "reset password" });
});

export { router };
