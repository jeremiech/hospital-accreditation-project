import { PatientModel } from "../models";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { limit, skip } = req.body;
  const patients = await PatientModel.find()
    .skip(skip || 0)
    .limit(limit || 10);

  res.json({ patients, total: await PatientModel.count() });
});

router.post("/", async (req: Request, res: Response) => {});

router.get("/:id", async (req: Request, res: Response) => {
  const patient = await PatientModel.where({ _id: req.params.id }).findOne();
  res.json({ patient });
});

router.put("/:id", async (req: Request, res: Response) => {});

router.delete("/:id", async (req: Request, res: Response) => {
  await PatientModel.where({ _id: req.params.id }).deleteOne();
  res.json({ msg: "patient deleted" });
});

export { router };
