import jwt from "jsonwebtoken";
import { TransferModel } from "../models";
import { Router, Request, Response } from "express";

const router = Router();

/**
 * @openapi
 * /transfer:
 *  get:
 *    summary: Get all transfers
 *    tags:
 *      - transfer
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
 *        description: List of all transfers
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                transfer:
 *                  type: array
 *                  example: []
 *                total:
 *                  type: number
 *                  example: 0
 */
router.get("/", async (req: Request, res: Response) => {
  const { limit, skip } = req.query;
  const transfers = await TransferModel.find()
    .skip(parseInt(skip as string) || 0)
    .limit(parseInt(limit as string) || 10);

  res.json({ transfers, total: await TransferModel.count() });
});

router.post("/", async (req: Request, res: Response) => {
  const { details, completed, patient } = req.body;
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET || "");
  const transfer = new TransferModel({
    patient,
    details,
    completed,
    user: (decodedToken as { id: string })?.id,
  });
  await transfer.save();

  res.json({ msg: "transfer saved", transfer });
});

/**
 * @openapi
 * /transfer/{id}:
 *  get:
 *    summary: Get one transfer
 *    tags:
 *      - transfer
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Get transfer by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                transfer:
 *                  type: object
 *                  example: {}
 */
router.get("/:id", async (req: Request, res: Response) => {
  const transfer = await TransferModel.findById(req.params.id);
  res.json({ transfer });
});

router.put("/:id", async (req: Request, res: Response) => {
  const { patient, details, completed } = req.body;
  const transfer = await TransferModel.findOneAndUpdate(
    { _id: req.params.id },
    { patient, details, completed }
  );

  res.json({ msg: "transfer updated", transfer });
});

/**
 * @openapi
 * /transfer/{id}:
 *  delete:
 *    summary: Delete one transfer
 *    tags:
 *      - transfer
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Delete transfer by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: transfer deleted
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await TransferModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "transfer deleted" });
});

export { router };
