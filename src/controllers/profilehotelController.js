import { successResponse } from "../middlewares/success.js";
import { error404 } from "../middlewares/error404.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { models } from "../models/index.js";

const { ProfileHotel, Hotel, Profile } = models;

// Récupère toutes les réservations avec les informations des hôtels.
export const getAllReservationsHotels = ctrlWrapper(async (req, res) => {
  const reservations = await ProfileHotel.findAll({
    include: [
      {
        model: Hotel,
        as: "hotel",
      },
      {
        model: Profile,
        as: "profile",
      },
    ],
    attributes: [
      "id",
      "profileId",
      "hotelId",
      "startDate",
      "endDate",
      "status",
      "priceByNight",
      "numberOfPeople",
      "totalPrice",
    ],
  });

  res.json(reservations);
});

//Récupère toutes les réservations d'un `profileId` avec les informations des hôtels.
export const getReservationAllHotelsById = ctrlWrapper(async (req, res) => {
  const { profileId } = req.params;

  const reservations = await ProfileHotel.findAll({
    where: { profileId },
    include: {
      model: Hotel,
      as: "hotel",
    },
    attributes: [
      "id",
      "profileId",
      "hotelId",
      "startDate",
      "endDate",
      "status",
      "priceByNight",
      "numberOfPeople",
      "totalPrice",
    ],
  });

  if (!reservations.length) {
    return error404(res, `No reservations found for profileId ${profileId}.`);
  }

  return successResponse(res, reservations);
});

//créer une réservation d'hotel
export const createReservationHotel = async (req, res) => {
  const {
    profileId,
    hotelId,
    startDate,
    endDate,
    status,
    priceByNight,
    numberOfPeople,
    totalPrice,
  } = req.body;

  // Vérification des champs nécessaires
  if (
    !profileId ||
    !hotelId ||
    !startDate ||
    !endDate ||
    !status ||
    priceByNight === undefined ||
    numberOfPeople === undefined ||
    totalPrice === undefined
  ) {
    return res
      .status(400)
      .json({ message: "Les informations nécessaires sont manquantes." });
  }

  // Vérification si le profil existe
  const profile = await models.Profile.findOne({ where: { id: profileId } });
  if (!profile) return res.status(404).json({ message: "Profil non trouvé." });

  // Vérification si l'hôtel existe
  const hotel = await models.Hotel.findOne({ where: { id: hotelId } });
  if (!hotel) return res.status(404).json({ message: "Hôtel non trouvé." });

  try {
    // Création de la réservation
    const reservationHotelData = {
      profileId,
      hotelId,
      startDate,
      endDate,
      status,
      priceByNight,
      numberOfPeople,
      totalPrice,
    };

    const newReservation =
      await models.ProfileHotel.create(reservationHotelData);

    return res.status(201).json({
      success: true,
      message: "Réservation créée avec succès",
      data: {
        id: newReservation.id,
        profileId: newReservation.profileId,
        hotelId: newReservation.hotelId,
        startDate: newReservation.startDate,
        endDate: newReservation.endDate,
        status: newReservation.status,
        priceByNight: newReservation.priceByNight,
        numberOfPeople: newReservation.numberOfPeople,
        totalPrice: newReservation.totalPrice,
        hotel: {
          name: hotel.name,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur interne du serveur.",
      error: err.message,
      stack: err.stack,
    });
  }
};

//delete une réservation d'hotel
export const deleteReservationHotel = async (req, res) => {
  const { id } = req.params; // Extraction de l'ID de la réservation d'hôtel depuis l'URL
  const { profileId, hotelId } = req.body; // Extraction des IDs du profil et de l'hôtel depuis le corps de la requête

  // Vérification des champs nécessaires
  if (!id || !profileId || !hotelId) {
    return res
      .status(400)
      .json({ message: "Les informations nécessaires sont manquantes." });
  }

  try {
    // Vérification si la réservation existe
    const reservation = await models.ProfileHotel.findOne({
      where: { id, profileId, hotelId },
    });

    if (!reservation)
      return res.status(404).json({ message: "Réservation non trouvée." });

    // Supprimer la réservation
    await reservation.destroy();

    return res.status(200).json({
      success: true,
      message: "Réservation supprimée avec succès",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur interne du serveur.",
      error: err.message,
      stack: err.stack,
    });
  }
};
