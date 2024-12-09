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

export const getReservationsByProfileId = ctrlWrapper(async (req, res) => {
  const profileId = req.params.profileId; // Récupération du profileId depuis les paramètres de l'URL

  // Récupérer les réservations associées à ce profileId
  const reservations = await Reservation.findAll({ where: { profileId } });

  if (!reservations || reservations.length === 0) {
    return error404(res, "Aucune réservation trouvée pour ce profil.");
  }

  successResponse(res, "Réservations récupérées avec succès", reservations);
});

// create reservation
export const createReservation = ctrlWrapper(async (req, res) => {
  const { startDate, endDate, nights, person, price, profileId, hotelId } =
    req.body;

  // Vérification des champs requis
  if (!startDate || !endDate || !person || !price || !profileId) {
    return res
      .status(400)
      .json({ message: "Les informations nécessaires sont manquantes." });
  }

  // Vérification du profil
  const profile = await models.Profile.findOne({ where: { id: profileId } });
  if (!profile) return res.status(404).json({ message: "Profil non trouvé." });

  // Si un hôtel est spécifié, vérifiez son existence
  let hotel = null;
  if (hotelId) {
    hotel = await models.Hotel.findOne({ where: { id: hotelId } });
    if (!hotel) return res.status(404).json({ message: "Hôtel non trouvé." });
  }

  // Calcul du nombre de nuits
  const calculatedNights =
    nights > 0 ? nights : calculateNights(startDate, endDate);

  try {
    const reservationData = {
      startDate,
      endDate,
      nights: calculatedNights,
      person,
      price,
      profileId,
      hotelId: hotelId || null,
    };

    const reservation = await Reservation.create(reservationData);
    successResponse(res, "Réservation créée avec succès", reservation);
  } catch (err) {
    return res.status(500).json({
      message: "Erreur interne du serveur.",
      error: err.message,
      stack: err.stack,
    });
  }
});

// update reservation
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

// delete reservation
export const deleteReservation = ctrlWrapper(async (req, res) => {
  const { id } = req.params; // ID de la réservation à supprimer
  const { profileId } = req.body; // Récupération de l'ID du profil depuis le corps de la requête

  // Vérification si l'ID de la réservation et le profileId sont bien fournis
  if (!id || !profileId) {
    return res
      .status(400)
      .json({ message: "Réservation ID ou Profil ID manquant" });
  }

  try {
    // Vérification si la réservation existe pour ce profil
    const reservation = await models.Reservation.findOne({
      where: { id, profileId },
    });

    // Si la réservation n'est pas trouvée
    if (!reservation) {
      return error404(res, "Réservation non trouvée ou non autorisée.");
    }

    // Suppression de la réservation
    await reservation.destroy();

    // Réponse de succès
    successResponse(res, "Réservation supprimée avec succès");
  } catch (err) {
    // Gestion des erreurs serveur
    return res.status(500).json({
      message: "Erreur interne du serveur.",
      error: err.message,
      stack: err.stack,
    });
  }
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

// exemple de calcule le nombre de nuits entre deux dates données
function calculateNights(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
}
