import { successResponse } from "../middlewares/successMiddleware.js";
import { notFoundResponse } from "../middlewares/notFoundMiddleware.js";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
import { models } from "../models/index.js";

export const hotelController = {};

const { Hotel } = models;

// get all hotels
export const getAllHotels = ctrlWrapper(async (req, res) => {
  const hotels = await Hotel.findAll();
  successResponse(res, "Hotels fetched successfully", hotels);
});

// get hotel by id
export const getHotelId = ctrlWrapper(async (req, res) => {
  const hotel = await Hotel.findByPk(req.params.id);
  if (!hotel) return notFoundResponse(res, "Hotel not found");

  successResponse(res, "Hotel fetched successfully", hotel);
});

// create hotel
export const createHotel = ctrlWrapper(async (req, res) => {
  const { name, description, categoryId } = req.body;
  const hotel = await Hotel.create({
    name,
    description,
    categoryId,
  });
  successResponse(res, "Hotel created successfully", hotel);
});

// update hotel
export const updateHotel = ctrlWrapper(async (req, res) => {
  const { name, description, categoryId } = req.body;
  const { id } = req.params;

  const hotel = await Hotel.findByPk(id);
  if (!hotel) return notFoundResponse(res, "Hotel not found");

  if (name) hotel.name = name;
  if (description) hotel.description = description;
  if (categoryId) hotel.categoryId = categoryId;

  await hotel.save();
  successResponse(res, "Hotel updated successfully", hotel);
});

// delete hotel
export const deleteHotel = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const hotel = await Hotel.findByPk(id);
  if (!hotel) return notFoundResponse(res, "Hotel not found");

  await hotel.destroy();
  successResponse(res, "Hotel deleted successfully");
});
