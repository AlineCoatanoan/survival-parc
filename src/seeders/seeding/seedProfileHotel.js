import { models } from "../../models/index.js";

const { ProfileHotel } = models;

export const seedProfileHotel = async () => {
  const profileHotels = [
    {
      profileId: 1,
      hotelId: 1,
      startDate: "2023-01-01",
      endDate: "2023-01-02",
      status: "confirmed",
    },
    {
      profileId: 2,
      hotelId: 2,
      startDate: "2023-01-01",
      endDate: "2023-01-02",
      status: "confirmed",
    },
  ];

  for (const profileHotel of profileHotels) {
    try {
      await ProfileHotel.create(profileHotel);
      console.log("ProfileHotel seeded ✅");
    } catch (error) {
      console.error("❌ Error seeding profileHotels:", error);
    }
  }
};
