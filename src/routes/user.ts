import bcrypt from "bcrypt";
import { UserModel } from "../models";
import { Router, Request, Response } from "express";

const router = Router();

/**
 * @openapi
 * /user:
 *  get:
 *    summary: Get all users
 *    parameters:
 *      - name: skip
 *        in: query
 *        schema:
 *          type: integer
 *          minimum: 0
 *      - name: limit
 *        in: query
 *        schema:
 *          type: integer
 *          minimum: 1
 *          maximum: 100
 *    responses:
 *      200:
 *        description: List of all users
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                users:
 *                  type: array
 *                  example: []
 *                total:
 *                  type: number
 *                  example: 0
 */
router.get("/", async (req: Request, res: Response) => {
  const { limit, skip } = req.query;
  const users = await UserModel.find()
    .skip(parseInt(skip as string) || 0)
    .limit(parseInt(limit as string) || 10);

  res.json({ users, total: await UserModel.count() });
});

router.post("/", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = new UserModel({
    name,
    email,
    password: bcrypt.hashSync(password, 3),
  });
  await user.save();

  res.json({ msg: "user saved", user });
});

/**
 * @openapi
 * /user/{id}:
 *  get:
 *    summary: Get one user
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Get user by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: object
 *                  example: {}
 */
router.get("/:id", async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.params.id);
  if (user) res.json({ user });
  else res.json({ user: {} });
});

router.put("/:id", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await UserModel.findOneAndUpdate(
    { _id: req.params.id },
    { name, email, password: bcrypt.hashSync(password, 3) }
  );

  res.json({ msg: "user updated", user });
});

/**
 * @openapi
 * /user/{id}:
 *  delete:
 *    summary: Delete one user
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Delete user by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: user deleted
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await UserModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "user deleted" });
});

export { router };
