import { successResponse } from "../middlewares/success.js";
import { error404 } from "../middlewares/error404.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { models } from "../models/index.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { User } = models;

// get all users
export const getAllUsers = ctrlWrapper(async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "email", "role", "createdAt", "updatedAt"], // Spécifiez les attributs à récupérer
  });
  successResponse(res, "Users fetched successfully", users);
});

// get all admins
export const getAllAdmins = ctrlWrapper(async (req, res) => {
  const admins = await User.findAll({
    where: { role: "admin" },
    attributes: ["id", "email", "role", "createdAt", "updatedAt"], // Spécifiez les attributs à récupérer
  });
  successResponse(res, "Admins fetched successfully", admins);
});

// get user by id
export const getUserId = ctrlWrapper(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ["id", "email", "role", "createdAt", "updatedAt"],
  });
  if (!user) return error404(res, "User not found");

  successResponse(res, "User fetched successfully", user);
});

// create user
export const createUser = ctrlWrapper(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body; // Récupération des données

  try {
    // Hachage du mot de passe avec un salt de 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    // Génération du token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET, // Assure-toi que JWT_SECRET est défini dans ton .env
      { expiresIn: "1h" } // Durée de validité du token (ajuste en fonction de tes besoins)
    );

    // Envoie le token avec la réponse de succès
    successResponse(res, "User created successfully", {
      id: user.id,
      email: user.email,
      role: user.role,
      token, // Ajoute le token ici
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(400).json({ message: "Error creating user", error });
  }
});

// update user
export const updateUser = ctrlWrapper(async (req, res) => {
  const { email, password, role } = req.body;
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) return error404(res, "User not found");

  if (email) user.email = email;
  if (password) user.password = await bcrypt.hash(password, 10);
  if (role) user.role = role;

  await user.save();
  successResponse(res, "User updated successfully", {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
});

// delete user
export const deleteUser = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) return error404(res, "User not found");

  await user.destroy();
  successResponse(res, "User deleted successfully");
});

// search user
export const searchUser = ctrlWrapper(async (req, res) => {
  const { name } = req.query;

  const users = await User.findAll({
    where: {
      [Op.or]: [{ email: { [Op.iLike]: `%${name}%` } }],
    },
    attributes: ["id", "email", "role", "createdAt", "updatedAt"],
    order: [["firstName", "ASC"]],
  });
  successResponse(res, "Users fetched successfully", users);
});
