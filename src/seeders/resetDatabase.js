import { sequelize } from "../config/dbclient.js";
import { initializeModels } from "../config/associations.js"; // Ajuste le chemin selon l'emplacement
import { User } from "../models/User.js";
import { Profile } from "../models/Profile.js";
import { Reservation } from "../models/Reservation.js";
import { Hotel } from "../models/Hotel.js";
import { Animation } from "../models/Animation.js";
import { ProfileHotel } from "../models/ProfileHotel.js";

const resetDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "✅ Connection to the database has been established successfully."
    );

    // Initialisation des modèles et associations
    initializeModels();

    // Suppression des tables (si elles existent)
    await User.drop().catch(() => {});
    await Profile.drop().catch(() => {});
    await Reservation.drop().catch(() => {});
    await Hotel.drop().catch(() => {});
    await Animation.drop().catch(() => {});
    await ProfileHotel.drop().catch(() => {});

    console.log("✅ Tables dropped successfully.");

    // Recréer les tables
    await sequelize.sync({ force: true }); // Utilise force: true pour recréer les tables
    console.log("✅ Tables recreated successfully.");

    // Optionnel : Ajoutez ici des données de test ou d'autres opérations nécessaires
  } catch (error) {
    console.error("❌ Error resetting the database:", error);
  } finally {
    await sequelize.close();
    console.log("✅ Database connection closed.");
  }
};

// Exécution de la fonction
resetDatabase();
