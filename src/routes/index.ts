import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { run } from "../seeder";
import nodemailer from "nodemailer";
import {
  AdmissionModel,
  CarePlanModel,
  FormModel,
  FormResponseModel,
  PatientModel,
  UserModel,
} from "../models";
import { Router, Request, Response } from "express";
import { guestMiddleware } from "../middleware/authenticate";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.redirect("/docs");
});

/**
 * @openapi
 * /seed:
 *  get:
 *    summary: Populate database
 *    tags:
 *      - dashboard
 *    responses:
 *      200:
 *        description: Saves random testing data in to the database
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: task done
 */
router.get("/seed", async (req: Request, res: Response) => {
  await run();
  res.json({ msg: "task done" });
});

/**
 * @openapi
 * /report:
 *  get:
 *    summary: Get final diagnosis report
 *    tags:
 *      - dashboard
 *    responses:
 *      200:
 *        description: Get list of common disease and number of patients
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                admissions:
 *                  type: array
 *                  example: []
 */
router.get("/report", async (req: Request, res: Response) => {
  const admissions = await AdmissionModel.aggregate([
    { $group: { _id: "$finalDiagnosis", count: { $sum: 1 } } },
  ]);
  res.json({ admissions });
});

/**
 * @openapi
 * /login:
 *  post:
 *    summary: Login
 *    tags:
 *      - authenticate
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
  const user = await UserModel.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const { _id, name, role } = user;
    res.json({
      msg: "welcome back",
      token: jwt.sign(
        { id: _id, name, role, image: "" },
        process.env.JWT_TOKEN_SECRET || "",
        {
          expiresIn: "1d",
        }
      ),
    });
  } else res.json({ msg: "invalid credentials" });
});

/**
 * @openapi
 * /register:
 *  post:
 *    summary: Register
 *    tags:
 *      - authenticate
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
    let user = await UserModel.findOne({ email });

    if (!user) {
      user = new UserModel({
        name,
        email,
        password: bcrypt.hashSync(password, 3),
      });
      user.save();

      const transporter = nodemailer.createTransport({
        host: "smtp.rmsoft.rw",
        port: 587,
        secure: false,
        auth: {
          user: "ghislain@rmsoft.rw",
          pass: "ghislain@rmsoft_2022",
        },
        tls: { rejectUnauthorized: false },
      });

      const mailOptions = {
        from: "ghislain@rmsoft.rw",
        to: email,
        subject: "Welcome aboard",
        text: "Thank you for registering...",
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (e) {
        console.error(e);
      }

      res.json({ msg: "welcome aboard" });
    } else res.json({ msg: "email already taken" });
  }
);

/**
 * @openapi
 * /reset:
 *  post:
 *    summary: Reset password
 *    tags:
 *      - authenticate
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
  let user = await UserModel.findOne({ email }); // forward email

  res.json({ msg: "reset password" });
});

/**
 * @openapi
 * /metrics:
 *  get:
 *    summary: Get dashboard metrics
 *    tags:
 *      - dashboard
 *    responses:
 *      200:
 *        description: Get an object of quick stats and graph data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                users:
 *                  type: number
 *                  example: 1
 *                forms:
 *                  type: number
 *                  example: 2
 *                patients:
 *                  type: number
 *                  example: 3
 *                carePlans:
 *                  type: number
 *                  example: 4
 *                formResponses:
 *                  type: number
 *                  example: 5
 */
router.get("/metrics", async (req: Request, res: Response) => {
  const users = await UserModel.count();
  const patients = await PatientModel.count();
  const forms = await FormModel.count();
  const formResponses = await FormResponseModel.count();
  const carePlans = await CarePlanModel.count();

  res.json({ users, forms, patients, carePlans, formResponses });
});

export { router };
