import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router } from "./src/routes/router.js";
import { error404 } from "./src/middlewares/error404.js";
import {
  errorResponse,
  badRequestResponse,
  unauthorizedResponse,
  forbiddenResponse,
} from "./src/middlewares/errors.js";
import dbClient from "./src/models/dbclient.js"; // Assurez-vous que le chemin est correct
import associations from "./src/models/associations.js"; // Assurez-vous que le chemin est correct

const app = express();

// Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middlewares Cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware de session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "votre_secret_ici",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// Initialisation des modèles et des associations
associations();

// Synchroniser la base de données avant de démarrer le serveur
console.log("Synchronisation de la base de données...");
dbClient
  .sync({ alter: true }) // Changez à true pour forcer la recréation des tables
  .then(() => {
    console.log("Synchronisation réussie !");
    // Router
    app.use("/api", router);

    // Erreur 404
    app.use(error404);

    // Erreurs globales
    app.use(
      errorResponse,
      badRequestResponse,
      unauthorizedResponse,
      forbiddenResponse
    );

    // Démarrer le serveur
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}/api`);
    });
  })
  .catch((err) => {
    console.error(
      "Erreur lors de la synchronisation de la base de données",
      err
    );
  });
