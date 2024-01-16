import bcrypt from "bcrypt";
import multer from "multer";
import { extname } from "path";
import { Types } from "mongoose";
import { UserModel } from "../models";
import { Router, Request, Response } from "express";

type UserType = {
  name: string;
  bio: string;
  role: string;
  email: string;
  image?: string;
  contact: string;
  password?: string;
  patient?: Types.ObjectId;
};

const router = Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd() + "/uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + extname(file.originalname));
    },
  }),
});

/**
 * @openapi
 * /user:
 *  get:
 *    summary: Get all users
 *    tags:
 *      - user
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
 *      - name: role
 *        in: query
 *        schema:
 *          type: string
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
  const { limit, skip, role } = req.query;

  let condition = {};
  if (role) condition = { role };

  const users = await UserModel.find(condition)
    .skip(parseInt(skip as string) || 0)
    .limit(parseInt(limit as string) || 10)
    .sort({ date: -1 })
    .exec();

  res.json({ users, total: await UserModel.find(condition).count() });
});

router.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const { name, bio, role, email, contact, patient, password } = req.body;

    const userObject: UserType = {
      name,
      bio,
      role,
      email,
      contact,
    };

    if (req.file?.filename) userObject.image = req.file.filename;
    if (patient.length > 10) userObject.patient = new Types.ObjectId(patient);
    if (password) userObject.password = bcrypt.hashSync(password, 3);
    const user = new UserModel(userObject);
    await user.save();

    res.json({ msg: "user saved", user });
  }
);

/**
 * @openapi
 * /user/{id}:
 *  get:
 *    summary: Get one user
 *    tags:
 *      - user
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

router.put(
  "/:id",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const { name, bio, role, email, contact, patient, password } = req.body;

    console.log(req.file);

    const userObject: UserType = {
      name,
      bio,
      role,
      email,
      contact,
    };

    if (req.file?.filename) userObject.image = req.file.filename;
    if (patient.length > 10) userObject.patient = new Types.ObjectId(patient);
    if (password) userObject.password = bcrypt.hashSync(password, 3);
    const user = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      userObject
    );

    res.json({ msg: "user updated", user });
  }
);

/**
 * @openapi
 * /user/{id}:
 *  delete:
 *    summary: Delete one user
 *    tags:
 *      - user
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
