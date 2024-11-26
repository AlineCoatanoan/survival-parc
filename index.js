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
import { sequelize } from "./src/config/dbclient.js"; // Assurez-vous que le chemin est correct
import { initializeModels } from "./src/config/associations.js"; // Assurez-vous que le chemin est correct

const app = express();

// Exporter l'application pour les tests
export default app;

// Middleware de logging
app.use((req, res, next) => {
  console.log(`Requested URL: ${req.originalUrl}`); // Log l'URL demandée
  next(); // Passer au middleware suivant
});

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
initializeModels();

// Vérification de la connexion à la base de données
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "✅ Connection to the database has been established successfully."
    );

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
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}/api`);
    });
  })
  .catch((error) => {
    console.error("❌ Unable to connect to the database:", error);
  });
