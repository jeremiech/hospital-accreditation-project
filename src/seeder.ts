import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { faker } from "@faker-js/faker";
import { UserModel, PatientModel } from "./models";

dotenv.config();
connect(process.env.DATABASE_URI || "");

export async function run() {
  // * users
  for (let a = 0; a < 10; a++) {
    let user = new UserModel({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: faker.helpers.arrayElement(["patient", "doctor", "admin", "nurse"]),
      password: bcrypt.hashSync("123", 3),
    });

    await user.save();
  }
  console.log("users saved");

  // * patients
  for (let a = 0; a < 100; a++) {
    let patient = new PatientModel({
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
    });

    await patient.save();
  }
  console.log("patients saved");
}

run();
