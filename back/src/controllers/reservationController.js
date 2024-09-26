import { successResponse } from "../middlewares/success.js";
import { error404 } from "../middlewares/error404.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { models } from "../models/index.js";

const { Reservation } = models;

// get all reservations
export const getAllReservations = ctrlWrapper(async (req, res) => {
  const reservations = await Reservation.findAll();
  successResponse(res, "Reservations fetched successfully", reservations);
});

// get reservation by id
export const getReservationId = ctrlWrapper(async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (!reservation) return error404(res, "Reservation not found");

  successResponse(res, "Reservation fetched successfully", reservation);
});

// create reservation
export const createReservation = ctrlWrapper(async (req, res) => {
  const { name, description, categoryId } = req.body;
  const reservation = await Reservation.create({
    name,
    description,
    categoryId,
  });
  successResponse(res, "Reservation created successfully", reservation);
});

// update reservation
export const updateReservation = ctrlWrapper(async (req, res) => {
  const { name, description, categoryId } = req.body;
  const { id } = req.params;

  const reservation = await Reservation.findByPk(id);
  if (!reservation) return error404(res, "Reservation not found");

  if (name) reservation.name = name;
  if (description) reservation.description = description;
  if (categoryId) reservation.categoryId = categoryId;

  await reservation.save();
  successResponse(res, "Reservation updated successfully", reservation);
});

// delete reservation
export const deleteReservation = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const reservation = await Reservation.findByPk(id);
  if (!reservation) return error404(res, "Reservation not found");

  await reservation.destroy();
  successResponse(res, "Reservation deleted successfully");
});

// search reservation
export const searchReservation = ctrlWrapper(async (req, res) => {
  const { name } = req.query;

  const reservations = await Reservation.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    order: [["name", "ASC"]],
  });
  successResponse(res, "Reservations fetched successfully", reservations);
});
