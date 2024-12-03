import { models } from "../../models/index.js";

const { ProfileHotel } = models;

export const seedProfileHotel = async () => {
  const profile_hotels = [
    {
      id: 2,
      profileId: 2,
      hotelId: 2,
      startDate: "2023-01-01",
      endDate: "2023-01-02",
      priceByNight: 60,
      numberOfPeople: 2,
      totalPrice: 120,
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
