import { successResponse } from "../middlewares/success.js";
import { error404 } from "../middlewares/error404.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { models } from "../models/index.js";
import { Op } from "sequelize";

const { ProfileHotel, Hotel, Profile } = models;

/**Récupère toutes les réservations avec les informations des hôtels incluses. */
export const getAllReservationsHotels = ctrlWrapper(async (req, res) => {
  const reservations = await ProfileHotel.findAll({
    include: [
      {
        model: Hotel,
        as: "hotel", // Utilise l'alias défini dans l'association pour Hotel
      },
      {
        model: Profile,
        as: "profile", // Utilise l'alias défini dans l'association pour Profile
      },
    ],
  });

  res.json(reservations); // Envoie les résultats
});

/**Récupère toutes les réservations d'un `profileId` avec les informations des hôtels incluses.*/
export const getReservationAllHotelsById = ctrlWrapper(async (req, res) => {
  const { profileId } = req.params;

  const reservations = await ProfileHotel.findAll({
    where: { profileId },
    include: {
      model: Hotel,
      as: "hotel", // Alias pour les hôtels
    },
  });

  if (!reservations.length) {
    return error404(res, `No reservations found for profileId ${profileId}.`);
  }

  return successResponse(res, reservations);
});

export const createReservationHotel = async (req, res) => {
  const { profileId, hotelId, startDate, endDate, status } = req.body;

  // Vérification des champs nécessaires
  if (!profileId || !hotelId || !startDate || !endDate || !status) {
    return res
      .status(400)
      .json({ message: "Les informations nécessaires sont manquantes." });
  }

  // Vérification si le profil existe
  const profile = await models.Profile.findOne({ where: { id: profileId } });
  if (!profile) return res.status(404).json({ message: "Profil non trouvé." });

  // Si un hôtel est spécifié, vérifiez son existence
  let hotel = null;
  if (hotelId) {
    hotel = await models.Hotel.findOne({ where: { id: hotelId } });
    if (!hotel) return res.status(404).json({ message: "Hôtel non trouvé." });
  }

  // Vérifier s'il n'y a pas de réservation existante qui chevauche les dates
  const existingReservation = await models.ProfileHotel.findOne({
    where: {
      profileId,
      hotelId,
      [Op.or]: [
        { startDate: { [Op.between]: [startDate, endDate] } },
        { endDate: { [Op.between]: [startDate, endDate] } },
        {
          [Op.and]: [
            { startDate: { [Op.lte]: startDate } },
            { endDate: { [Op.gte]: endDate } },
          ],
        },
      ],
    },
  });

  if (existingReservation) {
    return res.status(400).json({
      message: `Une réservation existe déjà pour ce profil et cet hôtel dans cette période.`,
    });
  }

  // Création de la nouvelle réservation
  try {
    const reservationHotelData = {
      profileId,
      hotelId,
      startDate,
      endDate,
      status,
    };

    const newReservation =
      await models.ProfileHotel.create(reservationHotelData);
    return successResponse(
      res,
      "Réservation créée avec succès",
      newReservation
    );
  } catch (err) {
    return res.status(500).json({
      message: "Erreur interne du serveur.",
      error: err.message,
      stack: err.stack,
    });
  }
};
