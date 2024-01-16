import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { faker } from "@faker-js/faker";
import {
  UserModel,
  PatientModel,
  AdmissionModel,
  SurgeryModel,
  AnesthesiaModel,
} from "./models";

dotenv.config();
connect(process.env.DATABASE_URI || "");

export async function run(type: string = "") {
  let num = faker.number.int({ min: 1, max: 7 });

  // * users
  let users = [];

  for (let a = 0; a < 10; a++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: faker.helpers.arrayElement(["patient", "doctor", "admin", "nurse"]),
      password: bcrypt.hashSync("123", 3),
    });
  }

  const user = await UserModel.aggregate([{ $sample: { size: 10 } }]);

  // * patients
  let today = new Date();
  let patients = [];
  for (let a = 0; a < 10; a++) {
    patients.push({
      patientId:
        Math.floor(Math.random() * (999_999 - 100_000 + 1)) +
        100_000 +
        "-" +
        today.getFullYear(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dob: faker.date.birthdate(),
      gender: faker.helpers.arrayElement(["male", "female"]),
      maritalStatus: faker.helpers.arrayElement([
        "single",
        "married",
        "divorced",
        "widowed",
      ]),
      father: faker.person.fullName(),
      mother: faker.person.fullName(),
      nationality: faker.location.country(),
      nationalID: faker.finance.accountNumber(),
      passport: faker.string.alphanumeric(6),
      homeAddress: {
        country: faker.location.country(),
        province: faker.location.state(),
        district: faker.location.county(),
        sector: faker.location.city(),
        cell: faker.location.street(),
        village: faker.location.buildingNumber(),
      },
      occupation: faker.person.jobType(),
      religion: faker.helpers.arrayElement([
        "adventist",
        "christian",
        "anglican",
        "muslim",
        "adepr",
        "",
      ]),
      phone: faker.phone.number(),
      contactPersonName: faker.person.fullName(),
      contactPersonPhone: faker.phone.number(),
      hasInsurance: faker.datatype.boolean(),
      insuranceNumber: faker.finance.accountNumber(),
      insuranceType: faker.helpers.arrayElement(["prime", "rssb", "mmi", ""]),
      user: user[faker.number.int({ min: 1, max: 9 })]._id,
    });
  }

  const patient = await PatientModel.aggregate([{ $sample: { size: 10 } }]);

  // * admissions
  let admissions = [];
  for (let a = 0; a < 10; a++) {
    admissions.push({
      admissionDate: faker.date.past(),
      dischargeDate: faker.date.recent(),
      modeOfAdmission: faker.helpers.arrayElement(["voluntary", "transferred"]),
      transferredFrom: faker.company.name(),
      isRecoverd: num == 1,
      isImproved: num == 2,
      isUnimproved: num == 3,
      diedAfter48hr: num == 4,
      diedBefore48hr: num == 5,
      wasAutopsyRequested: num == 6,
      hasFled: num == 7,
      referredTo: user[faker.number.int({ min: 1, max: 9 })]._id,
      clinicalSummary: faker.helpers.arrayElement([""]),
      finalDiagnosis: faker.helpers.arrayElement([
        "Flu",
        "Common Cold",
        "Migraine",
        "Arthritis",
        "Hypertension",
        "Diabetes",
        "Asthma",
      ]),
      investigationSummary: faker.helpers.arrayElement([""]),
      otherDiagnosis: faker.lorem.paragraph(),
      user: user[faker.number.int({ min: 1, max: 9 })]._id,
      patient: patient[faker.number.int({ min: 1, max: 9 })]._id,
    });
  }

  // * surgery
  let surgeries = [];
  for (let a = 0; a < 10; a++) {
    surgeries.push({
      operationDetails: faker.lorem.paragraph(),
      nextOfKin: faker.person.fullName(),
      witness: faker.person.fullName(),
      authorizingPerson: faker.person.fullName(),
      doctor: user[faker.number.int({ min: 1, max: 9 })]._id,
      user: user[faker.number.int({ min: 1, max: 9 })]._id,
      patient: patient[faker.number.int({ min: 1, max: 9 })]._id,
    });
  }

  // * anesthesia
  let anesthesia = [];
  for (let a = 0; a < 10; a++) {
    anesthesia.push({
      sideEffect: faker.lorem.paragraph(),
      patientQuestion: faker.lorem.paragraph(),
      agreed: num > 4,
      witness: faker.person.fullName(),
      operationDetails: faker.lorem.paragraph(),
      authorizingPerson: faker.person.fullName(),
      anesthesist: user[faker.number.int({ min: 1, max: 9 })]._id,
      user: user[faker.number.int({ min: 1, max: 9 })]._id,
      patient: patient[faker.number.int({ min: 1, max: 9 })]._id,
    });
  }

  switch (type) {
    case "user":
      await UserModel.insertMany(users);
      console.log("users saved");
      break;
    case "patient":
      await PatientModel.insertMany(patients);
      console.log("patients saved");
      break;
    case "admission":
      await AdmissionModel.insertMany(admissions);
      console.log("admissions saved");
      break;
    case "anesthesia":
      await AnesthesiaModel.insertMany(anesthesia);
      console.log("anesthesia saved");
      break;
    case "surgery":
      await SurgeryModel.insertMany(surgeries);
      console.log("surgeries saved");
      break;
    default:
      await UserModel.insertMany(users);
      await PatientModel.insertMany(patients);
      await SurgeryModel.insertMany(surgeries);
      await AdmissionModel.insertMany(admissions);
      await AnesthesiaModel.insertMany(anesthesia);
  }
}

// run();
