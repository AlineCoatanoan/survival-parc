import { successResponse } from "../middlewares/successMiddleware.js";
import { notFoundResponse } from "../middlewares/notFoundMiddleware.js";
import { badRequestResponse } from "../middlewares/badRequestMiddleware.js";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
import { models } from "../models/index.js";
import { generateToken } from "../../utils/jwt.js";
import bcrypt from "bcrypt"; // Assure-toi d'avoir installé bcrypt

const { User } = models;

// login
export const login = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;

  // Vérifie si l'email et le mot de passe sont fournis
  if (!email || !password) {
    return badRequestResponse(res, "Email and password are required");
  }

  // Recherche l'utilisateur par email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return notFoundResponse(res, "User not found");
  }

  // Vérifie le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return badRequestResponse(res, "Wrong password");
  }

  // Génère un token JWT pour l'utilisateur
  const token = generateToken(user.id);

  // Sauvegarde le token dans la base de données pour l'utilisateur
  user.token = token;
  await user.save();

  // Envoie une réponse avec succès
  successResponse(res, "Login successful", { user, token });
});

// logout
export const logout = ctrlWrapper(async (req, res) => {
  const { id } = req.body;

  // Recherche l'utilisateur par son ID
  const user = await User.findByPk(id);
  if (!user) return notFoundResponse(res, "User not found");

  // Supprime le token de l'utilisateur pour déconnecter
  user.token = null;
  await user.save();

  successResponse(res, "Logout successful");
});
