import jwt from "jsonwebtoken";
import { PatientModel } from "../models";
import { Router, Request, Response } from "express";

const router = Router();

/**
 * @openapi
 * /patient:
 *  get:
 *    summary: Get all patients
 *    tags:
 *      - patient
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
 *        description: List of all patients
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                patients:
 *                  type: array
 *                  example: []
 *                total:
 *                  type: number
 *                  example: 0
 */
router.get("/", async (req: Request, res: Response) => {
  const { limit, skip } = req.query;
  const patients = await PatientModel.find()
    .skip(parseInt(skip as string) || 0)
    .limit(parseInt(limit as string) || 10)
    .sort({ date: -1 });

  res.json({ patients, total: await PatientModel.count() });
});

router.post("/", async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    dob,
    gender,
    maritalStatus,
    father,
    mother,
    nationality,
    nationalID,
    passport,
    homeAddress,
    occupation,
    religion,
    phone,
    contactPersonName,
    contactPersonPhone,
    hasInsurance,
    insuranceNumber,
    insuranceType,
  } = req.body;

  const token = (req.headers.authorization || "").replace("Bearer ", "");
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET || "");

  let today = new Date();
  const patient = new PatientModel({
    patientId: today.getTime().toString().slice(7) + "-" + today.getFullYear(),
    firstName,
    lastName,
    dob,
    gender,
    maritalStatus,
    father,
    mother,
    nationality,
    nationalID,
    passport,
    homeAddress,
    occupation,
    religion,
    phone,
    contactPersonName,
    contactPersonPhone,
    hasInsurance,
    insuranceNumber,
    insuranceType,
    user: (decodedToken as { id: string })?.id,
  });
  await patient.save();

  res.json({ msg: "patient saved", patient });
});

/**
 * @openapi
 * /patient/{id}:
 *  get:
 *    summary: Get one patient
 *    tags:
 *      - patient
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Get patient by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                patient:
 *                  type: object
 *                  example: {}
 */
router.get("/:id", async (req: Request, res: Response) => {
  const patient = await PatientModel.findById(req.params.id);
  res.json({ patient });
});

router.put("/:id", async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    dob,
    gender,
    maritalStatus,
    father,
    mother,
    nationality,
    nationalID,
    passport,
    homeAddress,
    occupation,
    religion,
    phone,
    contactPersonName,
    contactPersonPhone,
    hasInsurance,
    insuranceNumber,
    insuranceType,
  } = req.body;

  const patient = await PatientModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      firstName,
      lastName,
      dob,
      gender,
      maritalStatus,
      father,
      mother,
      nationality,
      nationalID,
      passport,
      homeAddress,
      occupation,
      religion,
      phone,
      contactPersonName,
      contactPersonPhone,
      hasInsurance,
      insuranceNumber,
      insuranceType,
    }
  );

  res.json({ msg: "patient updated", patient });
});

/**
 * @openapi
 * /patient/{id}:
 *  delete:
 *    summary: Delete one patient
 *    tags:
 *      - patient
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Delete patient by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: patient deleted
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await PatientModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "patient deleted" });
});

export { router };
