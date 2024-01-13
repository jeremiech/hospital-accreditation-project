import jwt from "jsonwebtoken";
import { CarePlanModel } from "../models";
import { Router, Request, Response } from "express";

const router = Router();

/**
 * @openapi
 * /careplan:
 *  get:
 *    summary: Get all care plans
 *    tags:
 *      - care plan
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
 *        description: List of all care plans
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                careplan:
 *                  type: array
 *                  example: []
 *                total:
 *                  type: number
 *                  example: 0
 */
router.get("/", async (req: Request, res: Response) => {
  const { limit, skip } = req.query;
  const careplans = await CarePlanModel.find()
    .skip(parseInt(skip as string) || 0)
    .limit(parseInt(limit as string) || 10);

  res.json({ careplans, total: await CarePlanModel.count() });
});

router.post("/", async (req: Request, res: Response) => {
  const { name, description, activity, patient } = req.body;
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET || "");
  const careplan = new CarePlanModel({
    name,
    description,
    activity,
    patient,
    user: (decodedToken as { id: string })?.id,
  });
  await careplan.save();

  res.json({ msg: "care plan saved", careplan });
});

/**
 * @openapi
 * /careplan/{id}:
 *  get:
 *    summary: Get one care plan
 *    tags:
 *      - care plan
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Get care plan by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                careplan:
 *                  type: object
 *                  example: {}
 */
router.get("/:id", async (req: Request, res: Response) => {
  const careplan = await CarePlanModel.findById(req.params.id);
  res.json({ careplan });
});

router.put("/:id", async (req: Request, res: Response) => {
  const { name, description, activity, patient } = req.body;
  const careplan = await CarePlanModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      name,
      patient,
      activity,
      description,
    }
  );

  res.json({ msg: "care plan updated", careplan });
});

/**
 * @openapi
 * /careplan/{id}:
 *  delete:
 *    summary: Delete one care plan
 *    tags:
 *      - care plan
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Delete care plan by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: care plan deleted
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await CarePlanModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "care plan deleted" });
});

export { router };
