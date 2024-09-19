import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Fonction pour générer un token JWT
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h", // Par défaut, expiration dans 1 heure
  });
};

// Fonction pour vérifier un token JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
