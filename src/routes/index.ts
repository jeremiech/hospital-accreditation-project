import { Router, Request, Response } from "express";

const router = Router();

/**
 * @openapi
 * /:
 *  get:
 *    summary: Home
 *    responses:
 *      200:
 *        description: Returns a welcome message.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: server started
 */
router.get("/", async (req: Request, res: Response) => {
  res.json({
    msg: "server started on https://localhost:3000",
  });
});

export { router };
