import { sequelize } from "../config/dbclient.js";

(async () => {
  try {
    await sequelize.sync({ force: true }); // Utilise force: true pour recréer les tables
    console.log("Tables recréées avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création des tables :", error);
  } finally {
    await sequelize.close(); // Ferme la connexion
  }
})();
