import { AdmissionModel } from "../models";
import { Router, Request, Response } from "express";

const router = Router();

/**
 * @openapi
 * /admission:
 *  get:
 *    summary: Get all admissions
 *    tags:
 *      - admission form
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
 *        description: List of all admissions
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                admissions:
 *                  type: array
 *                  example: []
 *                total:
 *                  type: number
 *                  example: 0
 */
router.get("/", async (req: Request, res: Response) => {
  const { limit, skip } = req.query;
  const admissions = await AdmissionModel.find()
    .skip(parseInt(skip as string) || 0)
    .limit(parseInt(limit as string) || 10)
    .sort({ date: -1 });

  res.json({ admissions, total: await AdmissionModel.count() });
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

  let today = new Date();
  const admission = new AdmissionModel({
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
  });
  await admission.save();

  res.json({ msg: "admission saved", admission });
});

/**
 * @openapi
 * /admission/{id}:
 *  get:
 *    summary: Get one admission
 *    tags:
 *      - admission form
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Get admission by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                admission:
 *                  type: object
 *                  example: {}
 */
router.get("/:id", async (req: Request, res: Response) => {
  const admission = await AdmissionModel.findById(req.params.id);
  res.json({ admission });
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

  const admission = await AdmissionModel.findOneAndUpdate(
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

  res.json({ msg: "admission updated", admission });
});

/**
 * @openapi
 * /admission/{id}:
 *  delete:
 *    summary: Delete one admission
 *    tags:
 *      - admission form
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Delete admission by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: admission deleted
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await AdmissionModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "admission deleted" });
});

export { router };
