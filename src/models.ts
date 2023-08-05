import { Schema, model } from "mongoose";

// interface
interface UserInterface {
  name: string;
  email: string;
  password: string;
  date?: Date;
  role?: string;
}

interface PlanInterface {
  name: string;
  description: string;
  date: Date;
}

// schema
const userSchema = new Schema<UserInterface>({
  name: { type: String, required: true },
  role: { type: String, default: "user" },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  date: { type: Date, default: Date.now },
});

const planSchema = new Schema<PlanInterface>({
  name: { type: String },
  description: { type: String },
  date: { type: Date, default: Date.now },
});

// model
export const UserModel = model<UserInterface>("User", userSchema);
export const PlanModel = model<PlanInterface>("Plan", planSchema);
