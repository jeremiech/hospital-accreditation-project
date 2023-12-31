import { Router, Request, Response } from "express";
import { FormModel, FormResponseModel } from "../models";

const router = Router();

/**
 * @openapi
 * /form:
 *  get:
 *    summary: Get all forms
 *    tags:
 *      - form
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
 *        description: List of all forms
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                forms:
 *                  type: array
 *                  example: []
 *                total:
 *                  type: number
 *                  example: 0
 */
router.get("/", async (req: Request, res: Response) => {
  const { limit, skip } = req.query;
  const forms = await FormModel.find()
    .skip(parseInt(skip as string) || 0)
    .limit(parseInt(limit as string) || 10);

  res.json({ forms, total: await FormModel.count() });
});

router.post("/", async (req: Request, res: Response) => {
  const { name, description, fields } = req.body;
  const form = new FormModel({ name, description, fields });
  await form.save();

  res.json({ msg: "form saved", form });
});

/**
 * @openapi
 * /form/{id}:
 *  get:
 *    summary: Get one form
 *    tags:
 *      - form
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Get form by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                form:
 *                  type: object
 *                  example: {}
 */
router.get("/:id", async (req: Request, res: Response) => {
  const form = await FormModel.findById(req.params.id);
  res.json({ form });
});

router.put("/:id", async (req: Request, res: Response) => {
  const { name, description, fieldCount } = req.body;
  const form = await FormModel.findOneAndUpdate(
    { _id: req.params.id },
    { name, description, fieldCount }
  );

  res.json({ msg: "form updated", form });
});

/**
 * @openapi
 * /form/{id}:
 *  delete:
 *    summary: Delete one form
 *    tags:
 *      - form
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Delete form by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: form deleted
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await FormModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "form deleted" });
});

/**
 * @openapi
 * /form/response:
 *  get:
 *    summary: Get all form response
 *    tags:
 *      - form response
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
 *        description: List of all form response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                formResponse:
 *                  type: array
 *                  example: []
 *                total:
 *                  type: number
 *                  example: 0
 */
router.get("/response", async (req: Request, res: Response) => {
  const { limit, skip } = req.query;
  const formResponse = await FormResponseModel.find()
    .skip(parseInt(skip as string) || 0)
    .limit(parseInt(limit as string) || 10);

  res.json({ formResponse, total: await FormResponseModel.count() });
});

router.post("/response", async (req: Request, res: Response) => {
  const { value, groupId } = req.body;
  const formResponse = new FormResponseModel({ value, groupId });
  await formResponse.save();

  res.json({ msg: "form response saved", formResponse });
});

/**
 * @openapi
 * /form/response/{id}:
 *  get:
 *    summary: Get one form response
 *    tags:
 *      - form response
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Get form response by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                formResponse:
 *                  type: object
 *                  example: {}
 */
router.get("/response/:id", async (req: Request, res: Response) => {
  const formResponse = await FormResponseModel.findById(req.params.id);
  res.json({ formResponse });
});

router.put("/response/:id", async (req: Request, res: Response) => {
  const { value, groupId } = req.body;
  const formResponse = await FormResponseModel.findOneAndUpdate(
    { _id: req.params.id },
    { value, groupId }
  );

  res.json({ msg: "form response updated", formResponse });
});

/**
 * @openapi
 * /form/response/{id}:
 *  delete:
 *    summary: Delete one form response
 *    tags:
 *      - form response
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Delete form response by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: form response deleted
 */
router.delete("/response/:id", async (req: Request, res: Response) => {
  await FormResponseModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "form response deleted" });
});

export { router };
