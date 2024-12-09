import { successResponse } from "../middlewares/success.js";
import { error404 } from "../middlewares/error404.js";
import { badRequestResponse } from "../middlewares/errors.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { models } from "../models/index.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { setCookies } from "../../utils/cookieUtils.js";

const { User } = models;

// get all users
export const getAllUsers = ctrlWrapper(async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "email", "role", "createdAt", "updatedAt"],
  });
  successResponse(res, "Users fetched successfully", users);
});

// get all admins
export const getAllAdmins = ctrlWrapper(async (req, res) => {
  const admins = await User.findAll({
    where: { role: "admin" },
    attributes: ["id", "email", "role", "createdAt", "updatedAt"],
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
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return badRequestResponse(res, "All fields are required");
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return badRequestResponse(res, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );

  setCookies(res, token);
  successResponse(res, "User created successfully", {
    id: user.id,
    email: user.email,
    role: user.role,
  });
});

// update user
export const updateUser = ctrlWrapper(async (req, res) => {
  const { email, password, role } = req.body;
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) return error404(res, "User not found");

  if (email) user.email = email;
  if (password) {
    if (password.trim() === "") {
      return badRequestResponse(res, "Password cannot be empty");
    }
    user.password = await bcrypt.hash(password, 10);
  }
  if (role) user.role = role;

  await user.save();
  successResponse(res, "User updated successfully", {
    id: user.id,
    email: user.email,
    role: user.role,
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
    where: { [Op.or]: [{ email: { [Op.iLike]: `%${name}%` } }] },
    attributes: ["id", "email", "role", "createdAt", "updatedAt", "firstName"],
    order: [["firstName", "ASC"]],
  });
  successResponse(res, "Users fetched successfully", users);
});
