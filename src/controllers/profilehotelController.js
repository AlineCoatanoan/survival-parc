import { successResponse } from "../middlewares/success.js";
import { errorResponse, badRequestResponse } from "../middlewares/errors.js";
import { error404 } from "../middlewares/error404.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { models } from "../models/index.js";

const { ProfileHotel, Profile, Hotel } = models;

// récupérer toutes les réservations d'hôtels
export const getAllReservationsHotels = ctrlWrapper(async (req, res) => {
  const reservations = await ProfileHotel.findAll();
  successResponse(res, "Reservations fetched successfully", reservations);
});

// Récupérer toutes les réservations d'hôtels pour un profil spécifique
export const getReservationAllHotelsById = ctrlWrapper(async (req, res) => {
  const { profileId } = req.params;
  try {
    // Récupérer le profil avec les hôtels associés et les réservations via la table de jonction ProfileHotel
    const profile = await Profile.findByPk(profileId, {
      include: [
        {
          model: Hotel,
          as: "hotels", // Utilisez l'alias défini dans Profile
          attributes: [
            "id",
            "name",
            "description",
            "address",
            "city",
            "priceByNight",
          ], // Attributs de l'hôtel
          through: {
            attributes: ["startDate", "endDate", "status"], // Attributs de la table de jonction ProfileHotel
          },
        },
      ],
    });

    // Si le profil n'existe pas, retour d'erreur
    if (!profile) {
      return errorResponse(res, "Profile not found");
    }

    // Vérifiez que le profil a des hôtels associés
    if (profile.hotels && profile.hotels.length > 0) {
      // Réponse avec les hôtels et les détails de réservation
      return successResponse(res, 200, "Reservations fetched", profile.hotels);
    } else {
      // Si aucun hôtel n'est associé au profil
      return successResponse(res, 200, "No reservations found", []);
    }
  } catch (error) {
    return errorResponse(res, "Error fetching reservations", error); // Gestion des erreurs
  }
});

export const createReservationHotel = ctrlWrapper(async (req, res) => {
  const { profileId, hotelId, startDate, endDate, status } = req.body;

  try {
    // Création de la réservation
    const reservation = await ProfileHotel.create({
      profileId,
      hotelId,
      startDate,
      endDate,
      status,
    });

    // Réponse réussie
    successResponse(res, 201, "Reservation created", reservation);
  } catch (error) {
    res.status(400).json({ message: "Error creating reservation", error });
  }
});

// Mettre à jour une réservation
export const updateReservationHotel = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate, status } = req.body;

  // Trouver la réservation existante
  const reservation = await ProfileHotel.update(id, startDate, endDate, status);

  if (!reservation) {
    return error404(res, "Reservation not found");
  }

  // Mise à jour des informations
  reservation.startDate = startDate || reservation.startDate;
  reservation.endDate = endDate || reservation.endDate;
  reservation.status = status || reservation.status;

  await reservation.save();

  // Réponse réussie
  successResponse(res, 200, "Reservation updated", reservation);
});

// Delete une réservation d'hotel
export const deleteReservationHotel = ctrlWrapper(async (req, res) => {
  const { id } = req.params;

  // Trouver la réservation
  const reservation = await ProfileHotel.delete(id);

  if (!reservation) {
    return error404(res, "Reservation not found");
  }

  // Supprimer la réservation
  await reservation.destroy();

  // Réponse réussie
  successResponse(res, 200, "Reservation deleted");
});
