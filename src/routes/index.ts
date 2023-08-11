import { Router, Request, Response } from "express";

const router = Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Home
 *     responses:
 *       200:
 *         description: Returns a welcome message.
 */
router.get("/", async (req: Request, res: Response) => {
  res.json({
    msg: "Server started on https://localhost:3000",
  });
});

export { router };
