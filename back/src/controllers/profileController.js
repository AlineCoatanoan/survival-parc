import { successResponse } from "../middlewares/success.js";
import { error404 } from "../middlewares/error404.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { models } from "../models/index.js";

const { Profile } = models;

// create profile
export const createProfile = ctrlWrapper(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, address } = req.body;
  const profile = await Profile.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
  });
  successResponse(res, "Profile created successfully", profile);
});

// update profile
export const updateProfile = ctrlWrapper(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, address } = req.body;
  const { id } = req.params;

  const profile = await Profile.findByPk(id);
  if (!profile) return error404(res, "Profile not found");

  if (firstName) profile.firstName = firstName;
  if (lastName) profile.lastName = lastName;
  if (email) profile.email = email;
  if (phoneNumber) profile.phoneNumber = phoneNumber;
  if (address) profile.address = address;

  await profile.save();
  successResponse(res, "Profile updated successfully", profile);
});

// delete profile
export const deleteProfile = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const profile = await Profile.findByPk(id);
  if (!profile) return error404(res, "Profile not found");

  await profile.destroy();
  successResponse(res, "Profile deleted successfully");
});
