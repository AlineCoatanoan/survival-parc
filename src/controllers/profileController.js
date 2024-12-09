import { successResponse } from "../middlewares/success.js";
import { error404 } from "../middlewares/error404.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { models } from "../models/index.js";

const { Profile, User } = models;

// get all profiles
export const getProfiles = ctrlWrapper(async (req, res) => {
  const profiles = await Profile.findAll();
  if (!profiles || profiles.length === 0)
    return error404(res, "Profiles not found");
  successResponse(res, "Profiles retrieved successfully", profiles);
});

// Récupérer le profil d'un utilisateur par son userId
export const getProfileByUserId = ctrlWrapper(async (req, res) => {
  const { userId } = req.params; // Récupérer l'userId depuis l'URL

  // Trouver le profil associé à cet userId
  const profile = await Profile.findOne({ where: { userId } });

  if (!profile) {
    return res.status(404).json({ message: "Profil non trouvé" });
  }

  return res.json({
    success: true,
    message: "Profil récupéré avec succès",
    data: profile,
  });
});

// Créer un profil pour un utilisateur donné
export const createProfile = ctrlWrapper(async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, birthDate, phone, address, postalCode, city } =
    req.body;

  // Vérification de la validité de birthDate
  if (!birthDate || !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
    return res.status(400).json({
      message:
        "Le format de la date de naissance est invalide. Utilisez 'YYYY-MM-DD'.",
    });
  }

  // récupérer la date au format 'YYYY-MM-DD'
  const birthDateWithoutTime = new Date(birthDate).toISOString().split("T")[0];

  // Vérification si la date est antérieure à la date actuelle
  const today = new Date();
  const birthDateObject = new Date(birthDateWithoutTime); // Créez un objet Date à partir de la date sans l'heure
  if (birthDateObject >= today) {
    return res.status(400).json({
      message: "La date de naissance doit être antérieure à aujourd'hui.",
    });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  try {
    const profile = await Profile.create({
      userId,
      firstName,
      lastName,
      birthDate: birthDateWithoutTime, // Utilisez la date sans heure
      phone,
      address,
      postalCode,
      city,
    });

    return res.status(201).json({
      message: "Profil créé avec succès",
      data: {
        id: profile.id, // Retourne seulement les informations non sensibles
        userId: profile.userId,
        firstName: profile.firstName,
        lastName: profile.lastName,
        // Ne retourne pas d'autres données sensibles ici (email, adresse, etc.)
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors de la création du profil",
      error: error.message,
    });
  }
});

// update profile
export const updateProfile = ctrlWrapper(async (req, res) => {
  const { firstName, lastName, email, phone, address } = req.body;
  const { userId } = req.params; // Utiliser userId dans l'URL

  const profile = await Profile.findOne({ where: { userId } }); // Trouver le profil par userId
  if (!profile) {
    return error404(res, "Profile not found");
  }

  // Mettre à jour les champs si les valeurs sont fournies dans la requête
  if (firstName) profile.firstName = firstName;
  if (lastName) profile.lastName = lastName;
  if (email) profile.email = email; // Si tu veux gérer l'email, tu peux l'ajouter
  if (phone) profile.phone = phone; // Corrigé pour utiliser 'phone'
  if (address) profile.address = address;

  try {
    // Sauvegarder les changements
    await profile.save();
    // Retourner une réponse de succès
    successResponse(res, "Profile updated successfully", profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors de la mise à jour du profil",
      error: error.message,
    });
  }
});

// delete profile
export const deleteProfile = ctrlWrapper(async (req, res) => {
  const { userId } = req.params;

  const profile = await Profile.findOne({ where: { userId } });
  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  try {
    // Supprimer le profil
    await profile.destroy();
    successResponse(res, "Profile deleted successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors de la suppression du profil",
      error: error.message,
    });
  }
});
