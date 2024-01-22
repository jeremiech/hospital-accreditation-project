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
  bio: string;
  contact: string;
  image: string;
  role: USER_ROLE;
  email: string;
  password: string;
  date: Date;
  patient: typeof Schema.Types.ObjectId;
}

interface AdmissionProps {
  admissionDate: Date;
  dischargeDate: Date;
  modeOfAdmission: string;
  transferredFrom: string;
  isRecovered: boolean;
  isImproved: boolean;
  isUnimproved: boolean;
  diedAfter48hr: boolean;
  diedBefore48hr: boolean;
  wasAutopsyRequested: boolean;
  hasFled: boolean;
  referredTo: typeof Schema.Types.ObjectId;
  clinicalSummary: string;
  finalDiagnosis: string;
  investigationSummary: string;
  otherDiagnosis: string;
  user: typeof Schema.Types.ObjectId;
  patient: typeof Schema.Types.ObjectId;
}

interface SurgeryProps {
  operationDetails: string;
  nextOfKin: string;
  witness: string;
  authorizingPerson: string;
  date: Date;
  doctor: typeof Schema.Types.ObjectId;
  user: typeof Schema.Types.ObjectId;
  patient: typeof Schema.Types.ObjectId;
}

interface AnesthesiaProps {
  sideEffect: string;
  patientQuestion: string;
  agreed: boolean;
  witness: string;
  operationDetails: string;
  authorizingPerson: string;
  date: Date;
  anesthesist: typeof Schema.Types.ObjectId;
  user: typeof Schema.Types.ObjectId;
  patient: typeof Schema.Types.ObjectId;
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
  email: string;
  contactPersonName: string;
  contactPersonPhone: string;
  hasInsurance: boolean;
  insuranceNumber: string;
  insuranceType: string;
  date: Date;
  user: typeof Schema.Types.ObjectId;
}

interface FieldProps {
  id: number;
  qType: string;
  width: string;
  question: string;
  choices: string[];
  isRequired: boolean;
}

interface ActivityProps {
  details: string;
  date: Date;
}

interface CarePlanProps {
  name: string;
  description: string;
  user: UserProps;
  patient: PatientProps;
  activity: Array<ActivityProps>;
  date: Date;
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

interface MessageProps {
  content: string;
  sender: UserProps;
  recipient: UserProps;
  date: Date;
}

interface TransferProps {
  details: string;
  completed: boolean;
  user: UserProps;
  patient: PatientProps;
  date: Date;
}

// schema
const userSchema = new Schema<UserProps>({
  name: { type: String, required: true },
  image: { type: String },
  bio: { type: String },
  contact: { type: String },
  role: { type: String, default: USER_ROLE.patient },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  date: { type: Date, default: Date.now },
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
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
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const admissionSchema = new Schema<AdmissionProps>({
  admissionDate: { type: Date, default: Date.now },
  dischargeDate: { type: Date },
  modeOfAdmission: { type: String },
  transferredFrom: { type: String },
  isRecovered: { type: Boolean },
  isImproved: { type: Boolean },
  isUnimproved: { type: Boolean },
  diedAfter48hr: { type: Boolean },
  diedBefore48hr: { type: Boolean },
  wasAutopsyRequested: { type: Boolean },
  hasFled: { type: Boolean },
  referredTo: { type: Schema.Types.ObjectId, ref: "User" },
  clinicalSummary: { type: String },
  finalDiagnosis: { type: String },
  investigationSummary: { type: String },
  otherDiagnosis: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
});

const surgerySchema = new Schema<SurgeryProps>({
  operationDetails: { type: String },
  nextOfKin: { type: String },
  witness: { type: String },
  authorizingPerson: { type: String },
  date: { type: Date, default: Date.now },
  doctor: { type: Schema.Types.ObjectId, ref: "User" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
});

const anesthesiaSchema = new Schema<AnesthesiaProps>({
  sideEffect: { type: String },
  patientQuestion: { type: String },
  agreed: { type: Boolean },
  witness: { type: String },
  operationDetails: { type: String },
  authorizingPerson: { type: String },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  anesthesist: { type: Schema.Types.ObjectId, ref: "User" },
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
});

const activitySchema = new Schema<ActivityProps>({
  details: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const carePlanSchema = new Schema<CarePlanProps>({
  name: { type: String },
  description: { type: String },
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  activity: { type: [activitySchema] },
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

const transferSchema = new Schema<TransferProps>({
  details: { type: String, required: true },
  completed: { type: Boolean },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  date: { type: Date, default: Date.now },
});

const messageSchema = new Schema<MessageProps>({
  content: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  recipient: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
});

// model
export const UserModel = model<UserProps>("User", userSchema);
export const FormModel = model<FormProps>("Form", formSchema);
export const PatientModel = model<PatientProps>("Patient", patientSchema);
export const SurgeryModel = model<SurgeryProps>("Surgery", surgerySchema);
export const MessageModel = model<MessageProps>("Message", messageSchema);
export const CarePlanModel = model<CarePlanProps>("CarePlan", carePlanSchema);
export const TransferModel = model<TransferProps>("Transfer", transferSchema);
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
