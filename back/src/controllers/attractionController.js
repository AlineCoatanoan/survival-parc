import { models } from "../models/index.js";

const { Attraction } = models;

// get all attractions
export const getAllAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.findAll();
    res.status(200).json({
      success: true,
      message: "Attractions fetched successfully",
      data: attractions,
    });
  } catch (error) {
    console.log("error fetched attractions", error);
    res.status(500).json({
      success: false,
      message: "Error fetching attractions",
      error: error.message,
    });
  }
};

// get attraction by id
export const getAttractionId = async (req, res) => {
  try {
    const attraction = await Attraction.findByPk(req.params.id);
    if (!attraction)
      return res.status(404).json({
        success: false,
        message: "Attraction not found",
      });
    res.status(200).json({
      success: true,
      message: "Attraction fetched successfully",
      data: attraction,
    });
  } catch (error) {
    console.log("error fetched attraction", error);
    res.status(500).json({
      success: false,
      message: "Error fetching attraction",
      error: error.message,
    });
  }
};

// create attraction
export const createAttraction = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    const attraction = await Attraction.create({
      name,
      description,
      categoryId,
    });
    res.status(200).json({
      success: true,
      message: "Attraction created successfully",
      data: attraction,
    });
  } catch (error) {
    console.log("error creating attraction", error);
    res.status(500).json({
      success: false,
      message: "Error creating attraction",
      error: error.message,
    });
  }
};

// update attraction
export const updateAttraction = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    const { id } = req.params;
    const attraction = await Attraction.findByPk(id);
    if (!attraction)
      return res.status(404).json({
        success: false,
        message: "Attraction not found",
      });
    if (name) attraction.name = name;
    if (description) attraction.description = description;
    if (categoryId) attraction.categoryId = categoryId;
    await attraction.save();
    res.status(200).json({
      success: true,
      message: "Attraction updated successfully",
      data: attraction,
    });
  } catch (error) {
    console.log("error updating attraction", error);
    res.status(500).json({
      success: false,
      message: "Error updating attraction",
      error: error.message,
    });
  }
};

// delete attraction
export const deleteAttraction = async (req, res) => {
  try {
    const { id } = req.params;
    const attraction = await Attraction.findByPk(id);
    if (!attraction)
      return res.status(404).json({
        success: false,
        message: "Attraction not found",
      });
    await attraction.destroy();
    res.status(200).json({
      success: true,
      message: "Attraction deleted successfully",
    });
  } catch (error) {
    console.log("error deleting attraction", error);
    res.status(500).json({
      success: false,
      message: "Error deleting attraction",
      error: error.message,
    });
  }
};
