import { AnesthesiaModel } from "../models";
import { Router, Request, Response } from "express";

const router = Router();

/**
 * @openapi
 * /anesthesia:
 *  get:
 *    summary: Get all anesthesia consent
 *    tags:
 *      - anesthesia consent
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
 *        description: List of all anesthesias
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                anesthesias:
 *                  type: array
 *                  example: []
 *                total:
 *                  type: number
 *                  example: 0
 */
router.get("/", async (req: Request, res: Response) => {
  const { limit, skip } = req.query;
  const anesthesias = await AnesthesiaModel.find()
    .skip(parseInt(skip as string) || 0)
    .limit(parseInt(limit as string) || 10)
    .sort({ date: -1 });

  res.json({ anesthesias, total: await AnesthesiaModel.count() });
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
  const anesthesia = new AnesthesiaModel({
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
  await anesthesia.save();

  res.json({ msg: "anesthesia saved", anesthesia });
});

/**
 * @openapi
 * /anesthesia/{id}:
 *  get:
 *    summary: Get one anesthesia
 *    tags:
 *      - anesthesia consent
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Get anesthesia by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                anesthesia:
 *                  type: object
 *                  example: {}
 */
router.get("/:id", async (req: Request, res: Response) => {
  const anesthesia = await AnesthesiaModel.findById(req.params.id);
  res.json({ anesthesia });
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

  const anesthesia = await AnesthesiaModel.findOneAndUpdate(
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

  res.json({ msg: "anesthesia updated", anesthesia });
});

/**
 * @openapi
 * /anesthesia/{id}:
 *  delete:
 *    summary: Delete one anesthesia
 *    tags:
 *      - anesthesia consent
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Delete anesthesia by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: anesthesia deleted
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await AnesthesiaModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "anesthesia deleted" });
});

export { router };
