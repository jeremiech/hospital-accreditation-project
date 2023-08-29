import { Schema, model } from "mongoose";

enum GENDER {
  male = "male",
  female = "female",
}

enum MARITAL_STATUS {
  single = "single",
  married = "married",
  divorced = "divorced",
  widowed = "widowed",
}

enum USER_ROLE {
  patient = "patient",
  doctor = "doctor",
  admin = "admin",
  nurse = "nurse",
}

enum FIELD_TYPE {
  shortAnswer = "short-answer",
  paragraph = "paragraph",
  checkbox = "checkbox",
  select = "select",
  dropdown = "dropdown",
}

// interface
interface AddressProps {
  country: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
}

interface UserProps {
  name: string;
  image: string;
  role: USER_ROLE;
  email: string;
  password: string;
  date: Date;
}

interface PatientProps {
  firstName: string;
  lastName: string;
  dob: Date;
  gender: GENDER;
  maritalStatus: MARITAL_STATUS;
  father: string;
  mother: string;
  nationality: string;
  nationalID: string;
  passport: string;
  homeAddress: AddressProps;
  occupation: string;
  religion: string;
  phone: string;
  contactPersonName: string;
  contactPersonPhone: string;
  hasInsurance: boolean;
  insuranceNumber: string;
  insuranceType: string;
  user: UserProps;
  date: Date;
}

// TODO: more fields
interface CarePlanProps {
  name: string;
  description: string;
  user: UserProps;
  patient: PatientProps;
  date: Date;
}

interface FieldProps {
  question: string;
  type: FIELD_TYPE;
  width: number;
  isRequired: boolean;
  description: string;
}

interface ResponseProps {
  position: number;
  question: string;
  answer: string;
}

interface FormProps {
  name: string;
  description: string;
  fieldCount: number;
  fields: Array<FieldProps>;
  user: UserProps;
  date: Date;
}

interface FormResponseProps {
  value: string;
  groupId: number;
  form: FormProps;
  user: UserProps;
  responses: Array<ResponseProps>;
  date: Date;
}

// schema
const userSchema = new Schema<UserProps>({
  name: { type: String, required: true },
  image: { type: String },
  role: { type: String, default: USER_ROLE.patient },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  date: { type: Date, default: Date.now },
});

const patientSchema = new Schema<PatientProps>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String },
  maritalStatus: { type: String },
  father: { type: String },
  mother: { type: String },
  nationality: { type: String },
  nationalID: { type: String },
  passport: { type: String },
  homeAddress: { type: Object },
  occupation: { type: String },
  religion: { type: String },
  phone: { type: String },
  contactPersonName: { type: String },
  contactPersonPhone: { type: String },
  hasInsurance: { type: Boolean },
  insuranceNumber: { type: String },
  insuranceType: { type: String },
  date: { type: Date, default: Date.now },
});

// TODO: more fields
const carePlanSchema = new Schema<CarePlanProps>({
  name: { type: String },
  description: { type: String },
  patient: { type: patientSchema },
  date: { type: Date, default: Date.now },
});

const fieldSchema = new Schema<FieldProps>({
  question: { type: String },
  type: { type: String },
  width: { type: Number },
  isRequired: { type: Boolean },
  description: { type: String },
});

const formSchema = new Schema<FormProps>({
  name: { type: String, required: true },
  description: { type: String },
  fieldCount: { type: Number, default: 0 },
  fields: { type: [fieldSchema] },
  date: { type: Date, default: Date.now },
});

const responseSchema = new Schema<ResponseProps>({
  position: { type: Number },
  question: { type: String },
  answer: { type: String },
});

const formResponseSchema = new Schema<FormResponseProps>({
  form: { type: formSchema },
  groupId: { type: Number },
  responses: { type: [responseSchema] },
  date: { type: Date, default: Date.now },
});

// model
export const UserModel = model<UserProps>("User", userSchema);
export const FormModel = model<FormProps>("Form", formSchema);
export const PatientModel = model<PatientProps>("Patient", patientSchema);
export const CarePlanModel = model<CarePlanProps>("CarePlan", carePlanSchema);
export const FormResponseModel = model<FormResponseProps>(
  "FormResponse",
  formResponseSchema
);
