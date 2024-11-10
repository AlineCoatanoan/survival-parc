import { models } from "../../models/index.js";

const { Reservation } = models;
export const seedReservation = async () => {
  const reservations = [
    {
      description: "Reservation pour un ticket",
      startDate: "2023-01-01",
      endDate: "2023-01-01",
      nights: 0,
      person: 3,
      price: 60,
      userId: 1,
      hotelId: 2,
      passId: 1,
    },
    {
      description: "Reservation pour un pass 2 jours",
      startDate: "2023-01-01",
      endDate: "2023-01-02",
      nights: 1,
      person: 3,
      price: 60,
      userId: 2,
      hotelId: 1,
      passId: 2,
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
