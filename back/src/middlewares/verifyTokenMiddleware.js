import { verifyToken } from "../utils/jwt.js";
import {
  unauthorizedResponse,
  forbiddenResponse,
} from "../middlewares/errorResponse.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Le token est après 'Bearer '

  if (!token) {
    return unauthorizedResponse(res, "Access token missing");
  }

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.user; // Assure-toi que 'user' est la propriété correcte pour l'ID de l'utilisateur
    req.userRole = decoded.role; // Assure-toi que 'role' est la propriété correcte pour le rôle de l'utilisateur

    // Vérifie les permissions spécifiques pour certaines routes
    if (req.userRole !== "admin") {
      // Exemple de vérification des permissions
      return forbiddenResponse(res, "Access denied");
    }

    next(); // Passe au middleware ou contrôleur suivant
  } catch (error) {
    return unauthorizedResponse(res, "Invalid token");
  }
};
