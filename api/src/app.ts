import express from "express";
import cors from "cors";
import verificationRoutes from "./routes/verification.route";
import participationRoutes from "./routes/participation.route";
import productRoutes from "./routes/product.route";
import { DataSource } from "typeorm";
import { Participation } from "./entities/participation.entity";
import { Product } from "./entities/product.entity";
import { BaseEntity } from "./entities/base.entity";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const DB_PORT = process.env.POSTGRES_PORT;
const API_PORT = process.env.API_PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Configuration de l'objet DataSource en utilisant process.env
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Participation, Product, BaseEntity],
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Initialisation de la connexion à la base de données et démarrage du serveur
AppDataSource.initialize()
  .then(() => {
    console.log("Connecté à la base de données avec succès");

    app.use(express.json());
    app.use("/api", verificationRoutes());
    app.use("/api", participationRoutes(AppDataSource));
    app.use("/api", productRoutes(AppDataSource));

    app.listen(5432, () => {
      console.log(`Server is running on port ${5432}`);
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la connexion à la base de données", error);
  });
