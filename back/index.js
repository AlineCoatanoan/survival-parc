import "dotenv/config";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router } from "./src/routes/router.js";
import { errorResponse } from "./middlewares/errors.js"; // Pour les autres erreurs
import { error404 } from "./middlewares/error404.js"; // Pour les erreurs 404

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

// Router
app.use("/api", router);

// erreur 404
app.use(error404);

// erreurs globales
app.use(errorResponse);

// Démarrer le serveur
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/api`);
});
