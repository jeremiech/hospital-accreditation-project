import multer from "multer";
import { extname } from "path";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { AdmissionModel } from "../models";
import { Router, Request, Response } from "express";

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
    .populate("patient")
    .skip(parseInt(skip as string) || 0)
    .limit(parseInt(limit as string) || 10)
    .sort({ date: -1 });

  res.json({ admissions, total: await AdmissionModel.count() });
});

router.get("/filter/:doctor", async (req: Request, res: Response) => {
  const { limit, skip } = req.query;
  let admissions;
  let total = 0;

  try {
    const doctor = new Types.ObjectId(req.params.doctor);
    admissions = await AdmissionModel.find({ referredTo: doctor })
      .populate("patient")
      .skip(parseInt(skip as string) || 0)
      .limit(parseInt(limit as string) || 10)
      .sort({ date: -1 });

    total = await AdmissionModel.find({ referredTo: doctor }).count();
  } catch (e) {}

  res.json({ admissions: admissions || [], total });
});

router.post("/", async (req: Request, res: Response) => {
  const {
    patient,
    admissionDate,
    dischargeDate,
    modeOfAdmission,
    transferredFrom,
    isRecovered,
    isImproved,
    isUnimproved,
    diedAfter48hr,
    diedBefore48hr,
    wasAutopsyRequested,
    hasFled,
    referredTo,
    clinicalSummary,
    finalDiagnosis,
    investigationSummary,
    otherDiagnosis,
  } = req.body;

  const token = (req.headers.authorization || "").replace("Bearer ", "");
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET || "");
  const admissionObject: { [key: string]: string } = {
    patient,
    admissionDate,
    dischargeDate,
    modeOfAdmission,
    transferredFrom,
    isRecovered,
    isImproved,
    isUnimproved,
    diedAfter48hr,
    diedBefore48hr,
    wasAutopsyRequested,
    hasFled,
    clinicalSummary,
    finalDiagnosis,
    investigationSummary,
    otherDiagnosis,
    user: (decodedToken as { id: string })?.id,
  };
  if (referredTo) admissionObject.referredTo = referredTo;

  const admission = new AdmissionModel(admissionObject);
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
    patient,
    admissionDate,
    dischargeDate,
    modeOfAdmission,
    transferredFrom,
    isRecovered,
    isImproved,
    isUnimproved,
    diedAfter48hr,
    diedBefore48hr,
    wasAutopsyRequested,
    hasFled,
    referredTo,
    clinicalSummary,
    finalDiagnosis,
    investigationSummary,
    otherDiagnosis,
  } = req.body;

  const admissionObject: { [key: string]: string } = {
    patient,
    admissionDate,
    dischargeDate,
    modeOfAdmission,
    transferredFrom,
    isRecovered,
    isImproved,
    isUnimproved,
    diedAfter48hr,
    diedBefore48hr,
    wasAutopsyRequested,
    hasFled,
    clinicalSummary,
    finalDiagnosis,
    investigationSummary,
    otherDiagnosis,
  };
  if (referredTo) admissionObject.referredTo = referredTo;

  const admission = await AdmissionModel.findOneAndUpdate(
    { _id: req.params.id },
    admissionObject
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