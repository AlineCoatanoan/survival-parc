import { models } from "../../models/index.js";

const { Pass } = models;

export const seedPass = async () => {
  const passes = [
    // Renommé pour éviter la confusion avec le modèle
    {
      name: "Ticket",
      description: "entrée pour un jour",
      price: 20,
    },
    {
      name: "Pass 2 jours",
      description: "pass pour 2 jours",
      price: 30, // Changer basePrice en price
    },
  ];

  for (const passData of passes) {
    // Changement de nom de variable pour éviter conflit
    try {
      await Pass.create(passData);
      console.log(`Pass seeded: ${passData.name} ✅`);
    } catch (error) {
      console.error("❌ Error seeding pass:", error);
    }
  }
};
