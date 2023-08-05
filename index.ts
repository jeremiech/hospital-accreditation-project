import dotenv from "dotenv";
import { connect } from "mongoose";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { router as indexRoutes } from "./src/routes";
import { router as authRoutes } from "./src/routes/auth";
import { router as userRoutes } from "./src/routes/user";
import express, { Express, Request, Response } from "express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
connect(process.env.DATABASE_URI || "");

app.use(express.json());
app.use("", indexRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

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
