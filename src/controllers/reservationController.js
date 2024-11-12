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

// get reservation by user ID
export const getReservationsByUser = ctrlWrapper(async (req, res) => {
  const userId = req.params.id;
  const reservations = await Reservation.findAll({ where: { userId } });

  if (!reservations || reservations.length === 0) {
    return error404(res, "Aucune réservation trouvée pour cet utilisateur.");
  }

  successResponse(res, "Réservations récupérées avec succès", reservations);
});

// create reservation (linked to userId)
export const createReservation = ctrlWrapper(async (req, res) => {
  const {
    startDate,
    endDate,
    nights,
    person,
    price,
    userId,
    hotelId,
    hotelName,
  } = req.body;

  // Vérification des champs requis
  if (
    !startDate ||
    !endDate ||
    !person ||
    !price ||
    !userId ||
    !hotelId ||
    !hotelName
  ) {
    return res
      .status(400)
      .json({ message: "Les informations nécessaires sont manquantes." });
  }

  // Vérification si l'utilisateur et l'hôtel existent
  const user = await models.Profile.findOne({ where: { id: userId } });
  const hotel = await models.Hotel.findOne({ where: { id: hotelId } });

  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé." });
  }

  if (!hotel) {
    return res.status(404).json({ message: "Hôtel non trouvé." });
  }

  // Si 'nights' est omis ou égal à 0, calculez-le
  const calculatedNights =
    nights > 0 ? nights : calculateNights(startDate, endDate);

  try {
    const reservationData = {
      startDate,
      endDate,
      nights: calculatedNights,
      person,
      price,
      userId,
      hotelId,
      hotelName, // Inclut l'ID de l'hôtel pour la réservation
    };

    const reservation = await Reservation.create(reservationData);

    successResponse(res, "Réservation créée avec succès", reservation);
  } catch (err) {
    console.error("Erreur lors de la création de la réservation:", err);

    // Affichage de l'erreur complète dans la réponse
    return res.status(500).json({
      message: "Erreur interne du serveur.",
      error: err.message,
      stack: err.stack,
    });
  }
});

// update reservation (only if it belongs to userId)
export const updateReservation = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate, person, price, userId } = req.body;

  const reservation = await Reservation.findOne({ where: { id, userId } });
  if (!reservation)
    return error404(res, "Réservation non trouvée ou non autorisée.");

  if (startDate) reservation.startDate = startDate;
  if (endDate) reservation.endDate = endDate;
  if (person) reservation.person = person;
  if (price) reservation.price = price;

  await reservation.save();
  successResponse(res, "Réservation mise à jour avec succès", reservation);
});

// delete reservation (only if it belongs to userId)
export const deleteReservation = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const reservation = await Reservation.findOne({ where: { id, userId } });
  if (!reservation)
    return error404(res, "Réservation non trouvée ou non autorisée.");

  await reservation.destroy();
  successResponse(res, "Réservation supprimée avec succès");
});

// search reservation by name
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
  successResponse(res, "Réservations récupérées avec succès", reservations);
});

// Helper function to calculate nights if not provided
function calculateNights(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
}
