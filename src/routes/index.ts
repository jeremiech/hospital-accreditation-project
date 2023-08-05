import { Router, Request, Response } from "express";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Welcome message.
 */
router.get("/", async (req: Request, res: Response) => {
  res.json({
    msg: "hospital accreditation backend, visit http:localhost:3000/docs for API documentation",
  });
});

export { router };
