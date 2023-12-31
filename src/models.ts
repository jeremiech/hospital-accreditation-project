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
  shortAnswer = "Short answer",
  paragraph = "Paragraph",
  singleChoice = "Single choice",
  multiChoice = "Multiple choice",
  Date = "Date",
  time = "Time",
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

interface AdmissionProps {
  admissionDate: Date;
  dischargeDate: Date;
  modeOfAdmission: string;
  isRecovered: boolean;
  isImproved: boolean;
  isUnimproved: boolean;
  diedAfter48hr: boolean;
  diedBefore48hr: boolean;
  wasAutopsyRequested: boolean;
  hasFled: boolean;
  referredTo: string;
  clinicalSummary: string;
  finalDiagnosis: string;
  investigationSummary: string;
  otherDiagnosis: string;
  user: UserProps;
}

interface SurgeryProps {
  firstName: string;
  lastName: string;
  patientId: string;
  age: number;
  operationDetails: string;
  nextOfKin: string;
  witness: string;
  authorizingPerson: string;
  doctor: string;
  date: Date;
  user: UserProps;
}

interface AnesthesiaProps {
  firstName: string;
  lastName: string;
  patientId: string;
  age: number;
  agreed: boolean;
  operationDetails: string;
  nextOfKin: string;
  witness: string;
  authorizingPerson: string;
  doctor: string;
  date: Date;
  user: UserProps;
}

interface PatientProps {
  patientId: string;
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
  id: number;
  qType: string;
  width: string;
  question: string;
  choices: string[];
  isRequired: boolean;
}

interface ResponseProps {
  position: number;
  question: string;
  answer: string;
}

interface FormProps {
  name: string;
  description: string;
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
  role: { type: String, default: USER_ROLE.doctor },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  date: { type: Date, default: Date.now },
});

const patientSchema = new Schema<PatientProps>({
  patientId: { type: String },
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

const admissionSchema = new Schema<AdmissionProps>({
  admissionDate: { type: Date, default: Date.now },
  dischargeDate: { type: Date },
  modeOfAdmission: { type: String },
  isRecovered: { type: Boolean },
  isImproved: { type: Boolean },
  isUnimproved: { type: Boolean },
  diedAfter48hr: { type: Boolean },
  diedBefore48hr: { type: Boolean },
  wasAutopsyRequested: { type: Boolean },
  hasFled: { type: Boolean },
  referredTo: { type: String },
  clinicalSummary: { type: String },
  finalDiagnosis: { type: String },
  investigationSummary: { type: String },
  otherDiagnosis: { type: String },
});

const surgerySchema = new Schema<SurgeryProps>({
  firstName: { type: String },
  lastName: { type: String },
  patientId: { type: String },
  age: { type: Number },
  operationDetails: { type: String },
  nextOfKin: { type: String },
  witness: { type: String },
  authorizingPerson: { type: String },
  doctor: { type: String },
  date: { type: Date, default: Date.now },
});

const anesthesiaSchema = new Schema<AnesthesiaProps>({
  firstName: { type: String },
  lastName: { type: String },
  patientId: { type: String },
  age: { type: Number },
  agreed: { type: Boolean },
  operationDetails: { type: String },
  nextOfKin: { type: String },
  witness: { type: String },
  authorizingPerson: { type: String },
  doctor: { type: String },
  date: { type: Date, default: Date.now },
});

const carePlanSchema = new Schema<CarePlanProps>({
  name: { type: String },
  description: { type: String },
  patient: { type: patientSchema },
  date: { type: Date, default: Date.now },
});

const fieldSchema = new Schema<FieldProps>({
  id: { type: Number },
  qType: { type: String },
  width: { type: String },
  question: { type: String },
  choices: { type: [String] },
  isRequired: { type: Boolean },
});

const formSchema = new Schema<FormProps>({
  name: { type: String, required: true },
  description: { type: String },
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
export const SurgeryModel = model<SurgeryProps>("Surgery", surgerySchema);
export const CarePlanModel = model<CarePlanProps>("CarePlan", carePlanSchema);
export const AnesthesiaModel = model<AnesthesiaProps>(
  "Anesthesia",
  anesthesiaSchema
);
export const AdmissionModel = model<AdmissionProps>(
  "Admission",
  admissionSchema
);
export const FormResponseModel = model<FormResponseProps>(
  "FormResponse",
  formResponseSchema
);
