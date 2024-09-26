import { successResponse } from "../middlewares/success.js";
import { error404 } from "../middlewares/error404.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { models } from "../models/index.js";

const { User } = models;

// get all users
export const getAllUsers = ctrlWrapper(async (req, res) => {
  const users = await User.findAll();
  successResponse(res, "Users fetched successfully", users);
});

// get user by id
export const getUserId = ctrlWrapper(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return error404(res, "User not found");

  successResponse(res, "User fetched successfully", user);
});

// create user
export const createUser = ctrlWrapper(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
  });
  successResponse(res, "User created successfully", user);
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
  successResponse(res, "User updated successfully", user);
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
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    order: [["name", "ASC"]],
  });
  successResponse(res, "Users fetched successfully", users);
});
