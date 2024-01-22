import jwt from "jsonwebtoken";
import { AnesthesiaModel } from "../models";
import { Router, Request, Response } from "express";
import { Types } from "mongoose";

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
 *      - name: filter
 *        in: query
 *        schema:
 *          type: string
 *        description: doctor or nurse uuid
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
  const { limit, skip, filter, start, stop } = req.query;
  let conditions = {};

  if ((filter as string)?.length > 10) {
    const doctor = new Types.ObjectId(filter as string);
    conditions = { anesthesist: doctor };
  }

  if (start && stop) {
    conditions = {
      ...conditions,
      date: { $gte: start, $lte: stop },
    };
  }

  const anesthesias = await AnesthesiaModel.find(conditions)
    .populate(["patient", "user", "anesthesist"])
    .skip(parseInt(skip as string) || 0)
    .limit(parseInt(limit as string) || 10)
    .sort({ date: -1 });

  res.json({
    anesthesias,
    total: await AnesthesiaModel.find(conditions).count(),
  });
});

router.post("/", async (req: Request, res: Response) => {
  const {
    sideEffect,
    patientQuestion,
    agreed,
    witness,
    operationDetails,
    authorizingPerson,
    date,
    patient,
    anesthesist,
  } = req.body;

  const token = (req.headers.authorization || "").replace("Bearer ", "");
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET || "");
  const anesthesia = new AnesthesiaModel({
    sideEffect,
    patientQuestion,
    agreed,
    witness,
    operationDetails,
    authorizingPerson,
    date,
    patient,
    anesthesist,
    user: (decodedToken as { id: string })?.id,
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
  const anesthesia = await AnesthesiaModel.findById(req.params.id).populate([
    "patient",
    "anesthesist",
  ]);

  res.json({ anesthesia });
});

router.put("/:id", async (req: Request, res: Response) => {
  const {
    sideEffect,
    patientQuestion,
    agreed,
    witness,
    operationDetails,
    authorizingPerson,
    date,
    patient,
    anesthesist,
  } = req.body;

  const anesthesia = await AnesthesiaModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      sideEffect,
      patientQuestion,
      agreed,
      witness,
      operationDetails,
      authorizingPerson,
      date,
      patient,
      anesthesist,
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
