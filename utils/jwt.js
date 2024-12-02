import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Fonction pour générer un token JWT
export const generateToken = (user) => {
  if (!user || !user.id || !user.role) {
    throw new Error("User object must contain id and role");
  }

  // Vérifie que la clé secrète et l'expiration sont définies dans les variables d'environnement
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  // Utilisation de la durée d'expiration définie dans .env, avec une valeur par défaut de "1h"
  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

  return jwt.sign(
    { id: user.id, role: user.role }, // Payload
    process.env.JWT_SECRET, // Clé secrète
    { expiresIn } // Durée d'expiration
  );
};

// Fonction pour vérifier un token JWT
export const verifyToken = (token) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token: " + error.message);
  }
};
