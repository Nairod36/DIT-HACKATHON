import dotenv from "dotenv";
import express from "express";
import { BaseEntity, DataSource } from "typeorm";
import { Participation } from "./entities/participation.entity";
import { Product } from "./entities/product.entity";
import participationRoutes from "./routes/participation.route";
import verificationRoutes from "./routes/verification.route";

dotenv.config();

const app = express();
const PORT = process.env.POSTGRES_PORT;

// Configuration de l'objet DataSource en utilisant process.env
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(PORT!) || 5432,
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

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la connexion à la base de données", error);
  });
