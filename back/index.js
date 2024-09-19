import "dotenv/config"; // importe et configure automatiquement les variables d'environnement définies dans le fichier .env
import express from "express"; // permet de créer un serveur
import cookieParser from "cookie-parser"; // module permet de lire et de manipuler les cookies envoyés par les clients.
// Il est utilisé pour gérer les sessions ou d'autres données stockées côté client.
import cors from "cors"; // permettre à ton serveur de gérer les requêtes provenant de domaines différents du sien -> FRONT
import { router } from "./src/routes/router.js"; // module router, qui contient les différentes routes (endpoints API)

import { middleware404 } from "./middlewares/errorMiddleware.js";

const app = express(); // Cette ligne crée une instance d'Express, app, qui va permettre de définir les routes, middlewares, etc.

// Bodyparser
app.use(express.json()); // middleware permet au serveur de traiter les données au format JSON envoyées par le client (ex:requête POST).
app.use(express.urlencoded({ extended: true })); //middleware utilisé pour analyser les données encodées sous forme d'URL, souvent envoyées via les formulaires
app.use(cookieParser()); //active le middleware cookieParser pour analyser les cookies des requêtes entrantes

//Middlewares Cors
//configure CORS pour autoriser les requêtes provenant de http://localhost:5173 (le front-end local)
//L'option "credentials: true" permet d'envoyer des cookies ou d'autres informations d'authentification avec les requêtes CORS
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
      sameSite: "lax", // ou 'strict', selon tes besoins
    },
  })
);

// Router
app.use("/api", router);

// Global error handler
app.use(middleware404);

// Démarrer le serveur
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/api`);
});
