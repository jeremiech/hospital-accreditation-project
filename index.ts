import cors from "cors";
import dotenv from "dotenv";
import { connect } from "mongoose";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { router as indexRoutes } from "./src/routes";
import { router as userRoutes } from "./src/routes/user";
import { router as formRoutes } from "./src/routes/form";
import express, { Express, Request, Response } from "express";
import { router as messageRoutes } from "./src/routes/message";
import { router as patientRoutes } from "./src/routes/patient";
import { router as surgeryRoutes } from "./src/routes/surgery";
import { router as transferRoutes } from "./src/routes/transfer";
import { router as careplanRoutes } from "./src/routes/careplan";
import { router as admissionRoutes } from "./src/routes/admission";
import { router as anesthesiaRoutes } from "./src/routes/anesthesia";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
connect(process.env.DATABASE_URI || "");

app.use(cors());
app.use(express.json());
app.use("", indexRoutes);
app.use("/user", userRoutes);
app.use("/form", formRoutes);
app.use("/patient", patientRoutes);
app.use("/surgery", surgeryRoutes);
app.use("/message", messageRoutes);
app.use("/careplan", careplanRoutes);
app.use("/transfer", transferRoutes);
app.use("/admission", admissionRoutes);
app.use("/anesthesia", anesthesiaRoutes);
app.use("/uploads", express.static("/uploads"));

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "H.A Backend",
      version: "0.1.0",
      description: "Hospital Accreditation Backend, final year project",
    },
    servers: [{ url: `http://localhost:${port}` }],
  },
  apis: ["./src/routes/*.ts"],
};

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(options), { explorer: true })
);

app.get("/:any", async (req: Request, res: Response) => {
  res.json({ msg: "404 error | page not found" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
