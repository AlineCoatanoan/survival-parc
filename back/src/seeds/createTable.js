import dbClient from "../models/dbclient.js"; // Chemin vers votre dbClient

(async () => {
  try {
    await dbClient.sync({ alter: true }); // 'force: true' pour recréer les tables
    console.log("Tables recréées avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création des tables :", error);
  } finally {
    await dbClient.close(); // Ferme la connexion
  }
})();
