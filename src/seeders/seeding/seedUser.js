import { models } from "../../models/index.js";

const { User } = models;

export const seedUser = async () => {
  // Utilisateurs avec tous les champs requis
  const users = [
    {
      id: 1,
      firstName: "Aline",
      lastName: "Coding",
      email: "aline.coding@example.com",
      password: "aline123Password!",
      role: "admin",
    },
    {
      id: 2,
      firstName: "Alex",
      lastName: "Legrand",
      email: "alex.legrand@example.com",
      password: "alexPassword123!",
      role: "user",
    },
  ];

  for (const user of users) {
    try {
      // Créer l'utilisateur dans la base de données
      await User.create(user);
      console.log("User seeded ✅");
    } catch (error) {
      console.error("❌ Error seeding users:", error);
    }
  }
};
