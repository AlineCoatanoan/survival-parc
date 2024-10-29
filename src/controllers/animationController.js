import { successResponse } from "../middlewares/success.js";
import { error404 } from "../middlewares/error404.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { models } from "../models/index.js";

const { Animation } = models;

// get all animations
export const getAllAnimations = ctrlWrapper(async (req, res) => {
  const animations = await Animation.findAll();
  successResponse(res, "Animations fetched successfully", animations);
});

// get animation by id
export const getAnimationId = ctrlWrapper(async (req, res) => {
  const animation = await Animation.findByPk(req.params.id);
  if (!animation) return error404(res, "Animation not found");

  successResponse(res, "Animation fetched successfully", animation);
});

// create animation
export const createAnimation = ctrlWrapper(async (req, res) => {
  const { name, description, categoryId } = req.body;
  const animation = await Animation.create({
    name,
    description,
    categoryId,
  });
  successResponse(res, "Animation created successfully", animation);
});

// update animation
export const updateAnimation = ctrlWrapper(async (req, res) => {
  const { name, description, categoryId } = req.body;
  const { id } = req.params;

  const animation = await Animation.findByPk(id);
  if (!animation) return error404(res, "Animation not found");

  if (name) animation.name = name;
  if (description) animation.description = description;
  if (categoryId) animation.categoryId = categoryId;

  await animation.save();
  successResponse(res, "Animation updated successfully", animation);
});

// delete animation
export const deleteAnimation = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const animation = await Animation.findByPk(id);
  if (!animation) return error404(res, "Animation not found");

  await animation.destroy();
  successResponse(res, "Animation deleted successfully");
});

// search animation
export const searchAnimation = ctrlWrapper(async (req, res) => {
  const { name } = req.query;

  const animations = await Animation.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    order: [["name", "ASC"]],
  });
  successResponse(res, "Animations fetched successfully", animations);
});
