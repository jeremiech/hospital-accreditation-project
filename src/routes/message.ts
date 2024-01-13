import jwt from "jsonwebtoken";
import { MessageModel } from "../models";
import { Router, Request, Response } from "express";

const router = Router();

/**
 * @openapi
 * /message:
 *  get:
 *    summary: Get all messages
 *    tags:
 *      - message
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
 *        description: List of all messages
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: array
 *                  example: []
 *                total:
 *                  type: number
 *                  example: 0
 */
router.get("/", async (req: Request, res: Response) => {
  const { limit, skip } = req.query;
  const messages = await MessageModel.find()
    .skip(parseInt(skip as string) || 0)
    .limit(parseInt(limit as string) || 10);

  res.json({ messages, total: await MessageModel.count() });
});

router.post("/", async (req: Request, res: Response) => {
  const { content, recipient } = req.body;
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET || "");
  const message = new MessageModel({
    content,
    recipient,
    sender: (decodedToken as { id: string })?.id,
  });
  await message.save();

  res.json({ msg: "message saved", message });
});

/**
 * @openapi
 * /message/{id}:
 *  get:
 *    summary: Get one message
 *    tags:
 *      - message
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Get message by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: object
 *                  example: {}
 */
router.get("/:id", async (req: Request, res: Response) => {
  const message = await MessageModel.findById(req.params.id);
  res.json({ message });
});

router.put("/:id", async (req: Request, res: Response) => {
  const { content, recipient } = req.body;
  const message = await MessageModel.findOneAndUpdate(
    { _id: req.params.id },
    { content, recipient }
  );

  res.json({ msg: "message updated", message });
});

/**
 * @openapi
 * /message/{id}:
 *  delete:
 *    summary: Delete one message
 *    tags:
 *      - message
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Delete message by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: message deleted
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await MessageModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "message deleted" });
});

export { router };
