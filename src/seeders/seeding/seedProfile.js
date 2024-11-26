import { models } from "../../models/index.js";

const { Profile } = models;

export const seedProfile = async () => {
  const profiles = [
    {
      userId: 1, // Correspond au userId de Aline
      firstName: "Aline",
      lastName: "Coding",
      birthDate: "1988-12-12",
      phone: "0612345678",
      address: "12 rue de la gare",
      postalCode: "75001",
      city: "Paris",
    },
    {
      userId: 2, // Correspond au userId de Alex
      firstName: "Chandler",
      lastName: "Bing",
      birthDate: "1982-05-30",
      phone: "0687654321",
      address: "Central park",
      postalCode: "75001",
      city: "New-York",
    },
  ];

  for (const profile of profiles) {
    try {
      await Profile.create(profile);
      console.log(`Profile for ${profile.firstName} seeded ✅`);
    } catch (error) {
      console.error(
        `❌ Error seeding profile for ${profile.firstName}:`,
        error
      );
    }
  }
};
