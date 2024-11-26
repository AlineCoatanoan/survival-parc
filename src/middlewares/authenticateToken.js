import { verifyToken } from "../../utils/jwt.js"; // Assurez-vous que ce fichier existe et que la fonction fonctionne bien
import { unauthorizedResponse } from "../middlewares/errors.js";

export const authenticateToken = (req, res, next) => {
  const token =
    req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return unauthorizedResponse(res, "Access token missing");
  }

  try {
    const decoded = verifyToken(token); // Décodage du token pour extraire l'ID de l'utilisateur
    console.log("Decoded Token:", decoded); // Ajoutez un log pour vérifier le contenu du token

    // Assurez-vous que le champ "id" existe dans le payload du token
    if (!decoded || !decoded.id) {
      return unauthorizedResponse(res, "Invalid token payload");
    }

    req.userId = decoded.id; // Assurez-vous que le champ "id" est bien présent
    req.userRole = decoded.role; // Assurez-vous que le rôle est bien extrait du token

    next(); // Passe au middleware suivant
  } catch (error) {
    return unauthorizedResponse(res, "Invalid or expired token");
  }
};
