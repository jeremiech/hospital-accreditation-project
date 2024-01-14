import jwt from "jsonwebtoken";
import { SurgeryModel } from "../models";
import { Router, Request, Response } from "express";

const router = Router();

/**
 * @openapi
 * /surgery:
 *  get:
 *    summary: Get all surgery consents
 *    tags:
 *      - surgery consent
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
 *        description: List of all surgeries
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                surgeries:
 *                  type: array
 *                  example: []
 *                total:
 *                  type: number
 *                  example: 0
 */
router.get("/", async (req: Request, res: Response) => {
  const { limit, skip } = req.query;
  const surgeries = await SurgeryModel.find()
    .populate(["doctor", "user", "patient"])
    .skip(parseInt(skip as string) || 0)
    .limit(parseInt(limit as string) || 10)
    .sort({ date: -1 });

  res.json({ surgeries, total: await SurgeryModel.count() });
});

router.post("/", async (req: Request, res: Response) => {
  const {
    operationDetails,
    nextOfKin,
    witness,
    authorizingPerson,
    doctor,
    patient,
  } = req.body;

  const token = (req.headers.authorization || "").replace("Bearer ", "");
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET || "");

  const surgery = new SurgeryModel({
    operationDetails,
    nextOfKin,
    witness,
    authorizingPerson,
    doctor,
    patient,
    user: (decodedToken as { id: string })?.id,
  });
  await surgery.save();

  res.json({ msg: "surgery saved", surgery });
});

/**
 * @openapi
 * /surgery/{id}:
 *  get:
 *    summary: Get one surgery
 *    tags:
 *      - surgery consent
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Get surgery by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                surgery:
 *                  type: object
 *                  example: {}
 */
router.get("/:id", async (req: Request, res: Response) => {
  const surgery = await SurgeryModel.findById(req.params.id);
  res.json({ surgery });
});

router.put("/:id", async (req: Request, res: Response) => {
  const {
    operationDetails,
    nextOfKin,
    witness,
    authorizingPerson,
    doctor,
    patient,
  } = req.body;

  const surgery = await SurgeryModel.findOneAndUpdate(
    { _id: req.params.id },
    { operationDetails, nextOfKin, witness, authorizingPerson, doctor, patient }
  );

  res.json({ msg: "surgery updated", surgery });
});

/**
 * @openapi
 * /surgery/{id}:
 *  delete:
 *    summary: Delete one surgery
 *    tags:
 *      - surgery consent
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
  await SurgeryModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "admission deleted" });
});

export { router };
