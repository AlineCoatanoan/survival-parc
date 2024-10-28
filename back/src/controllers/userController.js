import { successResponse } from "../middlewares/success.js";
import { error404 } from "../middlewares/error404.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { models } from "../models/index.js";
import { Op } from "sequelize";

const { User } = models;

// get all users
export const getAllUsers = ctrlWrapper(async (req, res) => {
  const users = await User.findAll({
    attributes: [
      "id",
      "firstName",
      "lastName",
      "email",
      "role",
      "createdAt",
      "updatedAt",
    ], // Spécifiez les attributs à récupérer
  });
  successResponse(res, "Users fetched successfully", users);
});

// get user by id
export const getUserId = ctrlWrapper(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: [
      "id",
      "firstName",
      "lastName",
      "email",
      "role",
      "createdAt",
      "updatedAt",
    ],
  });
  if (!user) return error404(res, "User not found");

  successResponse(res, "User fetched successfully", user);
});

// create user
export const createUser = ctrlWrapper(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body; // Récupération des données

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    successResponse(res, "User created successfully", {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error creating user", error });
  }
});

// update user
export const updateUser = ctrlWrapper(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) return error404(res, "User not found");

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (email) user.email = email;
  if (password) user.password = password;
  if (role) user.role = role;

  await user.save();
  successResponse(res, "User updated successfully", {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
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
      [Op.or]: [
        { firstName: { [Op.iLike]: `%${name}%` } },
        { lastName: { [Op.iLike]: `%${name}%` } },
        { email: { [Op.iLike]: `%${name}%` } },
      ],
    },
    attributes: [
      "id",
      "firstName",
      "lastName",
      "email",
      "role",
      "createdAt",
      "updatedAt",
    ],
    order: [["firstName", "ASC"]],
  });
  successResponse(res, "Users fetched successfully", users);
});
