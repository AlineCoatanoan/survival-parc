import { models } from "../../models/index.js";

const { ProfileHotel } = models;

export const seedProfileHotel = async () => {
  const profile_hotels = [
    {
      id: 1,
      profileId: 1, // Utilisation de minuscules
      hotelId: 1, // Utilisation de minuscules
      startDate: "2023-01-01", // Date au format correct
      endDate: "2023-01-02", // Date au format correct
      status: "confirmed", // Statut
    },
    {
      id: 2,
      profileId: 2, // Utilisation de minuscules
      hotelId: 2, // Utilisation de minuscules
      startDate: "2023-01-01",
      endDate: "2023-01-02",
      status: "confirmed",
    },
  ];

  try {
    // Utilisation de bulkCreate pour insérer les données
    await ProfileHotel.bulkCreate(profile_hotels);
    console.log("ProfileHotels seeded successfully ✅");
  } catch (error) {
    console.error("Error seeding ProfileHotels:", error);
  }
};
