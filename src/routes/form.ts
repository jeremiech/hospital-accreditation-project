import { Router, Request, Response } from "express";
import { FormModel, FormFieldModel, FormResponseModel } from "../models";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { limit, skip } = req.body;
  const forms = await FormModel.find()
    .skip(skip || 0)
    .limit(limit || 10);

  res.json({ forms, total: await FormModel.count() });
});

router.post("/", async (req: Request, res: Response) => {
  const { name, description } = req.body();
  const form = new FormModel({ name, description });
  await form.save();

  res.json({ msg: "form created", form });
});

router.get("/:id", async (req: Request, res: Response) => {
  const form = await FormModel.findById(req.params.id);
  await form?.updateOne({ fieldCount: FormFieldModel.where({ form }).count() });
  res.json({ form });
});

router.put("/:id", async (req: Request, res: Response) => {
  const { name, description, fieldCount } = req.body();
  const form = await FormModel.findOneAndUpdate(
    { _id: req.params.id },
    { name, description, fieldCount }
  );

  res.json({ msg: "form updated", form });
});

router.delete("/:id", async (req: Request, res: Response) => {
  await FormModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "form deleted" });
});

// form fields
router.get("/field", async (req: Request, res: Response) => {
  const { limit, skip } = req.body;
  const formFields = await FormFieldModel.find()
    .skip(skip || 0)
    .limit(limit || 10);

  res.json({ formFields, total: await FormFieldModel.count() });
});

router.post("/field", async (req: Request, res: Response) => {
  const { index, label, type, width, choice, isRequired } = req.body();
  const formField = new FormFieldModel({
    index,
    label,
    type,
    width,
    choice,
    isRequired,
  });
  await formField.save();

  res.json({ msg: "form field created", formField });
});

router.get("/field/:id", async (req: Request, res: Response) => {
  const formField = await FormFieldModel.findById(req.params.id);
  res.json({ formField });
});

router.put("/field/:id", async (req: Request, res: Response) => {
  const { index, label, type, width, choice, isRequired } = req.body();
  const formField = await FormFieldModel.findOneAndUpdate(
    { _id: req.params.id },
    { index, label, type, width, choice, isRequired }
  );

  res.json({ msg: "form field updated", formField });
});

router.delete("/field/:id", async (req: Request, res: Response) => {
  await FormFieldModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "form field deleted" });
});

// form response
router.get("/response", async (req: Request, res: Response) => {
  const { limit, skip } = req.body;
  const formResponse = await FormResponseModel.find()
    .skip(skip || 0)
    .limit(limit || 10);

  res.json({ formResponse, total: await FormResponseModel.count() });
});

router.post("/response", async (req: Request, res: Response) => {
  const { value, groupId } = req.body();
  const formResponse = new FormResponseModel({ value, groupId });
  await formResponse.save();

  res.json({ msg: "form response created", formResponse });
});

router.get("/response/:id", async (req: Request, res: Response) => {
  const formResponse = await FormResponseModel.findById(req.params.id);
  res.json({ formResponse });
});

router.put("/response/:id", async (req: Request, res: Response) => {
  const { value, groupId } = req.body();
  const formResponse = await FormResponseModel.findOneAndUpdate(
    { _id: req.params.id },
    { value, groupId }
  );

  res.json({ msg: "form response updated", formResponse });
});

router.delete("/response/:id", async (req: Request, res: Response) => {
  await FormResponseModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "form response deleted" });
});

export { router };
