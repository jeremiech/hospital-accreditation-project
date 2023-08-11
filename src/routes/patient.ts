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

router.post("/", async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    dob,
    gender,
    maritalStatus,
    father,
    mother,
    nationality,
    nationalID,
    passport,
    homeAddress,
    occupation,
    religion,
    phone,
    contactPersonName,
    contactPersonPhone,
    hasInsurance,
    insuranceNumber,
    insuranceType,
  } = req.body();

  const patient = new PatientModel({
    firstName,
    lastName,
    dob,
    gender,
    maritalStatus,
    father,
    mother,
    nationality,
    nationalID,
    passport,
    homeAddress,
    occupation,
    religion,
    phone,
    contactPersonName,
    contactPersonPhone,
    hasInsurance,
    insuranceNumber,
    insuranceType,
  });
  await patient.save();

  res.json({ msg: "patient saved", patient });
});

router.get("/:id", async (req: Request, res: Response) => {
  const patient = await PatientModel.findById(req.params.id);
  res.json({ patient });
});

router.put("/:id", async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    dob,
    gender,
    maritalStatus,
    father,
    mother,
    nationality,
    nationalID,
    passport,
    homeAddress,
    occupation,
    religion,
    phone,
    contactPersonName,
    contactPersonPhone,
    hasInsurance,
    insuranceNumber,
    insuranceType,
  } = req.body();

  const patient = await PatientModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      firstName,
      lastName,
      dob,
      gender,
      maritalStatus,
      father,
      mother,
      nationality,
      nationalID,
      passport,
      homeAddress,
      occupation,
      religion,
      phone,
      contactPersonName,
      contactPersonPhone,
      hasInsurance,
      insuranceNumber,
      insuranceType,
    }
  );

  res.json({ msg: "patient updated", patient });
});

router.delete("/:id", async (req: Request, res: Response) => {
  await PatientModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "patient deleted" });
});

export { router };
