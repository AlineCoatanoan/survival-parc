import { successResponse } from "../middlewares/successMiddleware.js";
import { notFoundResponse } from "../middlewares/notFoundMiddleware.js";
import { errorHandler } from "../middlewares/errorMiddleware.js";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
import { models } from "../models/index.js";

const { Attraction } = models;

// get all attractions
export const getAllAttractions = ctrlWrapper(async (req, res) => {
  const attractions = await Attraction.findAll();
  successResponse(res, "Attractions fetched successfully", attractions);
});

// get attraction by id
export const getAttractionId = ctrlWrapper(async (req, res) => {
  const attraction = await Attraction.findByPk(req.params.id);
  if (!attraction) return notFoundResponse(res, "Attraction not found");

  successResponse(res, "Attraction fetched successfully", attraction);
});

// create attraction
export const createAttraction = ctrlWrapper(async (req, res) => {
  const { name, description, categoryId } = req.body;
  const attraction = await Attraction.create({
    name,
    description,
    categoryId,
  });
  successResponse(res, "Attraction created successfully", attraction);
});

// update attraction
export const updateAttraction = ctrlWrapper(async (req, res) => {
  const { name, description, categoryId } = req.body;
  const { id } = req.params;

  const attraction = await Attraction.findByPk(id);
  if (!attraction) return notFoundResponse(res, "Attraction not found");

  if (name) attraction.name = name;
  if (description) attraction.description = description;
  if (categoryId) attraction.categoryId = categoryId;

  await attraction.save();
  successResponse(res, "Attraction updated successfully", attraction);
});

// delete attraction
export const deleteAttraction = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const attraction = await Attraction.findByPk(id);
  if (!attraction) return notFoundResponse(res, "Attraction not found");

  await attraction.destroy();
  successResponse(res, "Attraction deleted successfully");
});
