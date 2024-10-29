import jwt from "jsonwebtoken";
import { unauthorizedResponse } from "../middlewares/errorResponse.js";

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return unauthorizedResponse(res, "Access token missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.user; // L'ID de l'utilisateur est stocké dans le JWT
    req.userRole = decoded.role; // Le rôle de l'utilisateur aussi

    next(); // Passe au middleware suivant
  } catch (error) {
    return unauthorizedResponse(res, "Invalid token");
  }
};
