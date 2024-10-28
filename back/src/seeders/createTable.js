import { sequelize } from "../models/dbclient.js"; // Chemin vers votre dbClient

(async () => {
  try {
    await sequelize.sync({ alter: true }); // 'force: true' pour recréer les tables
    console.log("Tables recréées avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création des tables :", error);
  } finally {
    await sequelize.close(); // Ferme la connexion
  }
})();
