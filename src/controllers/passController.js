import { successResponse } from "../middlewares/success.js";
import { error404 } from "../middlewares/error404.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { models } from "../models/index.js";

const { Pass } = models;

// get all passes
export const getAllPasses = ctrlWrapper(async (req, res) => {
  const passes = await Pass.findAll();
  successResponse(res, "Passes fetched successfully", passes);
});

// get pass by id
export const getPassId = ctrlWrapper(async (req, res) => {
  const pass = await Pass.findByPk(req.params.id);
  if (!pass) return error404(res, "Pass not found");

  successResponse(res, "Pass fetched successfully", pass);
});

// create pass
export const createPass = ctrlWrapper(async (req, res) => {
  const { name, description, categoryId } = req.body;
  const pass = await Pass.create({
    name,
    description,
    categoryId,
  });
  successResponse(res, "Pass created successfully", pass);
});

// update pass
export const updatePass = ctrlWrapper(async (req, res) => {
  const { name, description, categoryId } = req.body;
  const { id } = req.params;

  const pass = await Pass.findByPk(id);
  if (!pass) return error404(res, "Pass not found");

  if (name) pass.name = name;
  if (description) pass.description = description;
  if (categoryId) pass.categoryId = categoryId;

  await pass.save();
  successResponse(res, "Pass updated successfully", pass);
});

// delete pass
export const deletePass = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const pass = await Pass.findByPk(id);
  if (!pass) return error404(res, "Pass not found");

  await pass.destroy();
  successResponse(res, "Pass deleted successfully");
});
