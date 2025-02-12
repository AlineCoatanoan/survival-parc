import { models } from "../../models/index.js";

const { Reservation } = models;
export const seedReservation = async () => {
  const reservations = [
    {
      description: "Reservation pour un ticket",
      startDate: "2023-01-01",
      endDate: "2023-01-01",
      person: 3,
      price: 60,
      profileId: 1,
      hotelId: 2,
    },
    {
      description: "Reservation pour un ticket 2 jours",
      startDate: "2023-01-01",
      endDate: "2023-01-02",
      person: 3,
      price: 60,
      profileId: 2,
      hotelId: 1,
    },
  ];

  for (const reservation of reservations) {
    try {
      await Reservation.create(reservation);
      console.log("Reservation seeded ✅");
    } catch (error) {
      console.error("❌ Error seeding reservations:", error);
    }
  }
};
