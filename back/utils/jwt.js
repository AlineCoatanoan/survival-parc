import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Fonction pour générer un token JWT
export const generateToken = (user) => {
  if (!user || !user.id || !user.role) {
    throw new Error("User object must contain id and role");
  }

  return jwt.sign(
    { id: user.id, role: user.role }, // Inclure 'id' et 'role' dans le payload du token
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" } // Par défaut, expiration dans 1 heure
  );
};

// Fonction pour vérifier un token JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
